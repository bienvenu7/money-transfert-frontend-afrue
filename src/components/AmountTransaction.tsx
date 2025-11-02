import Svgs from '@/components/Svgs';
import type { IRate } from '@/types/country';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const handleAmountChange = (val: string) => {
    if (val === '') {
      setAmount(0);
      setAmountToReceive(0);
      setErrAmount(false);
      return;
    }
    const num = parseInt(val);
    if (
      num < parseInt(rate?.intervalMin || '0') ||
      num > parseInt(rate?.intervalMax || '0')
    ) {
      setErrAmount(true);
    } else {
      setErrAmount(false);
    }
    setAmount(num);
    setAmountToReceive(num * parseFloat(rate?.taux || '1'));
  };

  const handleAmountToReceiveChange = (val: string) => {
    if (val === '') {
      setAmount(0);
      setAmountToReceive(0);
      setErrAmount(false);
      return;
    }
    const num = parseInt(val);
    if (
      num < parseInt(rate?.intervalMin || '0') ||
      num > parseInt(rate?.intervalMax || '0')
    ) {
      setErrAmount(true);
    } else {
      setErrAmount(false);
    }
    setAmount(Math.round(num / parseFloat(rate?.taux || '1')));
    setAmountToReceive(num);
  };

  return (
    <div className='transfert__content__convert'>
      <div className='transfert__content__convert--wrapper'>
        <div
          className={
            errAmount
              ? 'transfert__content__convert--input err'
              : 'transfert__content__convert--input'
          }
        >
          <label htmlFor='amount'>{t('send.amountToSend')}</label>
          <div>
            <input
              id='amount'
              type='text'
              value={amount}
              className={errAmount ? 'err' : ''}
              onChange={e => handleAmountChange(e.target.value)}
              placeholder=''
            />
            <span>{userCurrency}</span>
          </div>
        </div>
        <button>
          <Svgs name='exchange' />
        </button>
        <div className='transfert__content__convert--input'>
          <label htmlFor='amount'>{t('send.amountToReceive')}</label>
          <div>
            <input
              id='amount'
              type='text'
              value={amountToReceive}
              placeholder=''
              onChange={e => handleAmountToReceiveChange(e.target.value)}
            />
            <span>{selectedCurrency}</span>
          </div>
        </div>
      </div>
      <div className='transfert__content__convert--text'>
        <strong>
          1 {userCurrency} = {rate?.taux || ''} {selectedCurrency}
        </strong>
        <p>
          {t('send.exchangeRate')}
          {/* {`Le taux de change varie en fonction du mode d'envoi et de paiement.`} */}
        </p>
        <div className='frais'>
          <input
            type='checkbox'
            name=''
            id='frais'
            checked={withFees}
            onChange={e => setWithFees(e.target.checked)}
          />
          <label htmlFor='frais'>{t('send.includeFees')}</label>
        </div>
      </div>
    </div>
  );
}

export default AmountConverter;
