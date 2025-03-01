import { selectCountries, selectCountryWhereToData } from "@/redux/selector";
import { AppDispatch } from "@/redux/store";
import { getCountryTo } from "@/redux/transactionReducer";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

const SelectButton = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const countryWhereToData = useSelector(selectCountryWhereToData);
  const countries = useSelector(selectCountries);

  const handleCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    dispatch(
      getCountryTo(countries?.filter((el) => el.id === event.target.value)[0])
    );
  };

  const groupCountry = countries.filter(
    (el) => el.id !== countryWhereToData?.id
  );

  return (
    <select
      disabled={false}
      className={"colored"}
      onChange={handleCountry}
      value={countryWhereToData?.id as string}
    >
      {/* <option value="">{`Sélectionnez le pays du destinataire`}</option> */}
      {groupCountry?.map((el) => (
        <option key={el.id} value={el.id}>
          {el.pubicName}
        </option>
      ))}
    </select>
  );
};

export default SelectButton;
