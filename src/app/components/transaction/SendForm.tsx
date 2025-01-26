"use client";

import { getNetworksById } from "@/app/utils/network";
import { errorMessage, successMessage } from "@/app/utils/notification";
import { ICountry } from "@/types/country";
import { INetworkResponse } from "@/types/networks";
import { ITrasanctionData } from "@/types/transaction";
import { IClientResponse } from "@/types/user";
import React, { useEffect, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import Confirm from "../modals/Confirm";
import Modal from "../modals/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCountries,
  selectCountry,
  selectNameFrom,
  selectNameTo,
  selectNetworks,
  selectPhoneFrom,
  selectPhoneTo,
  selectSelectedNetwork,
  selectTransaction,
} from "@/redux/selector";
import { AppDispatch } from "@/redux/store";
import {
  getNameFrom,
  getNameTo,
  getNetworkData,
  getPhoneFrom,
  getPhoneTo,
  getSelectedNetwork,
} from "@/redux/transactionReducer";

type Props = {
  countries: ICountry[];
  type: "send" | "receive";
  clientData: IClientResponse;
  countryId: string;
  operator: string;
  name: string;
  phone: string;
  setCountryId: React.Dispatch<React.SetStateAction<string>>;
  setOperator: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  networks: INetworkResponse[];
  setNetworks: React.Dispatch<React.SetStateAction<INetworkResponse[]>>;
};

const SendForm = () => {
  const transaction = useSelector(selectTransaction);
  const countries = useSelector(selectCountries);
  const networks = useSelector(selectNetworks);
  const operator = useSelector(selectSelectedNetwork);
  const nameFrom = useSelector(selectNameFrom);
  const nameTo = useSelector(selectNameTo);
  const phoneFrom = useSelector(selectPhoneFrom);
  const phoneTo = useSelector(selectPhoneTo);
  const countrySelectedata = useSelector(selectCountry);

  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <div className="transfert--send__form">
        <div className="form__input">
          <label htmlFor="country">Pays*</label>
          <select
            disabled
            className={"colored"}
            value={
              transaction.type === "send"
                ? transaction.countryWhereTo
                : transaction.countryFrom
            }
            id="country"
          >
            <option value="">{`Sélectionnez le pays ${
              transaction.type === "send"
                ? "du destinataire"
                : "de l'expéditeur"
            } `}</option>
            {countries.map((el) => (
              <option key={el?.id} value={el?.id}>
                {el?.pubicName}
              </option>
            ))}
          </select>
        </div>
        <div className="form__input">
          <label htmlFor="operator">Opérateur réseau*</label>
          <select
            className={operator !== "" ? "colored" : ""}
            onChange={(e) => {
              dispatch(getSelectedNetwork(e.target.value));
              dispatch(
                getNetworkData(
                  networks?.filter((el) => el.id === e.target.value)[0]
                )
              );
            }}
            value={operator}
            id="operator"
          >
            {networks.length > 0 ? (
              <option value={""}>Sélectionnez un opérateur</option>
            ) : (
              <option value={""}>
                {` Vous devrez d'abord choissir le pays ${
                  transaction.type === "send"
                    ? "du destinataire"
                    : "de l'expéditeur"
                } `}
              </option>
            )}
            {networks.map((el) => (
              <option key={el?.id} value={el?.id}>
                {el?.pubicName}
              </option>
            ))}
          </select>
          {/* {<p>{"Le numéro doit contenir 9 chiffres!"}</p>} */}
        </div>
        <div className="form__input">
          <label htmlFor="name">{`Nom(s) et prénom(s) ${
            transaction?.type === "send" ? "du destinataire" : "de l'expéditeur"
          }*`}</label>
          <input
            className={
              nameFrom.length > 3 || nameTo.length > 3 ? "colored" : "uncolored"
            }
            onChange={(e) => {
              transaction?.type === "send"
                ? dispatch(getNameTo(e.target.value))
                : getNameFrom(e.target.value);
            }}
            id="name"
            type={"text"}
            placeholder="El Nuntia"
            value={transaction?.type === "send" ? nameTo : nameFrom}
          />
          {/* {<p>{"Le nom doit contenir au moins 5 lettres!"}</p>} */}
        </div>
        <div className="form__input">
          <label htmlFor="phone">Le numero relié au compte*</label>
          <input
            className={
              phoneTo.length >=
                parseInt(countrySelectedata?.TelMaxNumber as string) ||
              phoneFrom.length >= 9
                ? "colored"
                : "uncolored"
            }
            onChange={(e) => {
              dispatch(
                transaction?.type === "send"
                  ? getPhoneTo(e.target.value)
                  : getPhoneFrom(e.target.value)
              );
            }}
            value={transaction?.type === "send" ? phoneTo : phoneFrom}
            id="phone"
            type={"tel"}
            placeholder="066007789"
          />
          {/* {<p>{"Le numéro doit contenir 9 chiffres!"}</p>} */}
        </div>
      </div>
    </>
  );
};

export default SendForm;
