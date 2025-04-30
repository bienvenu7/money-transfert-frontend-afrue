import {
  getCardsByNetworkId,
  getTransactionById,
} from "@/app/actions/transaction";
import Confirmation from "@/app/components/confirmation/Confirmation";
import Titles from "@/app/components/Titles";
import { useParams } from "next/navigation";

type Props = {};

const page = async ({
  params,
}: {
  params: Promise<{ transactionId: string }>;
}) => {
  const card = await getCardsByNetworkId((await params).transactionId);
  const transaction = await getTransactionById((await params).transactionId);
  console.log(transaction);

  return (
    <div className="transfert__confirmation--container">
      <div className="transfert__confirmation--wrapper">
        <Titles line1="En attente de confirmation" line2="Afru-Exchange" />
        <div className="transfert__confirmation--content">
          <div className="transfert__confirmation--content__left">
            <h2>Veillez éffectuer un dépot aux coordonnées ci dessous</h2>
            <div className="transfert__confirmation--content__left--cards">
              <div className="transfert__confirmation--content__row">
                <h3>Methode</h3>
                <span>{card?.network.pubicName}</span>
              </div>
              <div className="transfert__confirmation--content__row">
                <h3>N° du compte</h3>
                <span>{card?.phone}</span>
              </div>
              <div className="transfert__confirmation--content__row">
                <h3>Nom</h3>
                <span>{card?.fullName}</span>
              </div>
              <div className="transfert__confirmation--content__row">
                <h3>Montant</h3>
                <span>{transaction.amountToSend} xaf</span>
              </div>
            </div>
          </div>
          <Confirmation card={card} />
        </div>
      </div>
    </div>
  );
};

export default page;
