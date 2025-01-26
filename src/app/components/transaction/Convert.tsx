"use client";
import React, { useState, memo, useEffect } from "react";
import { IType } from "./Transaction";
import { errorMessage } from "@/app/utils/notification";
import { ICountry } from "@/types/country";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCountries,
  selectCountry,
  selectCountryWhereToData,
  selectTransaction,
  selectTransactionType,
} from "@/redux/selector";
import { AppDispatch } from "@/redux/store";
import {
  getAmount,
  getCountryTo,
  getCountryToData,
} from "@/redux/transactionReducer";

const list: { name: string; id: number; symbol: string }[] = [
  {
    id: 1,
    name: "Franc cfa de l'afrique centrale",
    symbol: "XAF",
  },
  {
    id: 2,
    name: "Franc cfa de l'afrique de l'ouest",
    symbol: "XOF",
  },
  {
    id: 3,
    name: "Rouble Russe",
    symbol: "RUB",
  },
];

type Props = {
  isAuthUser: boolean;
  name: "send" | "receive";
};

const Convert = ({ isAuthUser, name }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const userCountry = useSelector(selectCountry);
  const transaction = useSelector(selectTransaction);
  const countries = useSelector(selectCountries);
  const transactionType = useSelector(selectTransactionType);
  const countryWhereToData = useSelector(selectCountryWhereToData);

  useEffect(() => {
    dispatch(getCountryToData(countries[2]));
  }, [countries]);

  return (
    <div className="transfert__convert--list__input">
      <div className="transfert__convert--list__input--left">
        <label htmlFor="send">
          {name === "send" ? "Vous envoyer" : "vous recevez"}
        </label>
        <div className="block">
          <div>
            {isAuthUser
              ? (userCountry?.currency as string)
              : (countryWhereToData?.currency as string)}
          </div>
          <input
            readOnly={isAuthUser ? false : true}
            type={"number"}
            placeholder={name === "send" ? "Vous envoyer" : "vous recevez"}
            value={parseInt(transaction.amount)}
            onChange={(event) => dispatch(getAmount(event.target.value))}
          />
        </div>
      </div>
      <div className="transfert__convert--list__input--right">
        <select
          disabled={isAuthUser ? true : false}
          className={`${transactionType}`}
          onChange={(event) => {
            event.preventDefault();
            dispatch(getCountryTo(event.target.value));
            dispatch(
              getCountryToData(
                countries?.filter((el) => el.id === event.target.value)[0]
              )
            );
          }}
          value={isAuthUser ? userCountry?.id : countryWhereToData?.id}
        >
          {countries
            .filter((el) =>
              !isAuthUser ? el.id !== userCountry?.id : el.id !== ""
            )
            .map((el) => (
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
