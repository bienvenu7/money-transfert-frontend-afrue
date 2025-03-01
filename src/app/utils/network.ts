"use server";

import { instance } from "@/instance";
import { IFee, INetworkResponse } from "@/types/networks";
import { errorToSendBack } from "./errorHandle";

export const getNetworksById = async (id: string) => {
  "use server";
  try {
    const { data, status } = await instance.get(`/network/get-networks/${id}`);
    if (status === 200) {
      return data as INetworkResponse[];
    }
    return { err: "No content found!" };
  } catch (error: any) {
    return error.response.data.message;
  }
};

export const getNetworkByAmount = async (
  networkId: string,
  amount: string
): Promise<IFee> => {
  try {
    const { data } = await instance.get(`fee/get-fee/${networkId}/${amount}`);
    return data;
  } catch (error) {
    return errorToSendBack(error);
  }
};
