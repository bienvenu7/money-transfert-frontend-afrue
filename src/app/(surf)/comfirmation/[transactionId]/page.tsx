import Confirmation from "@/app/components/confirmation/Confirmation";
import Titles from "@/app/components/Titles";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="transfert__confirmation--container">
      <div className="transfert__confirmation--wrapper">
        <Titles line1="En attende confirmation" line2="Afru-Exchange" />
        <div className="transfert__confirmation--content">
          <div className="transfert__confirmation--content__left">
            <h2>Veillez éffectuer un dépot aux coordonnées ci dessous</h2>
            <div className="transfert__confirmation--content__left--cards">
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
            </div>
          </div>
          <Confirmation />
        </div>
      </div>
    </div>
  );
};

export default page;
