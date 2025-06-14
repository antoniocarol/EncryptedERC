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
  TransferCircuitGroth16Verifier,
  TransferCircuitGroth16VerifierInterface,
} from "../../../contracts/verifiers/TransferCircuitGroth16Verifier";

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
    name: "IC10_X",
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
    name: "IC10_Y",
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
    name: "IC11_X",
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
    name: "IC11_Y",
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
    name: "IC12_X",
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
    name: "IC12_Y",
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
    name: "IC13_X",
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
    name: "IC13_Y",
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
    name: "IC14_X",
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
    name: "IC14_Y",
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
    name: "IC15_X",
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
    name: "IC15_Y",
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
    name: "IC16_X",
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
    name: "IC16_Y",
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
    name: "IC17_X",
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
    name: "IC17_Y",
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
    name: "IC18_X",
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
    name: "IC18_Y",
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
    name: "IC19_X",
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
    name: "IC19_Y",
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
    name: "IC20_X",
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
    name: "IC20_Y",
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
    name: "IC21_X",
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
    name: "IC21_Y",
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
    name: "IC22_X",
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
    name: "IC22_Y",
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
    name: "IC23_X",
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
    name: "IC23_Y",
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
    name: "IC24_X",
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
    name: "IC24_Y",
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
    name: "IC25_X",
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
    name: "IC25_Y",
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
    name: "IC26_X",
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
    name: "IC26_Y",
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
    name: "IC27_X",
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
    name: "IC27_Y",
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
    name: "IC28_X",
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
    name: "IC28_Y",
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
    name: "IC29_X",
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
    name: "IC29_Y",
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
    name: "IC30_X",
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
    name: "IC30_Y",
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
    name: "IC31_X",
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
    name: "IC31_Y",
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
    name: "IC32_X",
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
    name: "IC32_Y",
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
    name: "IC6_X",
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
    name: "IC6_Y",
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
    name: "IC7_X",
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
    name: "IC7_Y",
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
    name: "IC8_X",
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
    name: "IC8_Y",
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
    name: "IC9_X",
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
    name: "IC9_Y",
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
        internalType: "uint256[32]",
        name: "publicSignals_",
        type: "uint256[32]",
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
  "0x6080604052348015600f57600080fd5b5061232a8061001f6000396000f3fe608060405234801561001057600080fd5b50600436106104ac5760003560e01c8063742797c41161026d578063d0fdd6af11610151578063dfcf46f0116100ce578063e834dbdd11610092578063e834dbdd1461100b578063e848dd6f14611031578063eb38888b14611058578063eeb9f2e41461107f578063eedee58f146110a5578063f7a65aae14610f4857600080fd5b8063dfcf46f014610f48578063e11e8ee214610f6f578063e1e7dabb14610f96578063e552575914610fbd578063e662660614610fe457600080fd5b8063d8c710e011610115578063d8c710e014610e85578063dacb4e6914610eac578063dc05a82214610ed3578063dce4200414610efa578063dd924b4714610f2157600080fd5b8063d0fdd6af14610de9578063d1fb02a314610e10578063d663b36514610e37578063d70a63cc14610be5578063d7aa472a14610e5e57600080fd5b8063a127ed86116101ea578063aed43349116101ae578063aed4334914610d4d578063b936325c1461081c578063ba68817514610d74578063bf48189e14610d9b578063c4c642ef14610dc2578063cc9c92ae14610d2657600080fd5b8063a127ed8614610ca8578063a1978c3c14610ccf578063a6aca97614610cf6578063ac6f103e14610cff578063acb4193614610d2657600080fd5b8063901660c411610231578063901660c414610be5578063924f0a1514610c0c5780639683682614610c33578063970e603714610c5a5780639c8b8ac514610c8157600080fd5b8063742797c414610b235780637fdf8fc114610b4a578063839a60d014610b7157806385b195eb14610b98578063898611fd14610bbe57600080fd5b8063396375031161039457806355061a7a1161031157806361bb1795116102d557806361bb179514610a3a5780636336ec6c14610a6157806363d2f16814610a885780636a5935a714610aaf5780636e8374dc14610ad657806373354b6014610afd57600080fd5b806355061a7a1461097757806359b396b51461099e5780635bf9f093146109c55780635c01e537146109ec5780636076d7ed14610a1357600080fd5b806345ce05a81161035857806345ce05a8146108b45780634b750a92146108db5780634e528e9f146109025780634e890b271461092957806350def9051461095057600080fd5b806339637503146107f65780633a9e6a4d1461081c5780633cc08b241461084357806341fe6a9a146108665780634234a1d61461088d57600080fd5b806324934a111161042d5780632dacca56116103f15780632dacca561461070d57806330c1731c1461073457806331aa5e261461075b57806332148d471461078257806334a18522146107a957806336b397dc146107cf57600080fd5b806324934a111461064a578063286f014b1461067157806328e44695146106985780632c0556ed146106bf5780632d527448146106e657600080fd5b80630ddec475116104745780630ddec475146105875780630de199a5146105ae5780631077f544146105d557806311fbfe66146105fc5780631c4d44061461062357600080fd5b806302020654146104b157806308cceecf146104eb5780630c99ab7c146105125780630cbb35c3146105395780630d48668814610560575b600080fd5b6104d87f20b5f9d2929f9d1c416549f2bf4d007519ecbece59b3c0e764f31286dfe37b7c81565b6040519081526020015b60405180910390f35b6104d87f06afe48c571539099da5ac59491e0e203df5658ff654b250b0525ed791bde83f81565b6104d87f04f109a9043f0736c31fd7ac58c1371d9ad11830eb63341596dd6a075566c2ed81565b6104d87f2556d9fbc17cae3e3790ab6bd9d314d1954140f9d02adb59b9b48ee979a5d23081565b6104d87f229d46bb0f28980f63ed732ac9c63a8201e1911f5cb5f8110d311be0fade10aa81565b6104d87f30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f000000181565b6104d87f0a9068bb86cc932e13eecb08b3f022e0bdf9f1f695929e21294033e53c919b8b81565b6104d87f288b33d9fa44f864c5c91f790fa50e5c2a698f417d260f5e9d54c0d8a1bda6ed81565b6104d87f15fd0def66442f6145179e697ddd2eb4210cd4f0ab9f648395ca60fc0a3a838f81565b6104d87f1739c1b1a457a8c7313123d24d2f9192f896b7c63eea05a9d57f06547ad0cec881565b6104d87f23fcf72fb01b297050f5a24417038f2a0a6a50dbfcac6941d430374bdf59449281565b6104d87f1f81db9c744e0cb02e4553bba155ece68cf6ade88b69514a949415ff91d22f6281565b6104d87f28c652662a86080d4c5d09b938ebeed07b7a217c9b8c4cdad790a3c9dfe4c97b81565b6104d87f1f875f7286bd16986ef99bccccd27a3786a035ac93db1e683ff8d84d3a53ef7c81565b6104d87f06fa3b9bbc0f1161c019c848596cdf154e18874ac84e48ada9b26891489d80ff81565b6104d87f23c5ff4a6af434b289e8865783ec931fd1b0726bc15bca93dbe42f010d3563ea81565b6104d87f021d5de6e1e78a94e3f1ba87d967aeb0a16f428f56ff3f430397b27fb73afca481565b6104d87f2cff3b75b31a9408d6fd59ec89820a6ec62f692e03c27afe0d8a8ebba51420cc81565b6104d87f098bed6b8829c7cba186c8a05dec1296d4b567b7ac693738d5b7c779caf600a281565b6104d87e907377179f86703005860e48c37223ba67a3af40c0d92603b70d846df712f181565b6104d87f2b308bcd2e81aec22d71893e7f3c3c000af9543e66b6f0dc3b4b32858961c13b81565b6104d87e447e7b8a936665056915e9cdde693b78cdd4e5f6c573faadef8e190e71a90b81565b6104d87f090689d0585ff075ec9e99ad690c3395bc4b313370b38ef355acdadcd122975b81565b61085661085136600461220f565b6110cc565b60405190151581526020016104e2565b6104d87f2e8e422476c8aa10edb674c8d67cc22bb8f93f29dfc9031d52322ffbb309c66e81565b6104d87f12de9c799ecf41aecd06bb5a9180add5a574c4b444f2da65dd008f421d29c93781565b6104d87f0cfba7b3d2b6b5146f13aa9b38d237420b43d456bd551a1e95284a74d5fdc9ce81565b6104d87f114a80e01b3c8257e89901f851be4d95a86cc2d547d9270bad02e7da8dbea86981565b6104d87f19dc1ae1cb1ab8db0aea2d2666c4a413dddb3bd65ee2677bfbf709b115da552f81565b6104d87f07336b93c4558113f410c97c43cfd9ad5d2bc0e0b4cdd3eec71f4b840333958e81565b6104d87f13c7352a8f29919d93cc94bf86c8800bda20aef8797d1abc871750feff8bc3dd81565b6104d87f107a259d8f5ff4c316ff76a5fab4bcd8df012f40c60385045064477fb0c3934b81565b6104d87f28eefa9e331561e3021c05d89a7803ef9401969d098d346f05478edfa924ca3f81565b6104d87f05ffdc39e07d30c593e450f343692336797fb2b9d7928579beddf5b4314c2f2881565b6104d87f078e441d5f913298eee2b136349e447b0c4ef2a5568c6393dbaf10b499d31b3581565b6104d87f1c03c3897f2cfc2f0185b5e379fde762b7bd1dbd337b6095faa29f20a12a95a381565b6104d87f02f7e60587d3f233c2061fb131fbd84c3cb1d413ae5b8fae41400cb4645b0b4f81565b6104d87f187e2f19d9d1cc66cfa50a02a10b80eced78334b2bcdb24ea443bfb4a6ac9ced81565b6104d87f10c8404c7de800423f4f084eef24083c7e8bf909f56a84233cf5847507570a1d81565b6104d87f14bedd503c37ceb061d8ec60209fe345ce89830a19230301f076caff004d192681565b6104d87f08f8782826c3f003694c4122b0546b6a5a0d7f47ce4be9c09741cd1d7e6883da81565b6104d87e10904681e4eb2129062bb0d32ee1df78d16c79610196fc3e965029414d5cbb81565b6104d87f0d5b82e143fe82261e806bd844fb31c04d96ec4992ed1487c096b7092772c41d81565b6104d87f0e187847ad4c798374d0d6732bf501847dd68bc0e071241e0213bc7fc13db7ab81565b6104d87f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd4781565b6104d87e731d446be28eac35291905a299316a911ba3c0f08e9d2890e6d8988585ee4e81565b6104d87f247b88a7b1c3b2dce69247f47f696c290414de2277888bbd8b9ca36b01bc18ac81565b6104d87f198e9393920d483a7260bfb731fb5d25f1aa493335a9e71297e485b7aef312c281565b6104d87f0d724b53103d7718a13d6c815182f8ee319835c261e8e92b961f39f162a3fa9d81565b6104d87f01b514b6e343d274e0c5e3094c112cbba2d4cb29c4caaac8d23b6b3f4093090b81565b6104d87f02dc9b404f8e38e5f19eb4647a99e5502de7e8b74e549b1b1b4f66602d4c62c381565b6104d87f039ad749fee897f891546936fec6f5f035d0f8ea0468ddf897ec6e649d162be181565b6104d87f2ae069085c5956425591f6237f3b38a6e76406381a72b4e086362bf8ebd0790d81565b6104d87f0c415c50362c02920367e1c45dc5952cefa926950dae3bd6cdd0d9c9c14537e481565b6104d861030081565b6104d87f1c82cef521a0b840790f85d830cb96d5377bb7372ba7577cbb606a8affe403a781565b6104d87f12c85ea5db8c6deb4aab71808dcb408fe3d1e7690c43d37b4ce6cc0166fa7daa81565b6104d87f16f1d2a2ad4096aec237215770d14e74bb837c04448b166a41269febddc4f56f81565b6104d87f1bf082025f3757c9d01172b545483267080ccd8e4dba8cc1df9f9ee0308f23ab81565b6104d87f0f20c0fb8c72346a2d8b713008894506c97c6813fa1c0496d5b1c25f87728fd381565b6104d87f1b3d150c69189120a0d813b66bd5fa6f90d2fc49d50bae8aa34d90d9571a08f781565b6104d87f24d9dd358e13725ba0641428d2406b43479181d6208afaaa5abcb7accb37f43081565b6104d87f2d4d9aa7e302d9df41749d5507949d05dbea33fbb16c643b22f599a2be6df2e281565b6104d87f2185e663e3286b2e6013c9ab15951771ffb42646644f51113427eba2d71d451381565b6104d87f1f46e0aef5e5a33dcef3c91c6168cc7ddc121d534ba27b1b9d0f10fa4f9e799e81565b6104d87f11b4c385d2519be8eb926b757e396fa776d98d0a5fa69466f3eed4b958e6dd1e81565b6104d87f2023f14a57c38cf4dd2a01d88ff44452dd1a144627a0fbde9757548d0578af6581565b6104d87f0967032fcbf776d1afc985f88877f182d38480a653f2decaa9794cbc3bf3060c81565b6104d87f264f55b7d972df8121b2f8473e161bb7afe44003c34464d2eebf29446cbdaa0881565b6104d87f304cfbd1e08a704a99f5e847d93f8c3caafddec46b7a0d379da69a4d112346a781565b6104d87f1800deef121f1e76426a00665e5c4479674322d4f75edadd46debd5cd992f6ed81565b6104d87f226e31cb9ba7b28a0b157e5f39c232c0c81c0f7d3cbd7ff8662d674fb383c7d881565b6104d87f17888aa0284ff8d6a7b462ede5f31f52052e4db8fc394f0cc9c6d1ba548c21b681565b6104d87f2591ca675cb4590538f31db2fab149e7985ea042c4f57ba4ce5fcd52be095ec181565b6104d87f150c5d9bbe16b91062f765ffd9618d8337a9f8da0c3890db54be7ec391ffeb8181565b6104d87e6930dfc6200db7ad8b4c58b6780100e744a535f4b8713dc43d4aa39b710a7781565b6104d87f15f0312e34b132b3dbe7a824f8f9cb9d662d0a1e67c18a14a4604d93cf239f6d81565b6104d87f2d70a74b4a4be610cab3be650556d79582ae45798c4e5d740db3c378bc0ce07281565b6104d87ec7cf61488c43d82b3c607609f184ca52145a4fb28c46e4d59ea4fcf2acf26181565b6104d87f2229733e523a60e720c445d6551ec3d0890c2f5fa87b968ecb72eb5f1179bc5781565b6000611f12565b7f30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f00000011190565b816040820152826060820152836080820152600060408083016060604085016007611770fa3d1515169050801561113b5760408260808460066096fa3d15151690505b949350505050565b7f187e2f19d9d1cc66cfa50a02a10b80eced78334b2bcdb24ea443bfb4a6ac9ced85527f0d5b82e143fe82261e806bd844fb31c04d96ec4992ed1487c096b7092772c41d602086015260006111de60008601517f0c415c50362c02920367e1c45dc5952cefa926950dae3bd6cdd0d9c9c14537e47f2185e663e3286b2e6013c9ab15951771ffb42646644f51113427eba2d71d4513896110f8565b15611f095761123360208601517f2556d9fbc17cae3e3790ab6bd9d314d1954140f9d02adb59b9b48ee979a5d2307f264f55b7d972df8121b2f8473e161bb7afe44003c34464d2eebf29446cbdaa08896110f8565b15611f095761128860408601517f13c7352a8f29919d93cc94bf86c8800bda20aef8797d1abc871750feff8bc3dd7f12de9c799ecf41aecd06bb5a9180add5a574c4b444f2da65dd008f421d29c937896110f8565b15611f09576112dd60608601517f07336b93c4558113f410c97c43cfd9ad5d2bc0e0b4cdd3eec71f4b840333958e7f2229733e523a60e720c445d6551ec3d0890c2f5fa87b968ecb72eb5f1179bc57896110f8565b15611f095761133260808601517f23fcf72fb01b297050f5a24417038f2a0a6a50dbfcac6941d430374bdf5944927f247b88a7b1c3b2dce69247f47f696c290414de2277888bbd8b9ca36b01bc18ac896110f8565b15611f095761138760a08601517f0f20c0fb8c72346a2d8b713008894506c97c6813fa1c0496d5b1c25f87728fd37f16f1d2a2ad4096aec237215770d14e74bb837c04448b166a41269febddc4f56f896110f8565b15611f09576113dc60c08601517f1f875f7286bd16986ef99bccccd27a3786a035ac93db1e683ff8d84d3a53ef7c7f2cff3b75b31a9408d6fd59ec89820a6ec62f692e03c27afe0d8a8ebba51420cc896110f8565b15611f095761143160e08601517f23c5ff4a6af434b289e8865783ec931fd1b0726bc15bca93dbe42f010d3563ea7f2e8e422476c8aa10edb674c8d67cc22bb8f93f29dfc9031d52322ffbb309c66e896110f8565b15611f09576114876101008601517f28c652662a86080d4c5d09b938ebeed07b7a217c9b8c4cdad790a3c9dfe4c97b7f2023f14a57c38cf4dd2a01d88ff44452dd1a144627a0fbde9757548d0578af65896110f8565b15611f09576114dd6101208601517f15f0312e34b132b3dbe7a824f8f9cb9d662d0a1e67c18a14a4604d93cf239f6d7f15fd0def66442f6145179e697ddd2eb4210cd4f0ab9f648395ca60fc0a3a838f896110f8565b15611f09576115316101408601517e10904681e4eb2129062bb0d32ee1df78d16c79610196fc3e965029414d5cbb7e447e7b8a936665056915e9cdde693b78cdd4e5f6c573faadef8e190e71a90b896110f8565b15611f09576115876101608601517f1bf082025f3757c9d01172b545483267080ccd8e4dba8cc1df9f9ee0308f23ab7f2ae069085c5956425591f6237f3b38a6e76406381a72b4e086362bf8ebd0790d896110f8565b15611f09576115dd6101808601517f288b33d9fa44f864c5c91f790fa50e5c2a698f417d260f5e9d54c0d8a1bda6ed7f2b308bcd2e81aec22d71893e7f3c3c000af9543e66b6f0dc3b4b32858961c13b896110f8565b15611f09576116326101a08601517e6930dfc6200db7ad8b4c58b6780100e744a535f4b8713dc43d4aa39b710a777f11b4c385d2519be8eb926b757e396fa776d98d0a5fa69466f3eed4b958e6dd1e896110f8565b15611f09576116886101c08601517f021d5de6e1e78a94e3f1ba87d967aeb0a16f428f56ff3f430397b27fb73afca47f114a80e01b3c8257e89901f851be4d95a86cc2d547d9270bad02e7da8dbea869896110f8565b15611f09576116de6101e08601517f098bed6b8829c7cba186c8a05dec1296d4b567b7ac693738d5b7c779caf600a27f226e31cb9ba7b28a0b157e5f39c232c0c81c0f7d3cbd7ff8662d674fb383c7d8896110f8565b15611f09576117346102008601517f06fa3b9bbc0f1161c019c848596cdf154e18874ac84e48ada9b26891489d80ff7f1f81db9c744e0cb02e4553bba155ece68cf6ade88b69514a949415ff91d22f62896110f8565b15611f095761178a6102208601517f24d9dd358e13725ba0641428d2406b43479181d6208afaaa5abcb7accb37f4307f0cfba7b3d2b6b5146f13aa9b38d237420b43d456bd551a1e95284a74d5fdc9ce896110f8565b15611f09576117e06102408601517f1c03c3897f2cfc2f0185b5e379fde762b7bd1dbd337b6095faa29f20a12a95a37f28eefa9e331561e3021c05d89a7803ef9401969d098d346f05478edfa924ca3f896110f8565b15611f09576118366102608601517f05ffdc39e07d30c593e450f343692336797fb2b9d7928579beddf5b4314c2f287f20b5f9d2929f9d1c416549f2bf4d007519ecbece59b3c0e764f31286dfe37b7c896110f8565b15611f095761188c6102808601517f19dc1ae1cb1ab8db0aea2d2666c4a413dddb3bd65ee2677bfbf709b115da552f7f1f46e0aef5e5a33dcef3c91c6168cc7ddc121d534ba27b1b9d0f10fa4f9e799e896110f8565b15611f09576118e26102a08601517f0d724b53103d7718a13d6c815182f8ee319835c261e8e92b961f39f162a3fa9d7f04f109a9043f0736c31fd7ac58c1371d9ad11830eb63341596dd6a075566c2ed896110f8565b15611f09576119386102c08601517f06afe48c571539099da5ac59491e0e203df5658ff654b250b0525ed791bde83f7f0a9068bb86cc932e13eecb08b3f022e0bdf9f1f695929e21294033e53c919b8b896110f8565b15611f095761198d6102e08601517ec7cf61488c43d82b3c607609f184ca52145a4fb28c46e4d59ea4fcf2acf2617f2d70a74b4a4be610cab3be650556d79582ae45798c4e5d740db3c378bc0ce072896110f8565b15611f09576119e36103008601517f1c82cef521a0b840790f85d830cb96d5377bb7372ba7577cbb606a8affe403a77f1b3d150c69189120a0d813b66bd5fa6f90d2fc49d50bae8aa34d90d9571a08f7896110f8565b15611f0957611a396103208601517f10c8404c7de800423f4f084eef24083c7e8bf909f56a84233cf5847507570a1d7f01b514b6e343d274e0c5e3094c112cbba2d4cb29c4caaac8d23b6b3f4093090b896110f8565b15611f0957611a8f6103408601517f150c5d9bbe16b91062f765ffd9618d8337a9f8da0c3890db54be7ec391ffeb817f229d46bb0f28980f63ed732ac9c63a8201e1911f5cb5f8110d311be0fade10aa896110f8565b15611f0957611ae46103608601517f107a259d8f5ff4c316ff76a5fab4bcd8df012f40c60385045064477fb0c3934b7e731d446be28eac35291905a299316a911ba3c0f08e9d2890e6d8988585ee4e896110f8565b15611f0957611b3a6103808601517f078e441d5f913298eee2b136349e447b0c4ef2a5568c6393dbaf10b499d31b357f02dc9b404f8e38e5f19eb4647a99e5502de7e8b74e549b1b1b4f66602d4c62c3896110f8565b15611f0957611b8f6103a08601517e907377179f86703005860e48c37223ba67a3af40c0d92603b70d846df712f17f08f8782826c3f003694c4122b0546b6a5a0d7f47ce4be9c09741cd1d7e6883da896110f8565b15611f0957611be56103c08601517f039ad749fee897f891546936fec6f5f035d0f8ea0468ddf897ec6e649d162be17f2591ca675cb4590538f31db2fab149e7985ea042c4f57ba4ce5fcd52be095ec1896110f8565b15611f0957611c3b6103e08601517f17888aa0284ff8d6a7b462ede5f31f52052e4db8fc394f0cc9c6d1ba548c21b67f02f7e60587d3f233c2061fb131fbd84c3cb1d413ae5b8fae41400cb4645b0b4f896110f8565b15611f09577f198e9393920d483a7260bfb731fb5d25f1aa493335a9e71297e485b7aef312c260408701527f1800deef121f1e76426a00665e5c4479674322d4f75edadd46debd5cd992f6ed60608701527f090689d0585ff075ec9e99ad690c3395bc4b313370b38ef355acdadcd122975b60808701527f12c85ea5db8c6deb4aab71808dcb408fe3d1e7690c43d37b4ce6cc0166fa7daa60a0870152815160c08701527f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd4760208301517f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd47030660e087015282515161010087015260208351015161012087015260208301515161014087015260208084015101516101608701527f2d4d9aa7e302d9df41749d5507949d05dbea33fbb16c643b22f599a2be6df2e26101808701527f14bedd503c37ceb061d8ec60209fe345ce89830a19230301f076caff004d19266101a08701527f0967032fcbf776d1afc985f88877f182d38480a653f2decaa9794cbc3bf3060c6101c08701527f0e187847ad4c798374d0d6732bf501847dd68bc0e071241e0213bc7fc13db7ab6101e08701527f304cfbd1e08a704a99f5e847d93f8c3caafddec46b7a0d379da69a4d112346a76102008701527f1739c1b1a457a8c7313123d24d2f9192f896b7c63eea05a9d57f06547ad0cec8610220870152835161024087015260208401516102608701527f198e9393920d483a7260bfb731fb5d25f1aa493335a9e71297e485b7aef312c26102808701527f1800deef121f1e76426a00665e5c4479674322d4f75edadd46debd5cd992f6ed6102a08701527f090689d0585ff075ec9e99ad690c3395bc4b313370b38ef355acdadcd122975b6102c08701527f12c85ea5db8c6deb4aab71808dcb408fe3d1e7690c43d37b4ce6cc0166fa7daa6102e08701526020866103008860086202c308fa86511690505b95945050505050565b604051610300810160405260019150611f2e60008401516110d3565b82169150611f3f60208401516110d3565b82169150611f5060408401516110d3565b82169150611f6160608401516110d3565b82169150611f7260808401516110d3565b82169150611f8360a08401516110d3565b82169150611f9460c08401516110d3565b82169150611fa560e08401516110d3565b82169150611fb76101008401516110d3565b82169150611fc96101208401516110d3565b82169150611fdb6101408401516110d3565b82169150611fed6101608401516110d3565b82169150611fff6101808401516110d3565b821691506120116101a08401516110d3565b821691506120236101c08401516110d3565b821691506120356101e08401516110d3565b821691506120476102008401516110d3565b821691506120596102208401516110d3565b8216915061206b6102408401516110d3565b8216915061207d6102608401516110d3565b8216915061208f6102808401516110d3565b821691506120a16102a08401516110d3565b821691506120b36102c08401516110d3565b821691506120c56102e08401516110d3565b821691506120d76103008401516110d3565b821691506120e96103208401516110d3565b821691506120fb6103408401516110d3565b8216915061210d6103608401516110d3565b8216915061211f6103808401516110d3565b821691506121316103a08401516110d3565b821691506121436103c08401516110d3565b821691506121556103e08401516110d3565b82169150811519156121715761216e818486888a611143565b91505b50949350505050565b604051601f8201601f1916810167ffffffffffffffff811182821017156121b157634e487b7160e01b600052604160045260246000fd5b604052919050565b600082601f8301126121ca57600080fd5b60006121d6604061217a565b90508060408401858111156121ea57600080fd5b845b818110156122045780358352602092830192016121ec565b509195945050505050565b600080600080610500858703121561222657600080fd5b61223086866121b9565b935085605f86011261224157600080fd5b604061224c8161217a565b8060c088018981111561225e57600080fd5b8389015b81811015612283576122748b826121b9565b84526020909301928401612262565b508196506122918a826121b9565b9550505050506101008501600087601f8301126122ac578081fd5b806104006122b98161217a565b91508301818a8211156122ca578384fd5b5b818510156122e35784358152602094850194016122cb565b50969995985093965092945050505056fea264697066735822122042040c6ec27189dbb1eb04066062bea235410d0edbf585e270de6cc022750fc764736f6c634300081b0033";

type TransferCircuitGroth16VerifierConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TransferCircuitGroth16VerifierConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TransferCircuitGroth16Verifier__factory extends ContractFactory {
  constructor(...args: TransferCircuitGroth16VerifierConstructorParams) {
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
      TransferCircuitGroth16Verifier & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): TransferCircuitGroth16Verifier__factory {
    return super.connect(runner) as TransferCircuitGroth16Verifier__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TransferCircuitGroth16VerifierInterface {
    return new Interface(_abi) as TransferCircuitGroth16VerifierInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): TransferCircuitGroth16Verifier {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as TransferCircuitGroth16Verifier;
  }
}
