import Image from "next/image";
import React from "react";
import { AiOutlineArrowDown } from "react-icons/ai";

type Props = {};

const CardMobile = (props: Props) => {
  return (
    <div className="history__histories--transactions__card">
      <div className="history__histories--transactions__card--picture">
        <Image
          src={"https://avatar.iran.liara.run/public/girl?username=albertine"}
          fill
          alt=""
        />
      </div>
      <div className="history__histories--transactions__card--content">
        <div className="history__histories--transactions__card--content__up">
          <h3>Albertine A.E</h3>
          <AiOutlineArrowDown />
        </div>
        <div className="history__histories--transactions__card--content__down">
          <p>12:45 AM</p>
          <span>XFA 59500</span>
        </div>
      </div>
    </div>
  );
};

export default CardMobile;
