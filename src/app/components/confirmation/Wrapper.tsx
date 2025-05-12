"use client";
import React, { useState } from "react";
import Copied from "./Copied";
import { ICard } from "@/types/networks";
import { ITrasanctionResponse } from "@/types/transaction";
import Confirmation from "./Confirmation";

type Props = {
  card: ICard;
  transaction: ITrasanctionResponse;
};

const Wrapper = ({ card, transaction }: Props) => {
  const [step, setStep] = useState<number>(1);
  return (
    <div className="transfert__confirmation--content">
      <div className="transfert__confirmation--content__left">
        <h2>Veillez éffectuer un dépot aux coordonnées ci dessous</h2>
        <p>
          {`Veillez noter que nous allons avoir besoin des informations relatives
          au depot comme le numero d'envoie et autres pour valider
          votre transaction`}
        </p>
        <div className="transfert__confirmation--content__left--cards">
          <div className="transfert__confirmation--content__row">
            <h3>Methode</h3>
            <span>{card?.network.pubicName}</span>
          </div>
          <div className="transfert__confirmation--content__row">
            <h3>N° du compte</h3>
            <span>{card?.phone}</span>
          </div>
          <div className="transfert__confirmation--content__row">
            <h3>Nom</h3>
            <span>{card?.fullName}</span>
          </div>
          <div className="transfert__confirmation--content__row">
            <h3>Montant</h3>
            <span>{transaction.amountToSend} xaf</span>
          </div>
        </div>
        <Copied
          method={card?.network.pubicName}
          motant={transaction.amountToSend}
          name={card?.fullName}
          phone={card?.phone}
          setStep={setStep}
        />
      </div>
      {step === 2 && <Confirmation card={card} />}
    </div>
  );
};

export default Wrapper;
