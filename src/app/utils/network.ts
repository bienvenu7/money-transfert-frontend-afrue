"use server";

import { instance } from "@/instance";
import { INetworkResponse } from "@/types/networks";

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
