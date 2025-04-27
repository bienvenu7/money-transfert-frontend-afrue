import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getStep } from "@/redux/clientReducer";
import {
  getCountryfrom,
  getCountryTo,
  getTransactionType,
} from "@/redux/transactionReducer";
import { selectClientData, selectCountries } from "@/redux/selector";
import Image from "next/image";
import { ICountry } from "@/types/country";

const QuizOne = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector(selectClientData);
  const countries = useSelector(selectCountries);

  const handleSend = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    dispatch(getTransactionType("send"));
    dispatch(getStep(1));
    dispatch(getCountryfrom(userData?.Country as ICountry));
    dispatch(
      getCountryTo(
        countries.filter((el) => el.id !== (userData?.Country.id as string))[0]
      )
    );
  };

  const handleReceive = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    dispatch(getTransactionType("receive"));
    dispatch(getStep(1));
    dispatch(getCountryTo(userData?.Country as ICountry));
    dispatch(
      getCountryfrom(
        countries.filter((el) => el.id !== (userData?.Country.id as string))[0]
      )
    );
  };

  return (
    <div className="transfert__slides--question">
      <Image
        src="/grad.png"
        alt=""
        fill
        priority={true}
        loading="eager"
        quality={75}
      />
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
