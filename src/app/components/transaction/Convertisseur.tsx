"use client";
import React, { useEffect, useState } from "react";
import Svgs from "../Svgs";
import { IRate } from "@/types/country";
import { getRate } from "@/app/actions/rate";

const countries = [
  {
    id: "cg",
    name: "🇨🇬 République du Congo",
    flag: "/static/flags/cg.png",
    currency: "XAF",
  },
  {
    id: "cam",
    name: "🇨🇲 Caméroun",
    flag: "/static/flags/cam.png",
    currency: "XAF",
  },
  {
    id: "sen",
    name: "🇸🇳 Sénégal",
    flag: "/static/flags/sen.png",
    currency: "XOF",
  },
  {
    id: "civ",
    name: "🇨🇮 Côte d'ivoire",
    flag: "/static/flags/civ.png",
    currency: "XOF",
  },
  {
    id: "ru",
    name: "🇷🇺 Fédération de Russie",
    flag: "/static/flags/ru.png",
    currency: "RUB",
  },
  {
    id: "rca",
    name: "🇨🇫 République centrafricaine",
    flag: "/static/flags/rca.png",
    currency: "XAF",
  },
  {
    id: "gab",
    name: "🇬🇦 Gabon",
    flag: "/static/flags/gab.png",
    currency: "XAF",
  },
  {
    id: "tchad",
    name: "🇹🇩 Tchad",
    flag: "/static/flags/tchad.png",
    currency: "XAF",
  },
  {
    id: "mali",
    name: "🇲🇱 Mali",
    flag: "/static/flags/mali.png",
    currency: "XOF",
  },
  {
    id: "gib",
    name: "🇬🇼 Guinée bissau",
    flag: "/static/flags/gib.png",
    currency: "XOF",
  },
  {
    id: "buf",
    name: "🇧🇫 Burkina Fasso",
    flag: "/static/flags/buf.png",
    currency: "XOF",
  },
  {
    id: "nr",
    name: "🇳🇪 Niger",
    flag: "/static/flags/nr.png",
    currency: "XOF",
  },
];

const Convertisseur = () => {
  const [isOption, setIsOption] = useState<boolean>(false);
  const [isOption2, setIsOption2] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("1");
  const [amount2, setAmount2] = useState<string>("1");
  const [selectedCountry, setSelectedCountry] = useState<{
    id: string;
    name: string;
    flag: string;
    currency: string;
  }>(countries[0]);
  const [selectedCountry2, setSelectedCountry2] = useState<{
    id: string;
    name: string;
    flag: string;
    currency: string;
  }>(countries[1]);
  const [taux, setTaux] = useState<IRate | null>(null);

  const handleAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Regex to check if value is a positive integer (no leading zeros unless '0')
    if (value === "") {
      setAmount("");
    }
    const positiveIntegerRegex = /^(0|[1-9]\d*)$/;
    if (positiveIntegerRegex.test(value)) {
      setAmount(value);
    }
  };

  const handleAmount2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Regex to check if value is a positive integer (no leading zeros unless '0')
    if (value === "") {
      setAmount2("");
    }
    const positiveIntegerRegex = /^(0|[1-9]\d*)$/;
    if (positiveIntegerRegex.test(value)) {
      setAmount2(value);
    }
  };

  useEffect(() => {
    // This effect runs whenever selectedCountry, selectedCountry2, or amount changes
    (async () => {
      try {
        const x = await getRate(`${selectedCountry.id}-${selectedCountry2.id}`);
        setTaux(x);
        // Only calculate if amount is a valid number
        const amountNum = parseFloat(amount);
        const tauxNum = parseFloat(x.taux);
        if (!isNaN(amountNum) && !isNaN(tauxNum)) {
          const calc = amountNum * tauxNum;
          setAmount2(calc.toString());
        } else {
          setAmount2("1");
        }
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry, selectedCountry2, amount]);

  return (
    <div className="transfertConvert__convert--wrapper">
      <div className="transfertConvert__convert--list">
        {/* //first block */}
        <div className="transfertConvert__convert--list__input">
          <div className="transfertConvert__convert--list__input--left">
            <label htmlFor="send">Montant à envoyer</label>
            <div className="block">
              <div>{selectedCountry.currency}</div>
              <input
                type={"tel"}
                placeholder="Vous envoyer"
                value={amount}
                onChange={handleAmount}
              />
            </div>
          </div>
          <div className="transfertConvert__convert--list__input--right">
            <select
              onChange={(e) => {
                setIsOption(false);
                setSelectedCountry(
                  countries.filter((el) => el.id === e.target.value)[0]
                );
              }}
            >
              {countries
                .filter((el) => el.id !== selectedCountry2.id)
                .map((el) => (
                  <option key={el.id} value={el.id}>
                    {el.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <button>
          <Svgs name="exchange" />
        </button>
        {/* second block */}
        <div className="transfertConvert__convert--list__input">
          <div className="transfertConvert__convert--list__input--left">
            <label htmlFor="send">Montant à recevoir</label>
            <div className="block">
              <div>{selectedCountry2.currency}</div>
              <input
                type={"tel"}
                placeholder="vous recevez"
                value={amount2}
                onChange={handleAmount2}
              />
            </div>
          </div>
          <div className="transfertConvert__convert--list__input--right">
            <select
              onChange={(e) => {
                setSelectedCountry2(
                  countries.filter((el) => el.id === e.target.value)[0]
                );
                setIsOption2(false);
              }}
            >
              {countries
                .filter((el) => el.id !== selectedCountry.id)
                .map((el) => (
                  <option key={el.id} value={el.id}>
                    {el.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
      <div className="transfertConvert__convert--content">
        {/* <div>
          {<span>Inclure les frais: </span>}
          <label htmlFor="check"></label>
          <input type={`checkbox`} id="check" />
        </div> */}
        <div>
          <span>{`Taux d'échange :`}</span>
          <p>
            1 {selectedCountry.currency} = {taux?.taux}{" "}
            {selectedCountry2.currency}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Convertisseur;
