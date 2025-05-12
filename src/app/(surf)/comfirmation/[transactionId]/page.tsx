import {
  getCardsByNetworkId,
  getTransactionById,
} from "@/app/actions/transaction";
import Confirmation from "@/app/components/confirmation/Confirmation";
import Copied from "@/app/components/confirmation/Copied";
import Wrapper from "@/app/components/confirmation/Wrapper";
import Titles from "@/app/components/Titles";

type Props = {};

const page = async ({
  params,
}: {
  params: Promise<{ transactionId: string }>;
}) => {
  const card = await getCardsByNetworkId((await params).transactionId);
  const transaction = await getTransactionById((await params).transactionId);

  return (
    <div className="transfert__confirmation--container">
      <div className="transfert__confirmation--wrapper">
        <Titles line1="En attente de confirmation" line2="Afru-Exchange" />
        <Wrapper card={card} transaction={transaction} />
      </div>
    </div>
  );
};

export default page;
