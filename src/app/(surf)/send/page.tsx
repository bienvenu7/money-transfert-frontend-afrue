"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";
import moment from "moment";
import { createTransaction } from "@/app/actions/transaction";
import Svgs from "@/app/components/Svgs";
import { LoadingSkeleton } from "@/app/components/Loading";
import { getCountries, getRate } from "@/app/utils/getCountry";
import { getNetworkByAmount, getNetworksById } from "@/app/utils/network";
import { errorMessage, infoMessage } from "@/app/utils/notification";
import { ICountry, IRate } from "@/types/country";
import { IFee, INetworkResponse } from "@/types/networks";
import { ITrasanctionData } from "@/types/transaction";
import { IClientResponse } from "@/types/user";

// --- Constants ---
const COUNTRIES = [
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
  { id: "gab", name: "Gabon", flag: "/static/flags/gab.png", currency: "XAF" },
  {
    id: "tchad",
    name: "Tchad",
    flag: "/static/flags/tchad.png",
    currency: "XAF",
  },
  { id: "mali", name: "Mali", flag: "/static/flags/mali.png", currency: "XOF" },
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
  { id: "nr", name: "Niger", flag: "/static/flags/nr.png", currency: "XOF" },
];

const FLAG_NETWORKS = [
  { id: "mtn", flag: "/mtn.png" },
  { id: "airtel", flag: "/airtel.png" },
  { id: "orange", flag: "/partners/orange1.png" },
  { id: "wave", flag: "/partners/wave.png" },
  { id: "sberBank", flag: "/partners/sber.png" },
  { id: "vtb Bank", flag: "/partners/vtb.png" },
  { id: "alfa Bank", flag: "/partners/alfa.png" },
  { id: "mtc", flag: "/partners/mtc.png" },
];

// --- Helper Functions ---
const getCountryToCode = (country: { id: string; currency: string }) => {
  if (country.currency === "XAF" && country.id !== "cg") return "cam";
  if (country.currency === "XOF") return "sen";
  return country.id;
};

const getCountryById = (countries: ICountry[] | null, id: string | undefined) =>
  countries?.find((el) => el.name === id);

const getFlagByNetworkName = (name: string) =>
  FLAG_NETWORKS.find((e) => e.id === name)?.flag || "";

// --- Components ---
function CountrySelect({
  countries,
  userCountryId,
  selectedCountry,
  setSelectedCountry,
  setNetId,
  isOption,
  setIsOption,
}: {
  countries: typeof COUNTRIES;
  userCountryId: string;
  selectedCountry: (typeof COUNTRIES)[0] | null;
  setSelectedCountry: (c: (typeof COUNTRIES)[0]) => void;
  setNetId: (n: INetworkResponse | null) => void;
  isOption: boolean;
  setIsOption: (b: boolean) => void;
}) {
  return (
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
            src={selectedCountry?.flag || ""}
            width={32}
            height={32}
            alt={selectedCountry?.name || ""}
          />
          <div className="text">
            <small>Sélectionez le pays du bénéficiaire</small>
            <span>{selectedCountry?.name}</span>
          </div>
        </div>
        <div className={isOption ? "options" : "options close"}>
          {countries
            .filter((el) => el.id !== userCountryId)
            .map((el) => (
              <div
                className="option"
                key={el.id}
                onClick={() => {
                  setSelectedCountry(el);
                  setNetId(null);
                  setIsOption(false);
                }}
              >
                <Image src={el.flag} width={32} height={32} alt={el.name} />
                <span>{el.name}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function AmountConverter({
  amount,
  setAmount,
  amountToReceive,
  setAmountToReceive,
  rate,
  userCurrency,
  selectedCurrency,
  errAmount,
  setErrAmount,
  withFees,
  setWithFees,
}: {
  amount: number;
  setAmount: (n: number) => void;
  amountToReceive: number;
  setAmountToReceive: (n: number) => void;
  rate: IRate | null;
  userCurrency: string;
  selectedCurrency: string;
  errAmount: boolean;
  setErrAmount: (b: boolean) => void;
  withFees: boolean;
  setWithFees: (b: boolean) => void;
}) {
  const handleAmountChange = (val: string) => {
    if (val === "") {
      setAmount(0);
      setAmountToReceive(0);
      setErrAmount(false);
      return;
    }
    const num = parseInt(val);
    if (
      num < parseInt(rate?.intervalMin || "0") ||
      num > parseInt(rate?.intervalMax || "0")
    ) {
      setErrAmount(true);
    } else {
      setErrAmount(false);
    }
    setAmount(num);
    setAmountToReceive(num * parseFloat(rate?.taux || "1"));
  };

  const handleAmountToReceiveChange = (val: string) => {
    if (val === "") {
      setAmount(0);
      setAmountToReceive(0);
      setErrAmount(false);
      return;
    }
    const num = parseInt(val);
    if (
      num < parseInt(rate?.intervalMin || "0") ||
      num > parseInt(rate?.intervalMax || "0")
    ) {
      setErrAmount(true);
    } else {
      setErrAmount(false);
    }
    setAmount(Math.round(num / parseFloat(rate?.taux || "1")));
    setAmountToReceive(num);
  };

  return (
    <div className="transfert__content__convert">
      <div className="transfert__content__convert--wrapper">
        <div
          className={
            errAmount
              ? "transfert__content__convert--input err"
              : "transfert__content__convert--input"
          }
        >
          <label htmlFor="amount">Montant à envoyer</label>
          <div>
            <input
              id="amount"
              type="text"
              value={amount}
              className={errAmount ? "err" : ""}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder=""
            />
            <span>{userCurrency}</span>
          </div>
        </div>
        <button>
          <Svgs name="exchange" />
        </button>
        <div className="transfert__content__convert--input">
          <label htmlFor="amount">Montant à recevoir</label>
          <div>
            <input
              id="amount"
              type="text"
              value={amountToReceive}
              placeholder=""
              onChange={(e) => handleAmountToReceiveChange(e.target.value)}
            />
            <span>{selectedCurrency}</span>
          </div>
        </div>
      </div>
      <div className="transfert__content__convert--text">
        <strong>
          1 {userCurrency} = {rate?.taux || ""} {selectedCurrency}
        </strong>
        <p>
          {`Le taux de change varie en fonction du mode d'envoi et de paiement.`}
        </p>
        <div className="frais">
          <input
            type="checkbox"
            name=""
            id="frais"
            checked={withFees}
            onChange={(e) => setWithFees(e.target.checked)}
          />
          <label htmlFor="frais">Inclure les frais</label>
        </div>
      </div>
    </div>
  );
}

function BeneficiaryForm({
  name,
  setName,
  phone,
  setPhone,
  coutryData,
  countryList,
  selectedCountry,
}: {
  name: string;
  setName: (s: string) => void;
  phone: string;
  setPhone: (s: string) => void;
  coutryData: ICountry | null;
  countryList: ICountry[] | null;
  selectedCountry: { id: string } | null;
}) {
  const telMax = useMemo(
    () =>
      parseInt(
        coutryData?.TelMaxNumber ||
          countryList?.find((el) => el.name === selectedCountry?.id)
            ?.TelMaxNumber ||
          "0"
      ),
    [coutryData, countryList, selectedCountry]
  );
  return (
    <div className="transfert__content__convert">
      <h2>Informations du bénéficiaire</h2>
      <div className="transfert__content__wrap">
        <div className="transfert__content__inputs">
          <div>
            <label htmlFor="name">Nom et prénom du bénéficiaire</label>
            <input
              id="name"
              type="text"
              placeholder="Mavoungou Mabiala"
              value={name}
              onChange={(e) => {
                const regex = /^[A-Za-z\s]+$/;
                if (regex.test(e.target.value) || e.target.value === "") {
                  setName(e.target.value);
                }
              }}
            />
          </div>
          <div>
            <label htmlFor="phone">Le numéro du destinataire</label>
            <input
              id="phone"
              type="tel"
              placeholder="000 000 00 00"
              value={phone}
              minLength={telMax}
              maxLength={telMax}
              onChange={(e) => {
                let regex = /^\d+$/;
                if (e.target.value === "" || regex.test(e.target.value)) {
                  setPhone(e.target.value);
                }
              }}
            />
          </div>
        </div>
        <p>
          Veillez noter que ces informations peuvent être demandé pour des
          raisons de vérification en cas de problemes avec la transaction.
        </p>
      </div>
    </div>
  );
}

function NetworkSelector({
  networks,
  netId,
  setNetId,
  amount,
  rate,
  handleNetwork,
}: {
  networks: INetworkResponse[] | null;
  netId: INetworkResponse | null;
  setNetId: (n: INetworkResponse | null) => void;
  amount: number;
  rate: IRate | null;
  handleNetwork: (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    net: INetworkResponse
  ) => void;
}) {
  return (
    <div className="transfert__content__convert">
      <h2>Comment le bénéficiaire souhaite-t-il recevoir l’argent?</h2>
      <div className="transfert__content__networks">
        {networks?.map((el) => (
          <Image
            key={el.id}
            className={netId?.id === el.id ? "active" : ""}
            src={getFlagByNetworkName(el.name)}
            alt={el.name}
            width={120}
            height={120}
            onClick={(e) => handleNetwork(e, el)}
          />
        ))}
      </div>
    </div>
  );
}

function TransferSummary({
  amount,
  userCurrency,
  rate,
  withFees,
  totalSend,
  amountToreceive,
  selectedCurrency,
  name,
  phone,
  countryList,
  selectedCountry,
  netId,
  pending,
  createTransactions,
}: {
  amount: number;
  userCurrency: string;
  rate: IRate | null;
  withFees: boolean;
  totalSend: number;
  amountToreceive: number;
  selectedCurrency: string;
  name: string;
  phone: string;
  countryList: ICountry[] | null;
  selectedCountry: { id: string } | null;
  netId: INetworkResponse | null;
  pending: boolean;
  createTransactions: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}) {
  const telIndex = useMemo(
    () =>
      countryList?.find((el) => el.name === selectedCountry?.id)?.TelIndex ||
      "",
    [countryList, selectedCountry]
  );
  return (
    <div className="transfert__details">
      <h2>Synthèse</h2>
      <hr />
      <div className="transfert__details--row">
        <h3>Montant du transfert</h3>
        <span>
          {amount} {userCurrency}
        </span>
      </div>
      <div className="transfert__details--row">
        <h3>Frais de transfert</h3>
        <span>
          {withFees ? "-" : ""}
          {(amount * parseFloat(rate?.frais || "0")) / 100} {userCurrency}
        </span>
      </div>
      <div className="transfert__details--row">
        <h3>Total du transfert</h3>
        <span>
          {totalSend}
          {userCurrency}
        </span>
      </div>
      <div className="transfert__details--row">
        <h3>Total Le bénéficiaire reçoit</h3>
        <span>
          {amountToreceive} {selectedCurrency}
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
          {telIndex} {phone}
        </span>
      </div>
      <div className="transfert__details--row">
        <h3>Réseau</h3>
        <span>
          {netId &&
            `${netId.pubicName.split(" ")[0]} ${
              selectedCountry?.id ? selectedCountry.id : ""
            }`}
        </span>
      </div>
      <hr />
      <button className={pending ? "load" : ""} onClick={createTransactions}>
        {pending ? "Veillez patientez" : "Continuer"}
      </button>
    </div>
  );
}

// --- Main Page Component ---
const SendPage: React.FC = () => {
  const [userData, setUserData] = useState<IClientResponse | null>(null);
  const [countryList, setCountryList] = useState<ICountry[] | null>(null);
  const [isClient, setIsClient] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState<
    (typeof COUNTRIES)[0] | null
  >(null);
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
  const [errAmount, setErrAmount] = useState<boolean>(false);

  const router = useRouter();

  // --- Load user and country list from cookies ---
  useEffect(() => {
    setIsClient(true);
    try {
      const cookieData = Cookies.get("app_client");
      if (cookieData) setUserData(JSON.parse(cookieData));
    } catch (error) {
      console.error("Error parsing user cookie", error);
    }
    try {
      const listData = Cookies.get("list");
      if (listData) setCountryList(JSON.parse(listData));
    } catch (error) {
      console.log("Error parsing country list cookie", error);
    }
  }, []);

  // --- Set initial selected country ---
  useEffect(() => {
    if (userData?.Country?.id && isClient) {
      const initialCountry =
        COUNTRIES.find((country) => country.id !== userData.Country.name) ??
        null;
      setSelectedCountry(initialCountry);
    }
  }, [userData, isClient]);

  // --- Fetch rates and networks when selectedCountry changes ---
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchRatesAndNetworks = async () => {
      if (!userData || !selectedCountry) return;

      const codeTo = getCountryToCode(selectedCountry);

      setCountryData(getCountryById(countryList, codeTo) as ICountry);

      try {
        const code = `${userData.Country.name}-${codeTo}`;
        const rateData = await getRate(code);
        if (isMounted) {
          setRate(rateData);
          setAmount(parseInt(rateData?.intervalMin));
          setAmountToReceive(
            parseInt(rateData?.intervalMin) * parseFloat(rateData?.taux || "1")
          );
        }
      } catch (err) {
        console.error("Fetch rates error", err);
      } finally {
        if (isMounted) setLoading(false);
      }

      try {
        const cts = (await getCountries()) as ICountry[];
        const myCt = cts.find((el) => el.name === codeTo) as ICountry;
        const nets = await getNetworksById(myCt.id as string);
        if (isMounted) setNetworks(nets as INetworkResponse[]);
      } catch (error) {
        console.log("Fetch network error", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchRatesAndNetworks();

    return () => {
      isMounted = false;
    };
  }, [selectedCountry, userData, countryList]);

  // --- Handle network selection ---
  const handleNetwork = useCallback(
    async (
      event: React.MouseEvent<HTMLImageElement, MouseEvent>,
      net: INetworkResponse
    ) => {
      event.preventDefault();
      setNetId(net);

      try {
        const el = (await getNetworkByAmount(
          net.id,
          amount.toString()
        )) as IFee;
        if (el.id !== undefined) {
          setFee((amount * parseInt(rate?.taux || "1")).toString());
        }
      } catch (e) {
        console.error(e);
      }
    },
    [amount, rate]
  );

  // --- Calculations ---
  const frais = useMemo(
    () => (amount * parseFloat(rate?.frais || "0")) / 100,
    [amount, rate]
  );
  const totalSend = useMemo(
    () => (!withFees ? frais + amount : amount - frais),
    [amount, frais, withFees]
  );
  const amountToreceive = useMemo(
    () =>
      !withFees
        ? amount * parseFloat(rate?.taux || "1")
        : parseFloat(rate?.taux || "1") * (amount - frais),
    [amount, withFees, frais, rate]
  );

  // --- Create transaction handler ---
  const createTransactions = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();

      if (phone === "" || name === "" || amount === 0 || netId === null) {
        return infoMessage(
          "S'il vous plait, vérifiez que vous aviez correctement remplis le formulaire d'envoie!"
        );
      }

      if (
        amount < parseInt(rate?.intervalMin || "0") ||
        amount > parseInt(rate?.intervalMax || "0")
      ) {
        infoMessage(
          `le montant à envoyer doit être compris entre ${
            (rate?.intervalMin || "") + " " + userData?.Country.currency
          } et ${(rate?.intervalMax || "") + " " + userData?.Country.currency}`
        );
        return setErrAmount(true);
      }

      const codeTo = getCountryToCode(selectedCountry!);

      if (
        parseInt(
          countryList?.find((el) => el.name === selectedCountry?.id)
            ?.TelMaxNumber || "0"
        ) !== phone.length
      ) {
        return infoMessage(`Veillez s'il vous plait entrer un numéro valide`);
      }

      setPending(true);

      const transaction: ITrasanctionData = {
        amountToSend: totalSend.toString(),
        amountToPayOut: amountToreceive.toString(),
        clientEmail: userData?.email as string,
        fees: fee,
        networkId: netId?.id as string,
        type: "send",
        receiverPhone: phone as string,
        receiverName: name,
        code: `${userData?.Country.name}-${codeTo}`,
        status: "WAITING" as any,
        origin: selectedCountry?.id as string,
        dateTime: moment().format("DD-MM-YYYY"),
      };

      try {
        const t = await createTransaction(transaction);
        router.push(`/comfirmation/${t.id}`);
        setAmount(0);
        setAmountToReceive(0);
        setFee("");
        setNetId(null);
        setPhone("");
        setName("");
      } catch (el) {
        errorMessage(
          "Ops! une érreur s'est produite lors de l'enregustrement de votre transaction. Veillez ressayer plutard"
        );
      } finally {
        setPending(false);
      }
    },
    [
      amount,
      amountToreceive,
      countryList,
      fee,
      name,
      netId,
      // pending,
      phone,
      rate,
      router,
      selectedCountry,
      totalSend,
      userData,
      // withFees,
    ]
  );

  // --- Render ---
  if (!isClient || !userData) {
    return (
      <div className="transfert__container">
        <div className="transfert__wrapper">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="transfert__container">
      <div className="transfert__wrapper">
        <div className="transfert__content">
          <CountrySelect
            countries={COUNTRIES}
            userCountryId={userData.Country.name}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            setNetId={setNetId}
            isOption={isOption}
            setIsOption={setIsOption}
          />
          {loading ? (
            <div className="loading__skeleton">
              <div className="loading__skeleton--top"></div>
              <div className="loading__skeleton--bottom"></div>
            </div>
          ) : (
            <>
              <AmountConverter
                amount={amount}
                setAmount={setAmount}
                amountToReceive={amountToReceive}
                setAmountToReceive={setAmountToReceive}
                rate={rate}
                userCurrency={userData.Country.currency}
                selectedCurrency={selectedCountry?.currency || ""}
                errAmount={errAmount}
                setErrAmount={setErrAmount}
                withFees={withFees}
                setWithFees={setWithFees}
              />
              <BeneficiaryForm
                name={name}
                setName={setName}
                phone={phone}
                setPhone={setPhone}
                coutryData={coutryData}
                countryList={countryList}
                selectedCountry={selectedCountry}
              />
              <NetworkSelector
                networks={networks}
                netId={netId}
                setNetId={setNetId}
                amount={amount}
                rate={rate}
                handleNetwork={handleNetwork}
              />
            </>
          )}
        </div>
        <TransferSummary
          amount={amount}
          userCurrency={userData.Country.currency}
          rate={rate}
          withFees={withFees}
          totalSend={totalSend}
          amountToreceive={amountToreceive}
          selectedCurrency={selectedCountry?.currency || ""}
          name={name}
          phone={phone}
          countryList={countryList}
          selectedCountry={selectedCountry}
          netId={netId}
          pending={pending}
          createTransactions={createTransactions}
        />
      </div>
    </div>
  );
};

export default SendPage;
