import { IFee, INetworkResponse } from "./networks";

export enum Status {
  WAITING,
  INPROGRESS,
  CONFIRMED,
  ERROR,
  FINISH,
}

export interface ITrasanctionData {
  id?: string;
  code: string;
  clientEmail: string;
  type: "send" | "receive" | "";
  amountToSend: string;
  receiverName: string;
  receiverPhone: string;
  amountToPayOut: string;
  status: Status;
  networkId: string;
  fees: string;
  origin: string;
}

export interface ITrasanctionDataReady extends ITrasanctionData {
  dateTime: string;
  direction: string;
}

export interface ITrasanctionResponse extends ITrasanctionData {
  Rate: IFee;
  Network: INetworkResponse;
  dateTime: string;
  hour: string;
  month: string;
  year: string;
  complain: string;
  adminCheck: string;
  agencyPhone: string;
  agencyFullName: string;
  createdAt: Date;
}
