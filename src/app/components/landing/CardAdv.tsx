import React, { useState } from "react";

interface IEl {
  id: string;
  title: string;
  description: string;
  uri: string;
}

type Props = {
  el: IEl;
  index: number;
};

const CardAdv = ({ el, index }: Props) => {
  const [ishover, setIsHover] = useState(false);

  function MouseOver(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setIsHover(true);
  }
  function MouseOut(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setIsHover(false);
  }
  return (
    <div
      className={`main__advantage--card ${
        index === 0
          ? "active"
          : index === 0 && ishover
          ? "active"
          : index !== 0 && ishover
          ? "active"
          : ""
      } `}
      onMouseOver={MouseOver}
      onMouseOut={MouseOut}
    >
      <h3>{el.title}</h3>
      <p>{el.description}</p>
      <img src={el.uri} alt="" />
      <span>{el.id}</span>
    </div>
  );
};

export default CardAdv;
