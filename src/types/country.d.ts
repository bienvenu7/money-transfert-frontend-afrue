export interface ICountry {
  id: string;
  pubicName: string;
  name: string;
  createdAt?: Date;
  currency: string;
  TelIndex: string;
  TelMaxNumber: string;
}

export interface IRate {
  id: string;
  iltineraire: string;
  code: string;
  Total: string;
  frais: string;
  taux: string;
}
