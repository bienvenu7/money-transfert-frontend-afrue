import Image from "next/image";
import React from "react";

interface IMission {
  title: string;
  description: string;
  icon: string;
}

type Props = {
  mission: IMission;
};

const CardMIssion = ({ mission }: Props) => {
  return (
    <div className="main__mission--card">
      <div className="main__mission--card__icon">
        <Image src={`/static/pictures${mission.icon}`} alt="" fill />
      </div>
      <div className="main__mission--card__content">
        <h3>{mission.title}</h3>
        <p>{mission.description}</p>
      </div>
    </div>
  );
};

export default CardMIssion;
