"use server";

import { instance } from "@/instance";
import { ICountry } from "@/types/country";

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
