import React from "react";
import Titles from "../Titles";

type Props = {};

function About({}: Props) {
  return (
    <div className="main__about" id="about">
      <div className="main__about--wrapper">
        <Titles line1="À propos de nous" line2="Afru-Exchange" />
        <div className="main__about--globe">
          <img className="bg" src="/gradientglobe.png" alt="" />
          <img className="globe" src="/globe.png" alt="" />
          <div className="main__about--globe__content">
            <p>
              {`Nous sommes une micro-finance qui a pour activité principale le
              transfert d'argent entre la Russie et les pays d'Afrique, entre
              les pays de la CEMAC et l'UEMOA. Notre mission est de faciliter
              les échanges financiers entre les africains des diasporas et leurs
              familles à un taux transparent, avantageux, une commission assez
              basse tout en limitant les intermédiaires, à tous ces avantages
              s'ajoute la réalisation de la transaction en 5 minutes maximum.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
