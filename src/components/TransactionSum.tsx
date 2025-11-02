import type { ICountry, IRate } from '@/types/country';
import type { INetworkResponse } from '@/types/networks';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const telIndex = useMemo(
    () =>
      countryList?.find(el => el.name === selectedCountry?.id)?.TelIndex || '',
    [countryList, selectedCountry]
  );
  return (
    <div className='transfert__details'>
      <h2>{t('send.summary')}</h2>
      <hr />
      <div className='transfert__details--row'>
        <h3>{t('send.transferAmount')}</h3>
        <span>
          {amount} {userCurrency}
        </span>
      </div>
      <div className='transfert__details--row'>
        <h3>{t('send.transferFees')}</h3>
        <span>
          {withFees ? '-' : ''}
          {(amount * parseFloat(rate?.frais || '0')) / 100} {userCurrency}
        </span>
      </div>
      <div className='transfert__details--row'>
        <h3>{t('send.totalTransfer')}</h3>
        <span>
          {totalSend}
          {userCurrency}
        </span>
      </div>
      <div className='transfert__details--row'>
        <h3>{t('send.beneficiaryReceives')}</h3>
        <span>
          {amountToreceive} {selectedCurrency}
        </span>
      </div>
      <hr />
      <h2>{t('send.recipient')}</h2>
      <hr />
      <div className='transfert__details--row'>
        <h3>{t('send.name')}</h3>
        <span>{name}</span>
      </div>
      <div className='transfert__details--row'>
        <h3>{t('send.phoneNumber')}</h3>
        <span>
          {telIndex} {phone}
        </span>
      </div>
      <div className='transfert__details--row'>
        <h3>{t('send.network')}</h3>
        <span>
          {netId &&
            `${netId.pubicName.split(' ')[0]} ${
              selectedCountry?.id ? selectedCountry.id : ''
            }`}
        </span>
      </div>
      <hr />
      <button className={pending ? 'load' : ''} onClick={createTransactions}>
        {pending ? t('send.pleaseWait') : t('send.continue')}
      </button>
    </div>
  );
}

export default TransferSummary;
