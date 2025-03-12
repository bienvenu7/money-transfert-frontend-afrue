"use server";

import { instance } from "@/instance";
import { IFee, INetworkResponse } from "@/types/networks";
import { errorToSendBack } from "./errorHandle";
import { IBadResquestErrorData, IBaseErrorData } from "@/types/fetch";

export const getNetworksById = async (
  id: string
): Promise<INetworkResponse[] | IBaseErrorData | IBadResquestErrorData> => {
  "use server";
  try {
    const { data } = await instance.get(`/network/get-networks/${id}`);
    return data as INetworkResponse[];
  } catch (error: any) {
    return errorToSendBack(error);
  }
};

export const getNetworkByAmount = async (
  networkId: string,
  amount: string
): Promise<IFee | IBaseErrorData | IBadResquestErrorData> => {
  try {
    const { data } = await instance.get(`fee/get-fee/${networkId}/${amount}`);
    return data;
  } catch (error) {
    return errorToSendBack(error);
  }
};
