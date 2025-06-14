/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../../common";

export interface IRegistrarInterface extends Interface {
  getFunction(
    nameOrSignature: "getUserPublicKey" | "isUserRegistered"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getUserPublicKey",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isUserRegistered",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "getUserPublicKey",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isUserRegistered",
    data: BytesLike
  ): Result;
}

export interface IRegistrar extends BaseContract {
  connect(runner?: ContractRunner | null): IRegistrar;
  waitForDeployment(): Promise<this>;

  interface: IRegistrarInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  getUserPublicKey: TypedContractMethod<
    [user: AddressLike],
    [[bigint, bigint]],
    "view"
  >;

  isUserRegistered: TypedContractMethod<[user: AddressLike], [boolean], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "getUserPublicKey"
  ): TypedContractMethod<[user: AddressLike], [[bigint, bigint]], "view">;
  getFunction(
    nameOrSignature: "isUserRegistered"
  ): TypedContractMethod<[user: AddressLike], [boolean], "view">;

  filters: {};
}
