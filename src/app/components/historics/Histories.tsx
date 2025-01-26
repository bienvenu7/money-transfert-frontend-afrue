import Image from "next/image";
import React from "react";
import { AiOutlineArrowDown } from "react-icons/ai";
import CardMobile from "./CardMobile";

type Props = {
  title: string;
};

const Histories = ({ title }: Props) => {
  return (
    <div className="history__histories">
      <h2>{title}</h2>
      <div className="history__histories--transactions">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((el) => (
          <CardMobile key={el} />
        ))}
      </div>
    </div>
  );
};

export default Histories;
