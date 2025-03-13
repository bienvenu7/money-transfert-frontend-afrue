import {
  selectClientData,
  selectCountries,
  selectCountry,
  selectCountryWhereToData,
  selectTransaction,
  selectTransactionType,
} from "@/redux/selector";
import { AppDispatch } from "@/redux/store";
import {
  getAmountFrom,
  getAmountTo,
  getCountryTo,
} from "@/redux/transactionReducer";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Big from "big.js";

type Props = {
  isAuthUser: boolean;
  rate: string;
};

const ConvertReceive = ({ isAuthUser, rate }: Props) => {
  const userData = useSelector(selectClientData);
  const countryWhereToData = useSelector(selectCountryWhereToData);
  const transaction = useSelector(selectTransaction);
  const transactionType = useSelector(selectTransactionType);
  const countries = useSelector(selectCountries);

  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    // Big.DP = 10;

    const regex = /^[0-9\b]+$/;

    if (regex.test(event.target.value) || event.target.value === "") {
      const x = new Big(event.target.value === "" ? 0 : event.target.value);
      const y = new Big(rate);
      dispatch(getAmountTo(event.target.value));
      dispatch(getAmountFrom(x.times(y).toString()));
    }
    return;
  };

  const handleCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    dispatch(
      getCountryTo(countries?.filter((el) => el.id === event.target.value)[0])
    );
  };

  const groupCountry = isAuthUser
    ? countries
    : countries.filter((el) => el.id !== userData?.Country.id);

  return (
    <div className="transfert__convert--list__input">
      <div className="transfert__convert--list__input--left">
        <label htmlFor="send">Montant à recevoir</label>
        <div className="block">
          <div>{countryWhereToData?.currency}</div>
          <input
            type={"tel"}
            placeholder="vous recevez"
            value={transaction.amountToPayOut}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="transfert__convert--list__input--right">
        <select
          disabled={isAuthUser ? true : false}
          className={`${transactionType}`}
          onChange={handleCountry}
          value={countryWhereToData?.id as string}
        >
          {groupCountry.map((el) => (
            <option key={el.id} value={el.id}>
              {el.pubicName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ConvertReceive;
