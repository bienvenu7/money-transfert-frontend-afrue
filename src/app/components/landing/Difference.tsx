import React, { forwardRef } from "react";
import Svgs from "../Svgs";
import Image from "next/image";

type Props = {};

const cardDatas = [
  {
    title: "C'est incertain",
    svg: <Svgs name="s-slash" />,
  },
  {
    title: "Frais élevés",
    svg: <Svgs name="h-t-u" />,
  },
  {
    title: "C'est retardé",
    svg: <Svgs name="timer-p" />,
  },
  {
    title: "Manque de transparence sur le taux de change",
    svg: <Svgs name="percentage" />,
  },
  {
    title: "C'est stressant",
    svg: <Svgs name="e-sad" />,
  },
  {
    title: "Paiement en espèces non indisponible",
    svg: <Svgs name="w-empty-r" />,
  },
];

const cardDatas2 = [
  {
    title: "C'est sécurisé",
    svg: <Svgs name="s-tick" />,
  },
  {
    title: "Frais bas",
    svg: <Svgs name="h-t-d" />,
  },
  {
    title: "C'est rapide (5 minutes maximum)",
    svg: <Svgs name="timer-s" />,
  },
  {
    title: "Taux transparent et clair",
    svg: <Svgs name="percentage" />,
  },
  {
    title: "Pas de stress",
    svg: <Svgs name="e-norm" />,
  },
  {
    title: "Paiement en espèces disponible",
    svg: <Svgs name="w-empty-t" />,
  },
];

const Difference = forwardRef<HTMLDivElement, Props>((props, ref) => {
  return (
    <div className="main__difference">
      <div className="main__difference--wrapper">
        <div className="main__difference--card">
          <Image
            priority={true}
            loading="eager"
            quality={100}
            src="/cardG.png"
            fill
            alt=""
          />
          <div className="main__difference--card__heading">
            <div className="main__difference--card__heading--criteria">
              <span>Indéfiniment</span>
              <span>Stress</span>
              <span>Lent</span>
            </div>
            <h2>Sans nous</h2>
          </div>
          <div className="main__difference--card__content">
            {cardDatas.map((el, i) => {
              return (
                <div key={i} className="main__difference--card__content--line">
                  <button>{el.svg}</button>
                  <span>{el.title}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="main__difference--card">
          <Image
            priority={true}
            loading="eager"
            quality={100}
            src="/cardG.png"
            fill
            alt=""
          />
          <div className="main__difference--card__heading">
            <div className="main__difference--card__heading--criteria">
              <span>Sûr</span>
              <span>Transparent</span>
              <span>Rapide</span>
            </div>
            <h2>Avec nous</h2>
          </div>
          <div className="main__difference--card__content">
            {cardDatas2.map((el, i) => {
              return (
                <div key={i} className="main__difference--card__content--line">
                  <button>{el.svg}</button>
                  <span>{el.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});

Difference.displayName = "Difference";

export default Difference;
