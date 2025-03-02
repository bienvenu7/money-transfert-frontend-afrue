import { IFee, INetworkResponse } from "./networks";

export interface ITrasanctionData {
  id?: string;
  code: string;
  clientEmail: string;
  type: "send" | "receive" | "";
  amountToSend: string;
  receiverName: string;
  receiverPhone: string;
  amountToPayOut: string;
  status: string;
  networkId: string;
  fees: string;
}

export interface ITrasanctionDataReady extends ITrasanctionData {
  dateTime: string;
  direction: string;
}

export interface ITrasanctionResponse extends ITrasanctionData {
  Rate: IFee;
  Network: INetworkResponse;
  dateTime: string;
}
