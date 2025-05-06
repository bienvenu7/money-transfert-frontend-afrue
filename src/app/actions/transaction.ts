"use server";

import { cookies } from "next/headers";
import { instance } from "@/instance";
import {
  ITrasanctionData,
  ITrasanctionResponse,
} from "../../types/transaction";
import { errorToSendBack } from "../utils/errorHandle";
import { IBadResquestErrorData, IBaseErrorData } from "@/types/fetch";
import { ICard } from "@/types/networks";

export const createTransaction = async (
  transaction: ITrasanctionData
): Promise<ITrasanctionResponse> => {
  const accessToken = cookies().get("accessToken")?.value;
  const { data } = await instance.post("transaction/create", transaction, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};

export const updateTransaction = async (
  transactionId: string,
  senderNumber: string,
  hour: string,
  reference: string,
  status: string,
  agencyFullName: string
): Promise<ITrasanctionResponse | IBaseErrorData | IBadResquestErrorData> => {
  try {
    const accessToken = cookies().get("accessToken")?.value;
    const { data } = await instance.patch(
      `transaction/update/${transactionId}`,
      { senderNumber, hour, reference, status, agencyFullName },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return data;
  } catch (error: any) {
    return errorToSendBack(error);
  }
};

export const getTransactionById = async (
  transactionId: string
): Promise<ITrasanctionResponse> => {
  const accessToken = cookies().get("accessToken")?.value;
  try {
    const { data } = await instance.get(
      `transaction/get/by-id/${transactionId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    return data;
  } catch (error: any) {
    return error;
  }
};

export const getTransactionByClientEmail = async (
  clientEmail: string,
  date: string
): Promise<ITrasanctionResponse[] | IBaseErrorData | IBadResquestErrorData> => {
  const accessToken = cookies().get("accessToken")?.value;
  try {
    const { data } = await instance.get(
      `transaction/get/by-client/${clientEmail}/${date}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    return data;
  } catch (error: any) {
    return errorToSendBack(error);
  }
};

export const getCardsByNetworkId = async (
  networkId: string
): Promise<ICard> => {
  const accessToken = cookies().get("accessToken")?.value;
  try {
    const { data: cards } = await instance.get(
      `country/get/cards/${networkId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    return cards[Math.floor(Math.random() * cards.length)];
  } catch (error: any) {
    throw error;
  }
};
