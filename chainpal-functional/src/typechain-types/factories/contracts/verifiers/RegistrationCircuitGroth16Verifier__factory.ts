/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  RegistrationCircuitGroth16Verifier,
  RegistrationCircuitGroth16VerifierInterface,
} from "../../../contracts/verifiers/RegistrationCircuitGroth16Verifier";

const _abi = [
  {
    inputs: [],
    name: "ALPHA_X",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ALPHA_Y",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "BASE_FIELD_SIZE",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "BETA_X1",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "BETA_X2",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "BETA_Y1",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "BETA_Y2",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DELTA_X1",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DELTA_X2",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DELTA_Y1",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DELTA_Y2",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "GAMMA_X1",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "GAMMA_X2",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "GAMMA_Y1",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "GAMMA_Y2",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "IC0_X",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "IC0_Y",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "IC1_X",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "IC1_Y",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "IC2_X",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "IC2_Y",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "IC3_X",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "IC3_Y",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "IC4_X",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "IC4_Y",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "IC5_X",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "IC5_Y",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "P_TOTAL_SIZE",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SCALAR_FIELD_SIZE",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[2]",
        name: "pointA_",
        type: "uint256[2]",
      },
      {
        internalType: "uint256[2][2]",
        name: "pointB_",
        type: "uint256[2][2]",
      },
      {
        internalType: "uint256[2]",
        name: "pointC_",
        type: "uint256[2]",
      },
      {
        internalType: "uint256[5]",
        name: "publicSignals_",
        type: "uint256[5]",
      },
    ],
    name: "verifyProof",
    outputs: [
      {
        internalType: "bool",
        name: "verified_",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080604052348015600f57600080fd5b50610d4e8061001f6000396000f3fe608060405234801561001057600080fd5b50600436106101da5760003560e01c8063901660c411610104578063d663b365116100a2578063dd924b4711610071578063dd924b471461053f578063dfcf46f014610566578063eedee58f1461058d578063f7a65aae1461056657600080fd5b8063d663b365146104ca578063d70a63cc14610425578063dc05a822146104f1578063dce420041461051857600080fd5b8063acb41936116100de578063acb419361461047c578063b936325c1461029f578063cc9c92ae1461047c578063d1fb02a3146104a357600080fd5b8063901660c414610425578063a1978c3c1461044c578063a6aca9761461047357600080fd5b80634e890b271161017c578063742797c41161014b578063742797c4146103895780637fdf8fc1146103b0578063839a60d0146103d7578063898611fd146103fe57600080fd5b80634e890b27146102ed57806350def905146103145780636336ec6c1461033b5780636a5935a71461036257600080fd5b806324934a11116101b857806324934a111461025557806334baeab91461027c5780633a9e6a4d1461029f5780634234a1d6146102c657600080fd5b80630cbb35c3146101df5780630ddec475146102195780631c4d44061461022e575b600080fd5b6102067f0fcd73b4d56ad4343796dd9bb0d9419df09630f5a5ff272f3fa342bd21f30cab81565b6040519081526020015b60405180910390f35b610206600080516020610cf983398151915281565b6102067f1739c1b1a457a8c7313123d24d2f9192f896b7c63eea05a9d57f06547ad0cec881565b6102067f1b9caf3c3e2a7c82c5044e3b3a899f4f0d28dbf174e1aecb9439457809038d8981565b61028f61028a366004610c10565b6105b4565b6040519015158152602001610210565b6102067f090689d0585ff075ec9e99ad690c3395bc4b313370b38ef355acdadcd122975b81565b6102067f111b373426ca420c28b4d961ce43ab1d0e1b9d920e2dacd7d599899f99898abf81565b6102067f19f60169a288d40a348beae483883e0662cfe6568d7832651fd8a3dfb9e2094081565b6102067f0fbbf302a37db8760933e668a0193081abc7e55928ac52a1c11152a41bc43b4081565b6102067f08da6a8e5ea2b88d10825e21e347174a990e91e12d969378db3ecd51b57a84a681565b6102067f14bedd503c37ceb061d8ec60209fe345ce89830a19230301f076caff004d192681565b6102067f18a229d1869f207508d63165df3dfd7786a5102e81a198dac3961381c01c1e7881565b6102067f0e187847ad4c798374d0d6732bf501847dd68bc0e071241e0213bc7fc13db7ab81565b6102067f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd4781565b6102067f20b3b6fc6cc9533c632002184004ff49b38be27f7b1788fba2e1e4a83932e67e81565b6102067f198e9393920d483a7260bfb731fb5d25f1aa493335a9e71297e485b7aef312c281565b6102067f2310bf279ed58b4cf463bdf369764c452845353f114fb503f036279c81517a3881565b61020661030081565b6102067f12c85ea5db8c6deb4aab71808dcb408fe3d1e7690c43d37b4ce6cc0166fa7daa81565b6102067f2d4d9aa7e302d9df41749d5507949d05dbea33fbb16c643b22f599a2be6df2e281565b6102067f2118e76180d9d07274294c2182e4e00958b9fca9db1c51156e85a4b8cde5e1f581565b6102067f0967032fcbf776d1afc985f88877f182d38480a653f2decaa9794cbc3bf3060c81565b6102067f050ac0b65e5989b8446764d184d7d6ec3b6169c457171cbad5c3c0c1468c717781565b6102067f304cfbd1e08a704a99f5e847d93f8c3caafddec46b7a0d379da69a4d112346a781565b6102067f1800deef121f1e76426a00665e5c4479674322d4f75edadd46debd5cd992f6ed81565b6102067f06ebaca996f58376a9fe3ca5c859caa794c21f107f2a5b2d1f0941c2f4f7d6f881565b6000610acc565b816040820152826060820152836080820152600060408083016060604085016007611770fa3d151516905080156105fe5760408260808460066096fa3d15151690505b949350505050565b7f08da6a8e5ea2b88d10825e21e347174a990e91e12d969378db3ecd51b57a84a685527f18a229d1869f207508d63165df3dfd7786a5102e81a198dac3961381c01c1e78602086015260006106a160008601517f2310bf279ed58b4cf463bdf369764c452845353f114fb503f036279c81517a387f2118e76180d9d07274294c2182e4e00958b9fca9db1c51156e85a4b8cde5e1f5896105bb565b15610ac3576106f660208601517f0fcd73b4d56ad4343796dd9bb0d9419df09630f5a5ff272f3fa342bd21f30cab7f050ac0b65e5989b8446764d184d7d6ec3b6169c457171cbad5c3c0c1468c7177896105bb565b15610ac35761074b60408601517f0fbbf302a37db8760933e668a0193081abc7e55928ac52a1c11152a41bc43b407f111b373426ca420c28b4d961ce43ab1d0e1b9d920e2dacd7d599899f99898abf896105bb565b15610ac3576107a060608601517f19f60169a288d40a348beae483883e0662cfe6568d7832651fd8a3dfb9e209407f06ebaca996f58376a9fe3ca5c859caa794c21f107f2a5b2d1f0941c2f4f7d6f8896105bb565b15610ac3576107f560808601517f1b9caf3c3e2a7c82c5044e3b3a899f4f0d28dbf174e1aecb9439457809038d897f20b3b6fc6cc9533c632002184004ff49b38be27f7b1788fba2e1e4a83932e67e896105bb565b15610ac3577f198e9393920d483a7260bfb731fb5d25f1aa493335a9e71297e485b7aef312c260408701527f1800deef121f1e76426a00665e5c4479674322d4f75edadd46debd5cd992f6ed60608701527f090689d0585ff075ec9e99ad690c3395bc4b313370b38ef355acdadcd122975b60808701527f12c85ea5db8c6deb4aab71808dcb408fe3d1e7690c43d37b4ce6cc0166fa7daa60a0870152815160c08701527f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd4760208301517f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd47030660e087015282515161010087015260208351015161012087015260208301515161014087015260208084015101516101608701527f2d4d9aa7e302d9df41749d5507949d05dbea33fbb16c643b22f599a2be6df2e26101808701527f14bedd503c37ceb061d8ec60209fe345ce89830a19230301f076caff004d19266101a08701527f0967032fcbf776d1afc985f88877f182d38480a653f2decaa9794cbc3bf3060c6101c08701527f0e187847ad4c798374d0d6732bf501847dd68bc0e071241e0213bc7fc13db7ab6101e08701527f304cfbd1e08a704a99f5e847d93f8c3caafddec46b7a0d379da69a4d112346a76102008701527f1739c1b1a457a8c7313123d24d2f9192f896b7c63eea05a9d57f06547ad0cec8610220870152835161024087015260208401516102608701527f198e9393920d483a7260bfb731fb5d25f1aa493335a9e71297e485b7aef312c26102808701527f1800deef121f1e76426a00665e5c4479674322d4f75edadd46debd5cd992f6ed6102a08701527f090689d0585ff075ec9e99ad690c3395bc4b313370b38ef355acdadcd122975b6102c08701527f12c85ea5db8c6deb4aab71808dcb408fe3d1e7690c43d37b4ce6cc0166fa7daa6102e08701526020866103008860086202c308fa86511690505b95945050505050565b604051610300810160405260019150610af66000840151600080516020610cf98339815191521190565b6020840151921691600080516020610cf9833981519152116040840151921691600080516020610cf9833981519152116060840151921691600080516020610cf9833981519152116080840151921691600080516020610cf9833981519152118216915081151915610b7257610b6f818486888a610606565b91505b50949350505050565b604051601f8201601f1916810167ffffffffffffffff81118282101715610bb257634e487b7160e01b600052604160045260246000fd5b604052919050565b600082601f830112610bcb57600080fd5b6000610bd76040610b7b565b9050806040840185811115610beb57600080fd5b845b81811015610c05578035835260209283019201610bed565b509195945050505050565b6000806000806101a08587031215610c2757600080fd5b610c318686610bba565b935085605f860112610c4257600080fd5b6040610c4d81610b7b565b8060c0880189811115610c5f57600080fd5b8389015b81811015610c8457610c758b82610bba565b84526020909301928401610c63565b50819650610c928a82610bba565b9550505050506101008501600087601f830112610cad578081fd5b80610cb860a0610b7b565b90508060a084018a811115610ccb578384fd5b5b80851015610ce7578435825260209485019490910190610ccc565b50969995985093965092945050505056fe30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f0000001a2646970667358221220d366e569e9fa7da146c4fedb40e7196f44b6bee4a9a98e156c9376dfda6b559664736f6c634300081b0033";

type RegistrationCircuitGroth16VerifierConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: RegistrationCircuitGroth16VerifierConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class RegistrationCircuitGroth16Verifier__factory extends ContractFactory {
  constructor(...args: RegistrationCircuitGroth16VerifierConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      RegistrationCircuitGroth16Verifier & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): RegistrationCircuitGroth16Verifier__factory {
    return super.connect(runner) as RegistrationCircuitGroth16Verifier__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RegistrationCircuitGroth16VerifierInterface {
    return new Interface(_abi) as RegistrationCircuitGroth16VerifierInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): RegistrationCircuitGroth16Verifier {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as RegistrationCircuitGroth16Verifier;
  }
}
