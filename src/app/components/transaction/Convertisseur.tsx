"use client";
import React, { useState } from "react";
import Convert from "./Convert";
import {
  AiOutlineArrowDown,
  AiOutlineRight,
  AiOutlineSwap,
} from "react-icons/ai";
import { useRouter } from "next/navigation";
import { IType } from "./Transaction";
import { ICountry } from "@/types/country";
import { useSelector } from "react-redux";
import { selectTransaction, selectTransactionType } from "@/redux/selector";

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
  const transaction = useSelector(selectTransaction);

  return (
    <div className="transfert__convert--wrapper">
      <div className="transfert__convert--list">
        <Convert
          name="send"
          isAuthUser={transactionType === "send" ? true : false}
        />
        <button>
          <AiOutlineSwap />
        </button>
        <Convert
          name="receive"
          isAuthUser={transactionType === "receive" ? true : false}
        />
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
