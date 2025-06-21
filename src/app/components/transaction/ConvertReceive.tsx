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

const ConvertReceive = () => {
  return (
    <div className="transfert__convert--list__input">
      <div className="transfert__convert--list__input--left">
        <label htmlFor="send">Montant à recevoir</label>
        <div className="block">
          <div>{`CSF`}</div>
          <input type={"tel"} placeholder="vous recevez" />
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

export default ConvertReceive;
