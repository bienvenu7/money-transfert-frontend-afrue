import React, { useState } from "react";
import Convertisseur from "./Convertisseur";
import { AiOutlineDown } from "react-icons/ai";
import { IType } from "./Transaction";
import { ICountry } from "@/types/country";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCountry,
  selectStep,
  selectTransaction,
  selectTransactionType,
} from "@/redux/selector";
import { AppDispatch } from "@/redux/store";
import { getStep } from "@/redux/clientReducer";
import {
  getCountryfrom,
  getCountryTo,
  getNetworks,
} from "@/redux/transactionReducer";
import { getNetworksById } from "@/app/utils/network";
import Image from "next/image";

type Props = {};

const QuizTwo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const type = useSelector(selectTransactionType);
  const transaction = useSelector(selectTransaction);

  const handleNetwork = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    dispatch(getStep(1));
    dispatch(
      getNetworks(
        await getNetworksById(
          transaction?.type === "send"
            ? (transaction?.countryWhereTo as string)
            : (transaction?.countryFrom as string)
        )
      )
    );
  };

  return (
    <div className="transfert__slides--first">
      <Image src="/grad.png" alt="" fill />
      <h2>{`Entrez le montant que vous souhaiter ${
        type === "send" ? "envoyer" : "recevoir"
      }  pour pouvoir avoir l'aperçu de la somme à ${
        type === "send" ? "recevoir" : "envoyer"
      } :`}</h2>
      <div className="transfert__convert">
        <Convertisseur />
      </div>
      <div className="btns">
        <button onClick={() => dispatch(getStep(-1))} type={"button"}>
          <AiOutlineDown />
        </button>
        <button onClick={handleNetwork} type={"button"}>
          <AiOutlineDown />
        </button>
      </div>
    </div>
  );
};

export default QuizTwo;
