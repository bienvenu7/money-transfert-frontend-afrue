"use client";
import React, { useState } from "react";

type Props = {
  name: string;
  phone: string;
  method: string;
  motant: string;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const Copied = ({ method, motant, name, phone, setStep }: Props) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopied = async () => {
    const textCopied = `Nom: ${name}\nNuméro: ${phone}\nMontant: ${motant}\nRéseau: ${method}`;
    try {
      await navigator.clipboard.writeText(textCopied);
      setCopied(true);
      setStep(2);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <button onClick={handleCopied}>{!copied ? "Copier" : "Déjà copié"}</button>
  );
};

export default Copied;
