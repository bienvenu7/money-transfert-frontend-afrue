import Histories from "@/app/components/historics/Histories";
import Tab from "@/app/components/historics/Tab";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="history__container">
      <div className="history__box">
        <Tab />
        <Histories title="Aujourd'hui" />
        <Histories title="Hier" />
      </div>
    </div>
  );
};

export default page;
