import { instance } from "@/instance";
import { IRate } from "@/types/country";

export const getRate = async (code: string): Promise<IRate> => {
  const { data } = await instance.get(`/rate/get/rate/${code}`);
  return data;
};
