import React from "react";

type Props = {};

const Show = (props: Props) => {
  return (
    <div className="main__show">
      <h2>Transferts terminés avec succès</h2>
      <div className="main__show--box">
        <img src="/show.png" alt="" />
        <img className="phone" src="/bg-t.png" alt="" />
      </div>
    </div>
  );
};

export default Show;
