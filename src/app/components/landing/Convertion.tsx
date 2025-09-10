import { getRate } from "@/app/actions/rate";
import { IRate } from "@/types/country";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TfiArrowRight } from "react-icons/tfi";

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

type Props = {};

const Convertion = (props: Props) => {
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

  const handleClick1 = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    el: {
      id: string;
      name: string;
      flag: string;
      currency: string;
    }
  ) => {
    e.preventDefault();
    setSelectedCountry(el);
    setIsOption(false);
    try {
      const x = await getRate(`${selectedCountry.id}-${selectedCountry2.id}`);
      const calc = parseFloat(amount) * parseFloat(x.taux);
      setAmount2(calc.toString());
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick2 = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    el: {
      id: string;
      name: string;
      flag: string;
      currency: string;
    }
  ) => {
    e.preventDefault();
    setSelectedCountry2(el);
    setIsOption2(false);
    try {
      const x = await getRate(`${selectedCountry.id}-${selectedCountry2.id}`);
      console.log(x);
      const calc = Math.round(parseFloat(amount) / parseFloat(x.taux));
      setAmount(calc.toString());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main__cover--content__convertion">
      <div className="main__cover--content__convertion--block">
        <div className="main__cover--content__convertion--block__picture">
          <div className="main__cover--content__convertion--block__select">
            <div className="placeholder">
              <Image
                src={selectedCountry?.flag as string}
                width={28}
                height={24}
                alt={selectedCountry?.name as string}
                style={{ cursor: "pointer" }}
                onClick={() => setIsOption(!isOption)}
              />
              <div className="currency">
                <span>{selectedCountry.currency}</span>
              </div>
              <input
                type="text"
                value={amount}
                onChange={handleAmount}
                placeholder="Ex: 10"
              />
            </div>
            <div className={!isOption ? "options" : "options close"}>
              {countries
                .filter((el) => el.id !== selectedCountry2.id)
                .map((el) => (
                  <div
                    className="option"
                    key={el.id}
                    onClick={() => {
                      setIsOption(false);
                      setSelectedCountry(el);
                    }}
                  >
                    <Image src={el.flag} width={28} height={24} alt={el.name} />{" "}
                    <span>{el.name}</span>
                  </div>
                ))}
            </div>
          </div>
          <div className="arrow">
            <TfiArrowRight />
          </div>
          <div className="main__cover--content__convertion--block__select">
            <div className="placeholder">
              <Image
                src={selectedCountry2?.flag as string}
                width={28}
                height={24}
                alt={selectedCountry2?.name as string}
                style={{ cursor: "pointer" }}
                onClick={() => setIsOption2(!isOption2)}
              />
              <div className="currency">
                <span>{selectedCountry2.currency}</span>
              </div>
              <input
                type="text"
                value={amount2}
                onChange={handleAmount2}
                placeholder="Ex: 10"
                readOnly
              />
            </div>
            <div className={!isOption2 ? "options" : "options close"}>
              {countries
                .filter((el) => el.id !== selectedCountry.id)
                .map((el) => (
                  <div
                    className="option"
                    key={el.id}
                    onClick={() => {
                      setSelectedCountry2(el);
                      setIsOption2(false);
                    }}
                  >
                    <Image src={el.flag} width={28} height={24} alt={el.name} />{" "}
                    <span>{el.name}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="main__cover--content__convertion--btns">
          <Link href="/send">Envoyer</Link>
          <Link href="/receive">Recevoir</Link>
        </div>
      </div>
    </div>
  );
};

export default Convertion;
