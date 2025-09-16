"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Svgs from "../Svgs";
import { IRate } from "@/types/country";
import { getRate } from "@/app/utils/getCountry";

// Liste des pays
const countries = [
  {
    id: "cg",
    name: "🇨🇬 République du Congo",
    flag: "/static/flags/cg.png",
    currency: "XAF",
  },
  {
    id: "cam",
    name: "🇨🇲 Caméroun",
    flag: "/static/flags/cam.png",
    currency: "XAF",
  },
  {
    id: "sen",
    name: "🇸🇳 Sénégal",
    flag: "/static/flags/sen.png",
    currency: "XOF",
  },
  {
    id: "civ",
    name: "🇨🇮 Côte d'ivoire",
    flag: "/static/flags/civ.png",
    currency: "XOF",
  },
  {
    id: "ru",
    name: "🇷🇺 Fédération de Russie",
    flag: "/static/flags/ru.png",
    currency: "RUB",
  },
  {
    id: "rca",
    name: "🇨🇫 République centrafricaine",
    flag: "/static/flags/rca.png",
    currency: "XAF",
  },
  {
    id: "gab",
    name: "🇬🇦 Gabon",
    flag: "/static/flags/gab.png",
    currency: "XAF",
  },
  {
    id: "tchad",
    name: "🇹🇩 Tchad",
    flag: "/static/flags/tchad.png",
    currency: "XAF",
  },
  {
    id: "mali",
    name: "🇲🇱 Mali",
    flag: "/static/flags/mali.png",
    currency: "XOF",
  },
  {
    id: "gib",
    name: "🇬🇼 Guinée bissau",
    flag: "/static/flags/gib.png",
    currency: "XOF",
  },
  {
    id: "buf",
    name: "🇧🇫 Burkina Fasso",
    flag: "/static/flags/buf.png",
    currency: "XOF",
  },
  { id: "nr", name: "🇳🇪 Niger", flag: "/static/flags/nr.png", currency: "XOF" },
];

// Utilitaire debounce pour éviter les appels API trop fréquents
function useDebouncedCallback<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) {
  const timeout = useRef<NodeJS.Timeout | null>(null);
  return useCallback(
    (...args: Parameters<T>) => {
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
}

const Convertisseur = () => {
  // Etats principaux
  const [amount, setAmount] = useState<string>("1");
  const [amount2, setAmount2] = useState<string>("1");
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [selectedCountry2, setSelectedCountry2] = useState(countries[1]);
  const [taux, setTaux] = useState<IRate | null>(null);
  const [loading, setLoading] = useState(false);

  // Pour éviter de fetch trop souvent, on mémorise les taux déjà récupérés
  const tauxCache = useRef<Record<string, IRate>>({});

  // Récupération du taux d'échange (optimisé avec cache)
  const fetchTaux = useCallback(async (fromId: string, toId: string) => {
    const key = `${fromId}-${toId}`;
    if (tauxCache.current[key]) {
      setTaux(tauxCache.current[key]);
      return tauxCache.current[key];
    }
    setLoading(true);
    try {
      const x = await getRate(key);
      tauxCache.current[key] = x;
      setTaux(x);
      setLoading(false);
      return x;
    } catch (error) {
      setTaux(null);
      setLoading(false);
      return null;
    }
  }, []);

  // Met à jour le montant reçu en fonction du montant envoyé et du taux
  const updateAmount2 = useCallback(
    (amountValue: string, tauxValue: string | number) => {
      const amountNum = parseFloat(amountValue);
      const tauxNum = parseFloat(String(tauxValue));
      if (!isNaN(amountNum) && !isNaN(tauxNum)) {
        setAmount2((amountNum * tauxNum).toString());
      } else {
        setAmount2("1");
      }
    },
    []
  );

  // Met à jour le montant envoyé en fonction du montant reçu et du taux (pour l'input inverse)
  const updateAmount1 = useCallback(
    (amount2Value: string, tauxValue: string | number) => {
      const amount2Num = parseFloat(amount2Value);
      const tauxNum = parseFloat(String(tauxValue));
      if (!isNaN(amount2Num) && !isNaN(tauxNum) && tauxNum !== 0) {
        setAmount((amount2Num / tauxNum).toString());
      } else {
        setAmount("1");
      }
    },
    []
  );

  // Lors d'un changement de pays ou au montage, on récupère le taux et on met à jour le montant reçu
  useEffect(() => {
    let isMounted = true;
    (async () => {
      const x = await fetchTaux(selectedCountry.id, selectedCountry2.id);
      if (isMounted && x) {
        updateAmount2(amount, x.taux);
      }
    })();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry, selectedCountry2, fetchTaux]);

  // Debounce la mise à jour du montant reçu lors de la saisie
  const debouncedUpdateAmount2 = useDebouncedCallback(
    (val: string, tauxVal: string | number) => {
      updateAmount2(val, tauxVal);
    },
    100
  );

  // Debounce la mise à jour du montant envoyé lors de la saisie inverse
  const debouncedUpdateAmount1 = useDebouncedCallback(
    (val: string, tauxVal: string | number) => {
      updateAmount1(val, tauxVal);
    },
    100
  );

  // Gestion de la saisie du montant à envoyer
  const handleAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(",", "."); // support virgule
    // Accepte les entiers et décimaux positifs
    const regex = /^(?:\d+|\d*\.\d*)$/;
    if (value === "" || regex.test(value)) {
      setAmount(value);
      if (taux) debouncedUpdateAmount2(value, taux.taux);
    }
  };

  // Gestion de la saisie du montant à recevoir (input inverse)
  const handleAmount2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(",", ".");
    const regex = /^(?:\d+|\d*\.\d*)$/;
    if (value === "" || regex.test(value)) {
      setAmount2(value);
      if (taux) debouncedUpdateAmount1(value, taux.taux);
    }
  };

  // Gestion du changement de pays d'envoi
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = countries.find((el) => el.id === e.target.value);
    if (country) setSelectedCountry(country);
  };

  // Gestion du changement de pays de réception
  const handleCountry2Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = countries.find((el) => el.id === e.target.value);
    if (country) setSelectedCountry2(country);
  };

  // Inversion des pays et des montants
  const handleExchange = () => {
    setSelectedCountry(selectedCountry2);
    setSelectedCountry2(selectedCountry);
    setAmount(amount2);
    setAmount2(amount);
  };

  // Pour éviter de recalculer inutilement
  const tauxAffichage = useMemo(() => {
    if (!taux) return "";
    return `1 ${selectedCountry.currency} = ${taux.taux} ${selectedCountry2.currency}`;
  }, [taux, selectedCountry, selectedCountry2]);

  return (
    <div className="transfertConvert__convert--wrapper">
      <div className="transfertConvert__convert--list">
        {/* Bloc montant à envoyer */}
        <div className="transfertConvert__convert--list__input">
          <div className="transfertConvert__convert--list__input--left">
            <label htmlFor="send">Montant à envoyer</label>
            <div className="block">
              <div>{selectedCountry.currency}</div>
              <input
                type="tel"
                placeholder="Vous envoyez"
                value={amount}
                onChange={handleAmount}
                autoComplete="off"
                inputMode="decimal"
              />
            </div>
          </div>
          <div className="transfertConvert__convert--list__input--right">
            <select value={selectedCountry.id} onChange={handleCountryChange}>
              {countries
                .filter((el) => el.id !== selectedCountry2.id)
                .map((el) => (
                  <option key={el.id} value={el.id}>
                    {el.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <button
          type="button"
          onClick={handleExchange}
          aria-label="Inverser les devises"
        >
          <Svgs name="exchange" />
        </button>
        {/* Bloc montant à recevoir */}
        <div className="transfertConvert__convert--list__input">
          <div className="transfertConvert__convert--list__input--left">
            <label htmlFor="receive">Montant à recevoir</label>
            <div className="block">
              <div>{selectedCountry2.currency}</div>
              <input
                type="tel"
                placeholder="Vous recevez"
                value={amount2}
                onChange={handleAmount2}
                autoComplete="off"
                inputMode="decimal"
              />
            </div>
          </div>
          <div className="transfertConvert__convert--list__input--right">
            <select value={selectedCountry2.id} onChange={handleCountry2Change}>
              {countries
                .filter((el) => el.id !== selectedCountry.id)
                .map((el) => (
                  <option key={el.id} value={el.id}>
                    {el.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
      <div className="transfertConvert__convert--content">
        <div>
          <span>{`Taux d'échange :`}</span>
          <p>{loading ? "Chargement..." : tauxAffichage}</p>
        </div>
      </div>
    </div>
  );
};

export default Convertisseur;
