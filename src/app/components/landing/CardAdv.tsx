import React, { useEffect, useState } from "react";
import GetWidownDimensoins from "../GetWidownDimensoins";
import Image from "next/image";

interface IEl {
  id: string;
  title: string;
  description: string;
  uri: string;
}

type Props = {
  el: IEl;
  index: number;
  isActive: string;
  setIsActive: React.Dispatch<React.SetStateAction<string>>;
};

const CardAdv = ({ el, index, isActive, setIsActive }: Props) => {
  const [show, setShow] = useState(false);

  const { height, width } = GetWidownDimensoins();

  useEffect(() => {
    if (isActive === el.id && width > 520) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [isActive, el.id, width]);
  return (
    <div
      onClick={() => setIsActive(el.id)}
      className={`main__advantage--card ${show ? "active" : ""} `}
    >
      <h3>{el.title}</h3>
      <p>{el.description}</p>
      <Image
        priority={true}
        loading="eager"
        quality={100}
        src={el.uri}
        alt=""
        width={70}
        height={70}
      />
      <span>{el.id}</span>
    </div>
  );
};

export default CardAdv;
