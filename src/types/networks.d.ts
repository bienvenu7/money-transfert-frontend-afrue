export interface INetworkResponse {
  id: string;
  pubicName: string;
  name: string;
  createdAt: Date;
  countryId: string;
}

export interface IFee {
  id: string;
  amount: string;
  amountFrom: string;
  amountTo: string;
  createdAt: Date;
  networkId: string;
}
