import React from "react";

type Props = {
  line1: string;
  line2: string;
};

const Titles = ({ line1, line2 }: Props) => {
  return (
    <div className="main__about--title">
      <h2>{line1}</h2>
      <span>
        <img src="/gradient.png" alt="" />
        {line2}
      </span>
    </div>
  );
};

export default Titles;
