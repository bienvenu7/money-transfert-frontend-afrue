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
  return (
    <div className="transfert__convert--wrapper">
      <div className="transfert__convert--list">
        <Convert />
        <button>
          <Svgs name="exchange" />
        </button>
        <ConvertReceive />
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
