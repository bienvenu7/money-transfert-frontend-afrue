"use client";
import React, { useState } from "react";
import { AiOutlineArrowDown, AiOutlineCalendar } from "react-icons/ai";
import moment from "moment";

const Months = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

type Props = {};

const Tab = (props: Props) => {
  const [month, setMonth] = useState(moment().month());
  return (
    <div className="tab__container">
      <h1>Votre activité</h1>
      <h2>Date</h2>
      <div className="tab__date">
        <input
          onChange={(e) => setMonth(moment(e.target.value).month())}
          id="date"
          type={"date"}
        />
        <label htmlFor="date">
          <AiOutlineCalendar />
        </label>
        <span>{Months[month]}</span>
      </div>
      <div className="tab__tab">
        <div className="tab__numbers">
          <div className="tab__header">
            <h3>Vos entrées</h3>
            <AiOutlineArrowDown />
          </div>
          <span>XFA 25000</span>
        </div>
        <div className="tab__numbers second">
          <div className="tab__header second">
            <h3>Vos sorties</h3>
            <AiOutlineArrowDown />
          </div>
          <span>XFA 25000</span>
        </div>
      </div>
    </div>
  );
};

export default Tab;
