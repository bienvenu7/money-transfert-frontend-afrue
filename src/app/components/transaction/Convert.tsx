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

const Convert = () => {
  return (
    <div className="transfert__convert--list__input">
      <div className="transfert__convert--list__input--left">
        <label htmlFor="send">Montant à envoyer</label>
        <div className="block">
          <div>{`ZAF`}</div>
          <input type={"tel"} placeholder="Vous envoyer" />
        </div>
      </div>
      <div className="transfert__convert--list__input--right">
        <select>
          {[].map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Convert;
