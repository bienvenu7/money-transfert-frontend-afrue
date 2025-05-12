"use client";
import React, { useEffect, useState } from "react";
import Convert from "./Convert";
import { useSelector } from "react-redux";
import {
  selectCountryFromData,
  selectCountryWhereToData,
  selectTransactionType,
} from "@/redux/selector";
import Svgs from "../Svgs";
import ConvertReceive from "./ConvertReceive";
import { getRate } from "@/app/utils/getCountry";

const Convertisseur = () => {
  const transactionType = useSelector(selectTransactionType);
  const countryWhereToData = useSelector(selectCountryWhereToData);
  const countryFrom = useSelector(selectCountryFromData);

  const [rate, setRate] = useState("");
  const exchange = "2.5";

  useEffect(() => {
    const myRate = async () =>
      await getRate(`${countryFrom?.name}-${countryWhereToData?.name}`);
    myRate();
  }, []);

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
      </div>
      <div className="transfert__convert--content">
        <div>
          {<span>Inclure les frais: </span>}
          <label htmlFor="check"></label>
          <input type={`checkbox`} id="check" />
        </div>
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
