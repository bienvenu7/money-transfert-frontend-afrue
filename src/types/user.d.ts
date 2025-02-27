export interface IClientResponse {
  id: string;
  email: string;
  fullName: string;
  clientNumber: number;
  whatsappNumber: string;
  Country: {
    id: string;
    pubicName: string;
    name: string;
    createdAt: Date;
    currency: string;
    TelIndex: string;
    TelMaxNumber: string;
  };
}
