import { resendOtp } from "@/app/actions/auth";
import { ICountry } from "@/types/country";
import { IClientUpdate } from "@/types/user";
import { isAxiosError } from "axios";
import React, { useState } from "react";

type Props = {
  userData: IClientUpdate;
  setUserData: React.Dispatch<React.SetStateAction<IClientUpdate>>;
  countries: ICountry[];
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  isErr: boolean;
  setIsErr: React.Dispatch<React.SetStateAction<boolean>>;
};

const UpdateForm = ({
  userData,
  countries,
  loading,
  setLoading,
  email,
  setStep,
  isErr,
  setIsErr,
  setUserData,
}: Props) => {
  const sendOtp = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (loading) return;

    setLoading(true);
    setIsErr(false);

    try {
      const response = await resendOtp(email);
      if (response) {
        setStep(2);
      }
    } catch (err) {
      if (err instanceof isAxiosError) {
        console.error(err);
        setIsErr(true);
      }
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="profile__update--forms">
        <div className="form__input">
          <label htmlFor="username">Username (optionel)</label>
          <input
            id="username"
            type={"text"}
            placeholder="Votre numero de téléphone"
            value={userData.username}
            onChange={(event) =>
              setUserData({ ...userData, username: event.target.value })
            }
          />
        </div>
        <div className="form__input">
          <label htmlFor="phone">Téléphone (optionel)</label>
          <input
            id="phone"
            type={"text"}
            placeholder="Votre numero de téléphone"
            value={userData.phone}
            onChange={(event) =>
              setUserData({ ...userData, phone: event.target.value })
            }
          />
        </div>
        <div className="form__input">
          <label htmlFor="password">Mot de passe (optionel)</label>
          <input
            id="password"
            type={"password"}
            placeholder="mot de passe"
            value={userData.password}
            onChange={(event) =>
              setUserData({ ...userData, password: event.target.value })
            }
          />
        </div>
        <div className="form__input">
          <label htmlFor="country">Localité (optionel)</label>
          <select
            defaultValue={userData.countryId}
            id="country"
            onChange={(event) =>
              setUserData({ ...userData, countryId: event.target.value })
            }
            value={userData.countryId}
          >
            <option value="">Sélectionez votre localité</option>
            {countries.map((el) => {
              return (
                <option key={el.id} value={el.id}>
                  {el.pubicName}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <button
        type={"button"}
        className={loading ? "loading" : ""}
        onClick={sendOtp}
      >
        {loading ? "Veillez patienter..." : "Suivant"}
      </button>
    </>
  );
};

export default UpdateForm;
