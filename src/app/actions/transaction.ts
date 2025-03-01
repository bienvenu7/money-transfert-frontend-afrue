"use server";

import { cookies } from "next/headers";
import { instance } from "@/instance";
import {
  ITrasanctionData,
  ITrasanctionResponse,
} from "../../types/transaction";
import { errorToSendBack } from "../utils/errorHandle";

export const createTransaction = async (
  transaction: ITrasanctionData
): Promise<ITrasanctionResponse> => {
  try {
    const accessToken = cookies().get("accessToken")?.value;
    const { data } = await instance.post("transaction/create", transaction, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data;
  } catch (error: any) {
    return errorToSendBack(error);
  }
};

export const updateTransaction = async (
  transactionId: string,
  senderNumber: string,
  hour: string,
  reference: string,
  status: string
): Promise<ITrasanctionResponse> => {
  try {
    const accessToken = cookies().get("accessToken")?.value;
    const { data } = await instance.patch(
      `transaction/update/${transactionId}`,
      { senderNumber, hour, reference, status },
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
    const { data } = await instance.get(`transaction/get/${transactionId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return data;
  } catch (error) {
    return errorToSendBack(error);
  }
};
