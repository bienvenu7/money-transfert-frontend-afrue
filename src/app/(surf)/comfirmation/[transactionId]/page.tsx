import React from "react";
import { AiOutlineCheck } from "react-icons/ai";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="transfert__confirmation--container">
      <div className="transfert__confirmation--wrapper">
        <h1>En attente de confirmation</h1>
        <div className="transfert__confirmation--content">
          <p>Pour terminer la transaction en effectuant un transfert vers :</p>
          <div className="transfert__confirmation--content__row">
            <h3>Methode</h3>
            <span>Oranfe Congo</span>
          </div>
          <div className="transfert__confirmation--content__row">
            <h3>N° du compte</h3>
            <span>06 660 78 98</span>
          </div>
          <div className="transfert__confirmation--content__row">
            <h3>Nom</h3>
            <span>Simon Mabanza</span>
          </div>
          <div className="transfert__confirmation--content__row">
            <h3>Montant</h3>
            <span>1500 xaf</span>
          </div>
          <div className="form__input">
            <label className="confirm" htmlFor="email">
              {`Numero d'envoie`}
            </label>
            <input
              id="email"
              // onChange={(e) => setEmail(e.target.value)}
              type={"email"}
              placeholder="Entrez le numero auquel vous aviez effectué le transfert"
              // value={email}
            />
          </div>
          <button>Dépot éffectué</button>
        </div>
      </div>
    </div>
  );
};

export default page;
