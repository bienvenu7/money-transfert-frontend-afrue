"use client";
import { createTransaction } from "@/app/actions/transaction";
import Svgs from "@/app/components/Svgs";
import { getCountries, getRate } from "@/app/utils/getCountry";
import { getNetworkByAmount, getNetworksById } from "@/app/utils/network";
import { errorMessage } from "@/app/utils/notification";
import { ICountry, IRate } from "@/types/country";
import { IFee, INetworkResponse } from "@/types/networks";
import { ITrasanctionData } from "@/types/transaction";
import { IClientResponse } from "@/types/user";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const countries = [
  {
    id: "cg",
    name: "République du Congo",
    flag: "/static/flags/cg.png",
    currency: "XAF",
  },
  {
    id: "cam",
    name: "Caméroun",
    flag: "/static/flags/cam.png",
    currency: "XAF",
  },
  {
    id: "sen",
    name: "Sénégal",
    flag: "/static/flags/sen.png",
    currency: "XOF",
  },
  {
    id: "civ",
    name: "Côte d'ivoire",
    flag: "/static/flags/civ.png",
    currency: "XOF",
  },
  {
    id: "ru",
    name: "Fédération de Russie",
    flag: "/static/flags/ru.png",
    currency: "RUB",
  },
  {
    id: "rca",
    name: "République centrafricaine",
    flag: "/static/flags/rca.png",
    currency: "XAF",
  },
  {
    id: "gab",
    name: "Gabon",
    flag: "/static/flags/gab.png",
    currency: "XAF",
  },
  {
    id: "tchad",
    name: "Tchad",
    flag: "/static/flags/tchad.png",
    currency: "XAF",
  },
  {
    id: "mali",
    name: "Mali",
    flag: "/static/flags/mali.png",
    currency: "XOF",
  },
  {
    id: "gib",
    name: "Guinée bissau",
    flag: "/static/flags/gib.png",
    currency: "XOF",
  },
  {
    id: "buf",
    name: "Burkina Fasso",
    flag: "/static/flags/buf.png",
    currency: "XOF",
  },
  {
    id: "nr",
    name: "Niger",
    flag: "/static/flags/nr.png",
    currency: "XOF",
  },
];

const flagNetwork = [
  {
    id: "mtn",
    flag: "/mtn.png",
  },
  {
    id: "airtel",
    flag: "/airtel.png",
  },
  {
    id: "orange",
    flag: "/partners/orange1.png",
  },
  {
    id: "wave",
    flag: "/partners/wave.png",
  },
  {
    id: "sberBank",
    flag: "/partners/sber.png",
  },
  {
    id: "vtb Bank",
    flag: "/partners/vtb.png",
  },
  {
    id: "alfa Bank",
    flag: "/partners/alfa.png",
  },
  {
    id: "mtc",
    flag: "/partners/mtc.png",
  },
];

type Props = {};

const Page = (props: Props) => {
  const [userData] = useState<IClientResponse | null>(() => {
    // Safely parse cookie with try-catch
    try {
      const cookieData = Cookies.get("app_client");
      return cookieData ? JSON.parse(cookieData) : null;
    } catch (error) {
      console.error("Error parsing user cookie", error);
      return null;
    }
  });

  const [countryList] = useState<ICountry[] | null>(() => {
    try {
      const listData = Cookies.get("list");
      return listData ? JSON.parse(listData) : null;
    } catch (error) {
      console.log(error);
    }
  });

  // Compare country IDs instead of ID vs name
  const [selectedCountry, setSelectedCountry] = useState<{
    id: string;
    name: string;
    flag: string;
    currency: string;
  } | null>(() => {
    if (!userData?.Country?.id) return null;
    // Find first country that doesn't match user's country ID
    return (
      countries.find((country) => country.id !== userData.Country.name) ?? null
    );
  });

  const [isOption, setIsOption] = useState<boolean>(false);
  const [rate, setRate] = useState<IRate | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState(0);
  const [amountToReceive, setAmountToReceive] = useState(0);
  const [networks, setNetworks] = useState<INetworkResponse[] | null>(null);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [fee, setFee] = useState<string>("");
  const [withFees, setWithFees] = useState<boolean>(false);
  const [netId, setNetId] = useState<INetworkResponse | null>(null);
  const [pending, setPending] = useState<boolean>(false);
  const [coutryData, setCountryData] = useState<ICountry | null>(null);

  const router = useRouter();

  // Fetch rates when selectedCountry changes
  useEffect(() => {
    let isMounted = true;

    setLoading(true);

    const fetchRates = async () => {
      if (!userData || !selectedCountry) return;

      let codeTo =
        selectedCountry?.currency === "XAF" && selectedCountry.id !== "cg"
          ? "cam"
          : selectedCountry?.currency === "XOF"
          ? "sen"
          : selectedCountry?.id;

      setCountryData(
        countryList?.find(
          (el) => (el.name as string) === userData.Country.name
        ) as ICountry
      );

      try {
        const code = `${userData.Country.name}-${codeTo}`;
        const rateData = await getRate(code);
        if (isMounted) setRate(rateData);
      } catch (err) {
        console.error("Fetch rates error", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    const fecthNetwork = async () => {
      if (!userData) return;

      let codeTo =
        selectedCountry?.currency === "XAF" && selectedCountry.id !== "cg"
          ? "cam"
          : selectedCountry?.currency === "XOF"
          ? "sen"
          : selectedCountry?.id;

      try {
        const cts = (await getCountries()) as ICountry[];
        const myCt = cts.find((el) => el.name === codeTo) as ICountry;
        await getNetworksById(userData.Country.id as string).then((el) => {
          setNetworks(el as INetworkResponse[]);
        });
      } catch (error) {
        console.log("Fetch network error", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchRates();
    fecthNetwork();

    return () => {
      isMounted = false;
    };
  }, [selectedCountry, userData, countryList]); // Added dependencies

  const handleNetwork = async (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>,
    net: INetworkResponse
  ) => {
    event.preventDefault();
    setNetId(net);

    await getNetworkByAmount(net.id, amount.toString())
      .then((el) => {
        const fee = el as IFee;
        if (fee.id !== undefined) {
          setFee((amount * parseInt(rate?.taux as string)).toString());
        } else {
          console.log(el);
        }
      })
      .catch((e) => console.error(e));
  };

  const createTransactions = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    let codeTo =
      selectedCountry?.currency === "XAF" && selectedCountry.id !== "cg"
        ? "cam"
        : selectedCountry?.currency === "XOF"
        ? "sen"
        : selectedCountry?.id;

    if (parseInt(coutryData?.TelMaxNumber as string) !== phone.length) {
      return errorMessage(`Veillez entrer un numéro valide!`);
    }

    setPending(true);

    const transaction: ITrasanctionData = {
      amountToSend: amount.toString(),
      amountToPayOut: amountToReceive.toString(),
      clientEmail: userData?.email as string,
      fees: fee,
      networkId: netId?.id as string,
      type: "receive",
      receiverPhone: phone as string,
      receiverName: name,
      code: `${codeTo}-${userData?.Country.name}`,
      status: "WAITING" as any,
      origin: selectedCountry?.id as string,
    };

    await createTransaction(transaction)
      .then((t) => {
        router.push(`/comfirmation/${t.id}`);
        setAmount(0), setAmountToReceive(0), setFee("");
        setNetId(null);
        setPhone("");
        setName("");
      })
      .catch((el) => {
        errorMessage(
          "Ops! vérifiez que toutes les informations ont été remplies avec succes."
        );
      })
      .finally(() => setPending(false));
  };

  // Removed console.logs for production

  let frais = (amount * parseInt(rate?.frais as string)) / 100;
  let total = frais + amount * (1 + parseInt(rate?.taux as string));

  return (
    <div className="transfert__container">
      <div className="transfert__wrapper">
        <div className="transfert__content">
          <div className="transfert__content__selectBlock">
            <div className="transfert__content__selectBlock--title">
              <h1>Bienvenue chez AfruE</h1>
              <p>Remplissons les informations</p>
            </div>
            <div
              className="transfert__content__selectBlock--select"
              onClick={() => setIsOption(!isOption)}
            >
              <div className="placeholder">
                <Image
                  src={selectedCountry?.flag as string}
                  width={32}
                  height={32}
                  alt={selectedCountry?.name as string}
                />
                <div className="text">
                  <small>Sélectionez le pays du bénéficiaire</small>
                  <span>{selectedCountry?.name}</span>
                </div>
              </div>
              <div className={isOption ? "options" : "options close"}>
                {countries
                  .filter((el) => el.id !== (userData?.Country.name as string))
                  .map((el) => (
                    <div
                      className="option"
                      key={el.id}
                      onClick={() => {
                        setSelectedCountry(el);
                        setIsOption(false);
                      }}
                    >
                      <Image
                        src={el.flag}
                        width={32}
                        height={32}
                        alt={el.name}
                      />{" "}
                      <span>{el.name}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {loading ? (
            "Loading..."
          ) : (
            <>
              <div className="transfert__content__convert">
                <div className="transfert__content__convert--wrapper">
                  <div className="transfert__content__convert--input">
                    <label htmlFor="amount">Montant envoyé</label>
                    <div>
                      <input
                        id="amount"
                        type="text"
                        value={amount}
                        onChange={(el) => {
                          if (el.target.value === "") {
                            setAmount(0);
                          } else {
                            setAmount(parseInt(el.target.value));
                            setAmountToReceive(
                              parseInt(el.target.value) *
                                parseInt(rate?.taux as string)
                            );
                          }
                        }}
                        placeholder=""
                      />
                      <span>{selectedCountry?.currency}</span>
                    </div>
                  </div>
                  <button>
                    <Svgs name="exchange" />
                  </button>
                  <div className="transfert__content__convert--input">
                    <label htmlFor="amount">Montant envoyé</label>
                    <div>
                      <input
                        readOnly
                        id="amount"
                        type="text"
                        value={amountToReceive}
                        placeholder=""
                      />
                      <span>{userData?.Country.currency}</span>
                    </div>
                  </div>
                </div>
                <div className="transfert__content__convert--text">
                  <strong>
                    1 {selectedCountry?.currency as string} ={" "}
                    {rate?.taux as string} {userData?.Country.currency}
                  </strong>
                  <p>
                    {`Le taux de change varie en fonction du mode d'envoi et de
              paiement.`}
                  </p>
                  {rate?.iltineraire === "Congo-Russie" && (
                    <div className="frais">
                      <input
                        type="checkbox"
                        name=""
                        id="frais"
                        onChange={(e) => setWithFees(e.target.checked)}
                      />
                      <label htmlFor="frais">Inclure les frais</label>
                    </div>
                  )}
                </div>
              </div>
              <div className="transfert__content__convert">
                <h2>Informations du bénéficiaire</h2>
                <div className="transfert__content__wrap">
                  <div className="transfert__content__inputs">
                    <div>
                      <label htmlFor="name">
                        Nom et prénom du bénéficiaire
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Mavoungou Mabiala"
                        value={name}
                        onChange={(e) => {
                          const regex = /^[A-Za-z\s]+$/;
                          if (regex.test(e.target.value)) {
                            setName(e.target.value);
                          }
                        }}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone">Le numéro du destinataire</label>
                      <input
                        id="phone"
                        type={"tel"}
                        placeholder="000 000 00 00"
                        value={phone}
                        minLength={parseInt(coutryData?.TelMaxNumber as string)}
                        maxLength={parseInt(coutryData?.TelMaxNumber as string)}
                        onChange={(e) => {
                          let regex = /^\d+$/;
                          if (
                            e.target.value === "" ||
                            regex.test(e.target.value)
                          ) {
                            return setPhone(e.target.value);
                          }
                        }}
                      />
                    </div>
                  </div>
                  <p>
                    Veillez noter que ces informations peuvent être demandé pour
                    des raisons de vérification en cas de problemes avec la
                    transaction.
                  </p>
                </div>
              </div>
              <div className="transfert__content__convert">
                <h2>
                  Comment le bénéficiaire souhaite-t-il recevoir l’argent?
                </h2>
                <div className="transfert__content__networks">
                  {networks?.map((el, index) => {
                    return (
                      <Image
                        key={el.id}
                        className={
                          (netId?.id as string) === el.id ? "active" : ""
                        }
                        src={
                          flagNetwork.find((e) => e.id === el.name)
                            ?.flag as string
                        }
                        alt=""
                        width={120}
                        height={120}
                        onClick={(e) => handleNetwork(e, el)}
                      />
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="transfert__details">
          <h2>Synthèse</h2>
          <hr />
          <div className="transfert__details--row">
            <h3>Montant du transfert</h3>
            <span>
              {amount} {selectedCountry?.currency}
            </span>
          </div>
          <div className="transfert__details--row">
            <h3>Frais de transfert</h3>
            <span>
              {(amount * parseInt(rate?.frais as string)) / 100}{" "}
              {selectedCountry?.currency}
            </span>
          </div>
          <div className="transfert__details--row">
            <h3>Total du transfert</h3>
            <span>
              {amount + frais}
              {selectedCountry?.currency}
            </span>
          </div>
          <div className="transfert__details--row">
            <h3>Total Le bénéficiaire reçoit</h3>
            <span>
              {amount * parseInt(rate?.taux as string)}{" "}
              {userData?.Country.currency}
            </span>
          </div>
          <hr />
          <h2>Destinataire</h2>
          <hr />
          <div className="transfert__details--row">
            <h3>Nom et prénoms</h3>
            <span>{name}</span>
          </div>
          <div className="transfert__details--row">
            <h3>Numéro</h3>
            <span>
              {coutryData?.TelIndex} {phone}
            </span>
          </div>
          <div className="transfert__details--row">
            <h3>Réseau</h3>
            <span>{netId?.pubicName}</span>
          </div>
          <hr />
          <button
            className={pending ? "load" : ""}
            onClick={createTransactions}
          >
            {pending ? "Veillez patientez" : "Continuer"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
