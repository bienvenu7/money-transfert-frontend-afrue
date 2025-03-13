"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectClientData,
  selectCountries,
  selectCountry,
  selectCountryFromData,
  selectCountryWhereToData,
  selectTransaction,
  selectTransactionType,
} from "@/redux/selector";
import { AppDispatch } from "@/redux/store";
import {
  getAmountFrom,
  getCountryTo,
  getAmountTo,
  getCountryfrom,
} from "@/redux/transactionReducer";
import Big from "big.js";

type Props = {
  isAuthUser: boolean;
  rate: string;
};

const Convert = ({ isAuthUser, rate }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector(selectClientData);
  const transaction = useSelector(selectTransaction);
  const countries = useSelector(selectCountries);
  const transactionType = useSelector(selectTransactionType);
  const countryFrom = useSelector(selectCountryFromData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    // Big.DP = 10;
    const regex = /^[0-9\b]+$/;

    if (regex.test(event.target.value) || event.target.value === "") {
      const x = new Big(event.target.value === "" ? 0 : event.target.value);
      const y = new Big(rate);
      dispatch(getAmountFrom(event.target.value));
      dispatch(getAmountTo(x.div(y).toString()));
      return;
    }
  };

  const handleCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    dispatch(
      getCountryfrom(countries?.filter((el) => el.id === event.target.value)[0])
    );
  };

  const groupCountry = isAuthUser
    ? countries
    : countries.filter((el) => el.id !== userData?.Country.id);

  return (
    <div className="transfert__convert--list__input">
      <div className="transfert__convert--list__input--left">
        <label htmlFor="send">Montant à envoyer</label>
        <div className="block">
          <div>{countryFrom?.currency}</div>
          <input
            type={"tel"}
            placeholder="Vous envoyer"
            value={transaction.amountToSend}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="transfert__convert--list__input--right">
        <select
          disabled={isAuthUser ? true : false}
          className={`${transactionType}`}
          onChange={handleCountry}
          value={countryFrom?.id as string}
        >
          {groupCountry?.map((el) => (
            <option key={el.id} value={el.id}>
              {el.pubicName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Convert;
