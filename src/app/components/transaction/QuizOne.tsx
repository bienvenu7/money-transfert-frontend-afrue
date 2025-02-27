import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getStep } from "@/redux/clientReducer";
import {
  getCountryfrom,
  getCountryTo,
  getTransactionType,
} from "@/redux/transactionReducer";
import { selectCountry } from "@/redux/selector";
import Image from "next/image";

const QuizOne = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userCountry = useSelector(selectCountry);

  const handleSend = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    dispatch(getTransactionType("send"));
    dispatch(getStep(1));
    dispatch(getCountryfrom(userCountry?.id as string));
  };

  const handleReceive = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    dispatch(getTransactionType("receive"));
    dispatch(getStep(1));
    dispatch(getCountryTo(userCountry?.id as string));
  };

  return (
    <div className="transfert__slides--question">
      <Image src="/grad.png" alt="" fill />
      <h2>
        {`Veillez s'il plait choisir le type de transaction que vous voulez
        éffectuer :`}
      </h2>
      <div className="transfert__slides--question__btns">
        <div className="transfert__types">
          <div className={"transfert__types--wrapper"}>
            <button onClick={handleSend}>Envoyer</button>
            <button onClick={handleReceive}>Recevoir</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizOne;
