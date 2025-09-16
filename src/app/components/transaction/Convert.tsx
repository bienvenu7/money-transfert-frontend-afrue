"use client";
import React, { useEffect, useState } from "react";

const countries = [
  {
    id: "cg",
    name: "République du Congo",
    flag: "/static/flags/cg.png",
    currency: "XAF",
  },
  {
    id: "cam",
    name: "Caméroun",
    flag: "/static/flags/cam.png",
    currency: "XAF",
  },
  {
    id: "sen",
    name: "Sénégal",
    flag: "/static/flags/sen.png",
    currency: "XOF",
  },
  {
    id: "civ",
    name: "Côte d'ivoire",
    flag: "/static/flags/civ.png",
    currency: "XOF",
  },
  {
    id: "ru",
    name: "Fédération de Russie",
    flag: "/static/flags/ru.png",
    currency: "RUB",
  },
  {
    id: "rca",
    name: "République centrafricaine",
    flag: "/static/flags/rca.png",
    currency: "XAF",
  },
  {
    id: "gab",
    name: "Gabon",
    flag: "/static/flags/gab.png",
    currency: "XAF",
  },
  {
    id: "tchad",
    name: "Tchad",
    flag: "/static/flags/tchad.png",
    currency: "XAF",
  },
  {
    id: "mali",
    name: "Mali",
    flag: "/static/flags/mali.png",
    currency: "XOF",
  },
  {
    id: "gib",
    name: "Guinée bissau",
    flag: "/static/flags/gib.png",
    currency: "XOF",
  },
  {
    id: "buf",
    name: "Burkina Fasso",
    flag: "/static/flags/buf.png",
    currency: "XOF",
  },
  {
    id: "nr",
    name: "Niger",
    flag: "/static/flags/nr.png",
    currency: "XOF",
  },
];

const Convert = () => {
  return (
    <div className="transfertConvert__convert--list__input">
      <div className="transfertConvert__convert--list__input--left">
        <label htmlFor="send">Montant à envoyer</label>
        <div className="block">
          <div>{`ZAF`}</div>
          <input type={"tel"} placeholder="Vous envoyer" />
        </div>
      </div>
      <div className="transfertConvert__convert--list__input--right">
        <select>
          {countries.map((el) => (
            <option key={el.id} value={el.id}>
              {el.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Convert;
