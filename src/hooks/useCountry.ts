import { getCountries, getCountryById, getRate } from '@/lib/country';
import { useQuery } from '@tanstack/react-query';

export const useGetCountries = (page: string) => {
  const {
    data: countries,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['countries', page],
    queryFn: () => getCountries(),
  });
  return { countries, isLoading, isError };
};

export const useGetCountriesById = (countryId: string) => {
  const {
    data: country,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['country', countryId],
    queryFn: () => getCountryById(countryId),
  });
  return { country, isLoading, isError };
};

export const useGetRateByCode = (code: string) => {
  const {
    data: rate,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['rate', code],
    queryFn: () => getRate(code),
  });
  return { rate, isLoading, isError };
};
