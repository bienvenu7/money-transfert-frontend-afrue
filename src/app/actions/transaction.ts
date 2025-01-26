"use server";

import { cookies } from "next/headers";
import { instance } from "@/instance";
import { ITrasanctionData } from "../../types/transaction";

export const createTransaction = async (transaction: ITrasanctionData) => {
  try {
    const accessToken = cookies().get("accessToken")?.value;
    const { data, status } = await instance.post(
      "transaction/create-transaction",
      transaction,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (status === 201) {
      return data;
    }
  } catch (error: any) {
    console.log(error.response.data.message);
    return error.response.data.message;
  }
};
