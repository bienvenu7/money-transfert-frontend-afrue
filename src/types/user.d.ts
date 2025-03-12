import { ICountry } from "./country";

export interface IClientResponse {
  id: string;
  email: string;
  fullName: string;
  clientNumber: number;
  whatsappNumber: string;
  Country: ICountry;
  gender: string;
}
