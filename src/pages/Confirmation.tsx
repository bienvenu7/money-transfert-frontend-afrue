import Wrapper from '@/components/confirmation/Wrapper';
import MainLayout from '@/components/layouts/MainLayout';
import Titles from '@/components/Title';
import { useGetTransactonById } from '@/hooks/useTransaction';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

const Confirmation = () => {
  const { id } = useParams();

  // Add validation for the id parameter
  const transactionId = useMemo(() => {
    if (!id) {
      console.error('Transaction ID is missing from URL parameters');
      return '';
    }
    return id;
  }, [id]);

  const {
    transaction,
    isGettingTransaction: isLoading,
    isTransactionError: error,
  } = useGetTransactonById(transactionId);

  // Handle loading state
  if (isLoading) {
    return (
      <MainLayout>
        <div className='transfert__confirmation--container'>
          <div className='transfert__confirmation--wrapper'>
            <Titles line1='Chargement...' line2='Afru-Exchange' />
            <div className='loading-spinner'>
              Loading transaction details...
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Handle error state
  if (error) {
    return (
      <MainLayout>
        <div className='transfert__confirmation--container'>
          <div className='transfert__confirmation--wrapper'>
            <Titles line1='Erreur' line2='Afru-Exchange' />
            <div className='error-message'>
              Une erreur est survenue lors du chargement de la transaction.
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Handle case where transaction is not found
  if (!transaction) {
    return (
      <MainLayout>
        <div className='transfert__confirmation--container'>
          <div className='transfert__confirmation--wrapper'>
            <Titles line1='Transaction non trouvée' line2='Afru-Exchange' />
            <div className='not-found-message'>
              La transaction demandée n'a pas été trouvée.
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className='transfert__confirmation--container'>
        <div className='transfert__confirmation--wrapper'>
          <Titles line1='En attente de confirmation' line2='Afru-Exchange' />
          <Wrapper transaction={transaction} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Confirmation;
