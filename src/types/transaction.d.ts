export interface ITrasanctionData {
  countryFrom: string;
  countryWhereTo: string;
  clientEmail: string;
  type: string;
  fullNameFrom: string;
  fullNameWhereTo: string;
  phoneFrom: string;
  phoneWhereTo: string;
  transfertAmount: string;
  ReceiveAmount: string;
  status: string;
  amount: string;
}

export interface ITrasanctionDataReady extends ITrasanctionData {
  dateTime: string;
  direction: string;
}

export interface ITrasanctionResponse {
  dateTime: string;
  direction: string;
  clientEmail: string;
  type: string;
  amount: string;
  fullNameFrom: string;
  fullNameWhereTo: string;
  phoneFrom: string;
  phoneWhereTo: string;
}
