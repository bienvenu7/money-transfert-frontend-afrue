import { getAuth } from "@/app/actions/auth";
import Tab from "@/app/components/historics/Tab";
import Titles from "@/app/components/Titles";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const clientData = await getAuth();

  return (
    <div className="history__container">
      <div className="history__box">
        <Titles line1="Votre historique" line2="Afru-Exchange " />
        <Tab clientData={clientData} />
      </div>
    </div>
  );
};

export default page;
