import React, { forwardRef } from "react";
import Titles from "../Titles";

const dataPartners = [
  {
    name: "tinkoff bank",
    uri: "/partners/tbank.png",
  },
  {
    name: "sber bank",
    uri: "/partners/sber.png",
  },
  {
    name: "alfa bank",
    uri: "/partners/alfa.png",
  },
  {
    name: "quick send russia",
    uri: "/partners/bistri.png",
  },
  {
    name: "domru bank",
    uri: "/partners/domru.png",
  },
  {
    name: "gazprom bank",
    uri: "/partners/gazprom.png",
  },
  {
    name: "mtc bank",
    uri: "/partners/mtc.png",
  },
  {
    name: "wave money",
    uri: "/partners/wave.png",
  },
  {
    name: "orange money",
    uri: "/partners/orange.png",
  },
  {
    name: "airtel money",
    uri: "/partners/airtel.png",
  },
  {
    name: "mtn money",
    uri: "/partners/mtn.png",
  },
];

type Props = {};

const Partners = forwardRef<HTMLDivElement, Props>((props, ref) => {
  return (
    <div className="main__partners">
      <div className="main__partners--wrapper">
        <Titles
          line1="Partenaires et modes de paiement"
          line2="Afru-Exchange "
        />
      </div>
      <div className="main__partners--pics">
        {dataPartners.map((el, index) => {
          return (
            <img
              className={
                index === 7
                  ? "wave"
                  : index === 8
                  ? "orange"
                  : index === 9
                  ? "airtel"
                  : index === 10
                  ? "mtn"
                  : ""
              }
              src={el.uri}
              alt={el.name}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
});

Partners.displayName = "Partners";

export default Partners;
