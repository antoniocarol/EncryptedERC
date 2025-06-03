import { ethers } from 'ethers';
import EncryptedERC20Abi from './EncryptedERC20.abi.json';
import ERC20Abi from './ERC20.abi.json';
import RegistrarAbi from './Registrar.abi.json';

// Endereços dos contratos do deploy local
export const CHAIN_ID = 31337; // Hardhat Network

// TODO: Update with your deployed contract addresses
export const ERC20_ADDRESS = '0x7a2088a1bFc9d81c55368AE168C2C02570cB814F';
export const ENCRYPTED_ERC20_ADDRESS = '0x4A679253410272dd5232B3Ff7cF5dbB88f295319';
export const REGISTRAR_ADDRESS = '0xa85233C63b9Ee964Add6F2cffe00Fd84eb32338f'; // Endereço do Registrar do último deploy do converter

export function getERC20Contract(signerOrProvider: ethers.Signer | ethers.Provider) {
  return new ethers.Contract(ERC20_ADDRESS, ERC20Abi, signerOrProvider);
}

export function getEncryptedERC20Contract(signerOrProvider: ethers.Signer | ethers.Provider) {
  return new ethers.Contract(ENCRYPTED_ERC20_ADDRESS, EncryptedERC20Abi, signerOrProvider);
}

export function getRegistrarContract(signerOrProvider: ethers.Signer | ethers.Provider) {
  return new ethers.Contract(REGISTRAR_ADDRESS, RegistrarAbi, signerOrProvider);
}

export { EncryptedERC20Abi, ERC20Abi, RegistrarAbi }; 