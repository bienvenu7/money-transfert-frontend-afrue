"use server";

import { instance } from "@/instance";
import { ICountry, IRate } from "@/types/country";

export const getCountries = async () => {
  try {
    const { data, status } = await instance.get("/country/get-countries");
    if (status === 200) {
      return data as ICountry[];
    }
    return { err: "No content found!" };
  } catch (error: any) {
    return error;
  }
};

export const getCountryById = async (id: string) => {
  try {
    const { data, status } = await instance.get(`/country/get-country/${id}`);
    if (status === 200) {
      return data as ICountry;
    }
    return { err: "No content found!" };
  } catch (error: any) {
    return error;
  }
};

export const getRate = async (code: string): Promise<IRate> => {
  const { data } = await instance.get(`/rate/get/rate/${code}`);
  return data;
};
