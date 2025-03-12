import React, { useState } from "react";
import Convertisseur from "./Convertisseur";
import { AiOutlineDown } from "react-icons/ai";
import { IType } from "./Transaction";
import { ICountry } from "@/types/country";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCountry,
  selectCountryFromData,
  selectCountryWhereToData,
  selectStep,
  selectTransaction,
  selectTransactionType,
} from "@/redux/selector";
import { AppDispatch } from "@/redux/store";
import { getStep } from "@/redux/clientReducer";
import {
  getCode,
  getCountryfrom,
  getCountryTo,
  getNetworks,
} from "@/redux/transactionReducer";
import { getNetworksById } from "@/app/utils/network";
import Image from "next/image";
import { errorMessage } from "@/app/utils/notification";
import { INetworkResponse } from "@/types/networks";

type Props = {};

const QuizTwo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const type = useSelector(selectTransactionType);
  const countryTo = useSelector(selectCountryWhereToData);
  const countryFrom = useSelector(selectCountryFromData);
  const transaction = useSelector(selectTransaction);

  const handleNetwork = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (transaction.amountToPayOut === "" || transaction.amountToSend === "") {
      return errorMessage(
        "Veillez d'abord entrer le montant à envoyer ou soit le montant à recevoir avant de pouvoir avancer!"
      );
    }
    await getNetworksById(countryTo?.id as string)
      .then((el) => dispatch(getNetworks(el as INetworkResponse[])))
      .catch((err) => console.log(err));
    dispatch(getCode(`${countryFrom?.name}-${countryTo?.name}`));
    dispatch(getStep(1));
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
