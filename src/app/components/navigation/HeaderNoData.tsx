import React from "react";

type Props = {};

const HeaderNoData = (props: Props) => {
  return (
    <>
      <div className="avatar">
        <div className="bg-grey" />
      </div>
      <span className="no-data">{`Vous n'êtes pas connecté`}</span>
    </>
  );
};

export default HeaderNoData;
