"use client";
import React, { useState } from "react";
import Convert from "./Convert";
import { IType } from "./Transaction";
import { ICountry } from "@/types/country";
import { useSelector } from "react-redux";
import { selectTransaction, selectTransactionType } from "@/redux/selector";
import Svgs from "../Svgs";
import ConvertReceive from "./ConvertReceive";

type Props = {
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  convert: number;
  setConvert: React.Dispatch<React.SetStateAction<number>>;
  type: IType | null;
  countries: ICountry[];
};

const Convertisseur = () => {
  const transactionType = useSelector(selectTransactionType);
  const exchange = "2.5";

  return (
    <div className="transfert__convert--wrapper">
      <div className="transfert__convert--list">
        <Convert
          rate={exchange}
          isAuthUser={transactionType === "send" ? true : false}
        />
        <button>
          <Svgs name="exchange" />
        </button>
        <ConvertReceive
          rate={exchange}
          isAuthUser={transactionType === "receive" ? true : false}
        />
        {/* <Convert
          name="receive"
          isAuthUser={transactionType === "receive" ? true : false}
        /> */}
      </div>
      <div className="transfert__convert--content">
        <div>
          <span>Frais :</span>
          <p>1000 RUB</p>
        </div>
        <div>
          <span>{`Taux d'échange :`}</span>
          <p>1 RUB = 7.9 XAF</p>
        </div>
      </div>
    </div>
  );
};

export default Convertisseur;
