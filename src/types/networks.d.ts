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

export interface ICard {
  id: string;
  phone: string;
  fullName: string;
  createdAt: Date;
  updatedAt: Date;
  networkId: string;
  countryId: string;
  network: INetworkResponse;
}
