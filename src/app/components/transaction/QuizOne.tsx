import React from "react";
import { AiOutlineArrowDown } from "react-icons/ai";
import { IType } from "./Transaction";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getStep } from "@/redux/clientReducer";
import {
  getCountryfrom,
  getCountryTo,
  getTransactionType,
} from "@/redux/transactionReducer";
import { selectCountry, selectTransaction } from "@/redux/selector";

interface Props {}

const QuizOne = () => {
  const dispatch = useDispatch<AppDispatch>();
  const transaction = useSelector(selectTransaction);
  const userCountry = useSelector(selectCountry);

  return (
    <div className="transfert__slides--question">
      <h2>
        {`Veillez s'il plait choisir le type de transaction que vous voulez
        éffectuer :`}
      </h2>
      <div className="transfert__slides--question__btns">
        <div className="transfert__types">
          <div className={"transfert__types--wrapper"}>
            <button
              onClick={() => {
                dispatch(getTransactionType("send"));
                dispatch(getStep(1));

                if (transaction.type === "send") {
                  dispatch(getCountryfrom(userCountry?.id as string));
                } else {
                  dispatch(getCountryTo(userCountry?.id as string));
                }
              }}
            >
              Envoyer <AiOutlineArrowDown />
            </button>
            <button
              onClick={() => {
                dispatch(getTransactionType("receive"));
                dispatch(getStep(1));

                if (transaction.type === "receive") {
                  dispatch(getCountryTo(userCountry?.id as string));
                } else {
                  dispatch(getCountryfrom(userCountry?.id as string));
                }
              }}
            >
              Recevoir <AiOutlineArrowDown />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizOne;
