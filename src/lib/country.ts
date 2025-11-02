import { instance } from '@/instance';
import type { ICountry, IRate } from '@/types/country';

export const getCountries = async () => {
  const { data } = await instance.get('/country/get-countries');
  return data as ICountry[];
};

export const getCountryById = async (id: string) => {
  const { data } = await instance.get(`/country/get-country/${id}`);

  return data as ICountry;
};

export const getRate = async (code: string): Promise<IRate> => {
  const { data } = await instance.get(`/rate/get/rate/${code}`);
  return data;
};
