# ChainPal - Frontend for Private Payments on Web3

## Overview

ChainPal is the frontend interface for a private payment system built on Ethereum and Zero-Knowledge Proof (ZKP) technologies. The goal is to allow users to conduct transactions confidentially, protecting their balances and transaction histories. This frontend interacts with a set of smart contracts, cored by `EncryptedERC`, to provide functionalities such as user registration, depositing ERC20 tokens in an encrypted form (eERC20), and (in the future) private transfers and withdrawals.

## Architecture

The ChainPal system consists of three main components:

1.  **Frontend (This Project - `chainpal-frontend`):**
    *   Built with React, TypeScript, and Ethers.js.
    *   Responsible for user interaction, wallet management (via RainbowKit/Wagmi), local ZK cryptographic key generation, ZK proof construction and submission (using `snarkjs`), and communication with smart contracts on the blockchain.

2.  **Smart Contracts (Base Project - `EncryptedERC`):**
    *   Written in Solidity.
    *   `Registrar.sol`: Manages the registration of new users, associating their Ethereum addresses with ZK public keys (BabyJubJub). Registration requires a ZK proof to ensure possession of the corresponding private key.
    *   `EncryptedERC.sol`: The main contract that handles the logic of private tokens. It can operate in "Standalone" mode (as a native private ERC20 token) or "Converter" mode (to wrap existing ERC20 tokens). It manages deposits, (future) private transfers, and withdrawals.
    *   `EncryptedUserBalances.sol`: A contract (from which `EncryptedERC` inherits) that stores and manages user balances in an encrypted manner, using ElGamal encryption over the BabyJubJub curve.
    *   `AuditorManager.sol`: Manages the configuration of an optional auditor for compliance.
    *   `TokenTracker.sol`: Tracks supported ERC20 tokens in "Converter" mode.

3.  **Zero-Knowledge Proofs (ZKPs):**
    *   Circuits written in Circom (e.g., `RegistrationCircuit.circom`).
    *   Proofs are generated on the frontend using `snarkjs` and verified in the smart contracts.
    *   Used to ensure the validity of operations (like registration) without revealing sensitive information (like private keys).

## Running the Project

To run this frontend project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd chainpal-frontend
    ```

2.  **Install dependencies:**
    Make sure you have Node.js and npm (or yarn) installed.
    ```bash
    npm install
    # or
    # yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the `chainpal-frontend` root directory. You might need to copy it from `.env.example` if it exists and fill in the necessary environment variables, such as RPC URLs for Ethereum networks or contract addresses.

4.  **Start the development server:**
    ```bash
    nvm use 22
    npm start
    # or
    # yarn start
    ```
    This will usually open the application in your default web browser at `http://localhost:3000`.

## Features and Integration with `EncryptedERC`

### 1. ZK Cryptographic Key Generation

*   **Frontend:**
    *   Upon connecting the wallet, the frontend generates a ZK key pair (private key and public key) for the user, using the BabyJubJub curve (via libraries like `maci-crypto` and `@zk-kit/baby-jubjub`).
    *   The private key is kept locally in the component's state and never leaves the browser.
    *   The public key is used for interactions with the contracts.
*   **`EncryptedERC` Integration:**
    *   The generated public key is what will be registered in the `Registrar.sol` contract, which is accessed and used by the `EncryptedERC` system.

### 2. User Registration

*   **Frontend:**
    *   The user initiates the registration process.
    *   The frontend prepares the inputs for `RegistrationCircuit.circom`. This includes:
        *   `SenderPrivateKey`: The user's ZK private key.
        *   `SenderPublicKey`: The user's ZK public key.
        *   `SenderAddress`: The user's Ethereum address.
        *   `ChainID`: The current network ID.
        *   `RegistrationHash`: A Poseidon hash of the other inputs, ensuring data integrity and linkage.
    *   A ZK proof is generated using `snarkjs.groth16.fullProve(...)` with the circuit's WASM and ZKey.
    *   The formatted proof and public signals are sent to the `register` function of the `Registrar.sol` contract.
*   **`EncryptedERC` Integration:**
    *   `Registrar.sol` (part of the `EncryptedERC` system) verifies the ZK proof. If valid, it stores the `SenderPublicKey` associated with `msg.sender` (the user's Ethereum address).
    *   The `EncryptedERC.sol` contract uses `Registrar.sol` to check if a user is registered before allowing operations like deposits (via the `onlyIfUserRegistered` modifier).

### 3. ERC20 Token Deposit (Feature in Development)

*   **Objective:** Allow a registered user to deposit standard ERC20 tokens in exchange for encrypted eERC20 tokens.
*   **Frontend:**
    1.  The user specifies the amount of ERC20 tokens to deposit.
    2.  The frontend first approves (`approve`) the `EncryptedERC.sol` contract to spend the specified amount of the user's ERC20 token.
    3.  **Calculation of `valueToEncryptForPCT`**: The deposit value is scaled to the internal decimals of `EncryptedERC`. This value (`valueToEncryptForPCT`) is what will be encrypted. The scaling logic aims to mirror the `scaledAmount` calculation that the `EncryptedERC.sol` contract will perform:
        *   If `originalDecimals > eERCDecimals`: `valueToEncryptForPCT = depositValueOriginalUnits / (10 ** (originalDecimals - eERCDecimals))`.
        *   If `originalDecimals < eERCDecimals`: `valueToEncryptForPCT = BigInt(0)`. This occurs because the contract's scaling formula (`scaledAmount = receivedAmount / (10**(originalDecimals - eERCDecimals))`) would result in division by a very large number (or zero due to overflow/underflow in exponentiation), effectively zeroing out `scaledAmount`. The frontend mirrors this to maintain consistency.
        *   If `originalDecimals == eERCDecimals`: `valueToEncryptForPCT = depositValueOriginalUnits`.
    4.  **Generation of `amountPCT`**: The `valueToEncryptForPCT` is encrypted using the user's own ZK public key (`pubKey`). The `processPoseidonEncryptionFrontend` function is used for this, resulting in:
        *   `ciphertext`: An array of 4 `bigint` (representing c1x, c1y, c2x, c2y of an ElGamal cipher).
        *   `authKey`: A point on the BabyJubJub curve (ax, ay).
        *   `nonce`: The nonce used in the encryption.
        These are combined into an array of 7 `string` (converted from `bigint`) to form the `amountPCTArray`.
    5.  The `deposit` function of the `EncryptedERC.sol` contract is called with:
        *   `amount`: The original deposit value (unscaled, e.g., 100e18).
        *   `tokenAddress`: The address of the ERC20 contract being deposited.
        *   `amountPCTArray`: The 7-element array described above.
*   **`EncryptedERC` Integration:**
    *   The `deposit` function in `EncryptedERC.sol` (when the contract is in "Converter" mode and the auditor is configured) does the following:
        1.  Checks modifiers (`onlyIfAuditorSet`, `onlyForConverter`, `revertIfBlacklisted`, `onlyIfUserRegistered`).
        2.  Transfers the ERC20 tokens from the user to itself (`safeTransferFrom`).
        3.  Calculates `scaledAmount` internally using the formula: `scaledAmount = receivedAmount / (10**(originalDecimals - DECIMALS_eERC))`.
        4.  **Critical Point for Balance Update (Theoretical):** Ideally, the contract should use `amountPCT` (which contains the encrypted `valueToEncryptForPCT`) and `scaledAmount` to update the user's encrypted balance in `EncryptedUserBalances.sol`. This would involve extracting the ElGamal cipher (`EGCT`) from `amountPCT` and calling an internal function like `_addToUserBalance(user, tokenId, EGCT_from_amountPCT, amountPCT_history)`. Within `_addToUserBalance` or in a subsequent check, `scaledAmount` could be used to validate the cipher or register the plaintext value for the auditor. **The exact implementation of this linkage in `EncryptedERC.sol` is crucial and could be the source of problems if not perfectly aligned with the data provided by the frontend.**

## Current Project Status and Challenges

*   **User Registration:** Functional, with ZK proof generation and verification.
*   **ZK Key Generation:** Implemented in the frontend.
*   **Token Deposit:** In development. The frontend prepares and sends the data, including the encrypted `amountPCT`. However, the call to `deposit` in the contract results in a `missing revert data (action="estimateGas")` error.
    *   **Main Challenge:** The most likely cause for the deposit failure is the configuration of the `EncryptedERC` contract on the test network. It needs to be:
        1.  **Deployed in Converter Mode:** The `isConverter` parameter must be `true` at deployment time.
        2.  **Auditor Configured:** An auditor address must be registered in `Registrar.sol`, and then the `setAuditorPublicKey(auditorAddress)` function in `EncryptedERC.sol` must be called by the contract owner. Without this, the `onlyIfAuditorSet` modifier in the `deposit` function will cause a revert.
    *   **Scaling Logic:** The decimal scaling logic has been adjusted in the frontend to mirror the behavior of the current formula in the `EncryptedERC.sol` contract. However, the contract's formula for `scaledAmount` does not ideally handle the case where the original token's decimals are less than the eERC's decimals, resulting in a `scaledAmount` of zero.

## Next Steps and Future Improvements

1.  **Resolve Deposit Error:**
    *   **Verify and Correct Contract Configuration:** Ensure `EncryptedERC` is deployed as `isConverter = true` and that an auditor is correctly configured. This is the most critical step.
    *   **Debug `deposit` -> `_addToUserBalance` Interaction:** If the configuration is correct, investigate how the `deposit` function in `EncryptedERC.sol` uses `amountPCT` and `scaledAmount` to call `_addToUserBalance` (or an equivalent function) and if any internal validation is failing.
2.  **Review Scaling Logic in Contract (Optional):** If it's desired for the system to more robustly handle tokens where `originalDecimals < eERCDecimals` (so the scaled value isn't automatically zero), the `scaledAmount` formula in `EncryptedERC.sol` would need to be updated to also support multiplication.
3.  **Implement Private Transfers:**
    *   Develop the ZKP circuit for transfers.
    *   Implement proof generation and the transfer interface in the frontend.
    *   Add the `privateTransfer` function in `EncryptedERC.sol`.
4.  **Implement Withdrawals:**
    *   Develop the ZKP circuit for withdrawals.
    *   Implement proof generation and the withdrawal interface in the frontend.
    *   Add the `withdraw` function in `EncryptedERC.sol`.
5.  **UI and UX Improvements:**
    *   Clearer visual feedback for ZKP operations.
    *   More detailed error handling for the user.
6.  **Comprehensive Testing and Security:**
    *   Write more complete unit and integration tests.
    *   Consider a security audit.

This README provides an overview of the ChainPal frontend and its interaction with the `EncryptedERC` system. For details on the smart contracts and ZKP logic, refer to the documentation of the base `EncryptedERC` project.
