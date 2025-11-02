import type { IRate } from '@/types/country';
import type { INetworkResponse } from '@/types/networks';
import { useTranslation } from 'react-i18next';

const FLAG_NETWORKS = [
  { id: 'mtn', flag: '/mtn.png' },
  { id: 'airtel', flag: '/airtel.png' },
  { id: 'orange', flag: '/partners/orange1.png' },
  { id: 'wave', flag: '/partners/wave.png' },
  { id: 'sberBank', flag: '/partners/sber.png' },
  { id: 'vtb Bank', flag: '/partners/vtb.png' },
  { id: 'alfa Bank', flag: '/partners/alfa.png' },
  { id: 'mtc', flag: '/partners/mtc.png' },
];

const getFlagByNetworkName = (name: string) =>
  FLAG_NETWORKS.find(e => e.id === name)?.flag || '';

function NetworkSelector({
  networks,
  netId,
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
  const { t } = useTranslation();

  return (
    <div className='transfert__content__convert'>
      <h2>{t('send.receiveMethod')}</h2>
      <div className='transfert__content__networks'>
        {networks?.map(el => (
          <img
            key={el.id}
            className={netId?.id === el.id ? 'active' : ''}
            src={getFlagByNetworkName(el.name)}
            alt={el.name}
            width={120}
            height={120}
            onClick={e => handleNetwork(e, el)}
          />
        ))}
      </div>
    </div>
  );
}

export default NetworkSelector;
