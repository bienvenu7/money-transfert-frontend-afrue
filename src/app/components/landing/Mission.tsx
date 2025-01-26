import React from "react";
import mission from "../../../data/mission.json";
import Image from "next/image";
import CardMIssion from "./CardMIssion";

interface IMission {
  title: string;
  description: string;
  icon: string;
}
type Props = {};

const Mission = (props: Props) => {
  return (
    <div className="main__mission">
      <div className="main__mission--heading">
        <p>POURQUOI NOUS?</p>
        <h2>Nos Avantages</h2>
      </div>
      <div className="main__mission--cards">
        {mission.map((el) => (
          <CardMIssion key={el.title} mission={el} />
        ))}
      </div>
    </div>
  );
};

export default Mission;
