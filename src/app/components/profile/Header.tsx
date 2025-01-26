import Image from "next/image";
import React from "react";

type Props = {
  fullName: string;
};

const Header = ({ fullName }: Props) => {
  const voyelles = ["e", "a"];
  const name = fullName.split(" ")[0];
  return (
    <div className="profile__header">
      <div className="profile__header--picture">
        <Image
          src={`https://avatar.iran.liara.run/public/${
            voyelles.includes(name[name.length - 1]) ? "girl" : "boy"
          }?username=${fullName.split(" ")[0]}`}
          fill
          alt={fullName}
        />
      </div>
      <h1>{fullName}</h1>
    </div>
  );
};

export default Header;
