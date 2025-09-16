import React, { useState } from "react";
import Convertisseur from "./Convertisseur";
import Image from "next/image";
import Link from "next/link";

type Props = {};

const QuizTwo = () => {
  return (
    <div className="transfertConvert__slides--first">
      <Image src="/grad.png" alt="" fill />
      <div className="transfertConvert__convert">
        <Convertisseur />
      </div>
      <div className="btns">
        <Link href={"/send"}>Envoyer</Link>
        <Link href={"/receive"}>Recevoir</Link>
      </div>
    </div>
  );
};

export default QuizTwo;
