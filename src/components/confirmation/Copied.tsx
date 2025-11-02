import { infoMessage } from '@/utils/notification';
import React, { useState } from 'react';
import { useClipboard } from 'use-clipboard-copy';

type Props = {
  name: string;
  phone: string;
  method: string;
  motant: string;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const Copied = ({ method, motant, name, phone, setStep }: Props) => {
  const [copied, setCopied] = useState<boolean>(false);

  const clipboard = useClipboard({
    copiedTimeout: 1000, // Délai en ms pour le message "copié"
  });

  const handleCopied = async () => {
    const textCopied = `Nom: ${name}\nNuméro: ${phone}\nMontant: ${motant}\nRéseau: ${method}`;

    try {
      console.log(textCopied);

      // await navigator.clipboard.writeText(textCopied);
      clipboard.copy(textCopied);
      setCopied(true);
      infoMessage('Les informations ont été copié avec succèss');
      setTimeout(() => setCopied(false), 2000);
      setStep(2);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  return (
    <button onClick={handleCopied}>{!copied ? 'Copier' : 'Déjà copié'}</button>
  );
};

export default Copied;
