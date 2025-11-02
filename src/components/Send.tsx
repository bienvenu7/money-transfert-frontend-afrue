import type { INetworkResponse } from '@/types/networks';
import { useTranslation } from 'react-i18next';

interface ICountySelect {
  id: string;
  name: string;
  flag: string;
  currency: string;
}

function CountrySelect({
  countries,
  userCountryId,
  selectedCountry,
  setSelectedCountry,
  setNetId,
  isOption,
  setIsOption,
}: {
  countries: ICountySelect[];
  userCountryId: string;
  selectedCountry: (typeof countries)[0] | null;
  setSelectedCountry: (c: (typeof countries)[0]) => void;
  setNetId: (n: INetworkResponse | null) => void;
  isOption: boolean;
  setIsOption: (b: boolean) => void;
}) {
  const { t } = useTranslation();

  return (
    <div className='transfert__content__selectBlock'>
      <div className='transfert__content__selectBlock--title'>
        <h1>{t('send.welcome')}</h1>
        <p>{t('send.fillInfo')}</p>
      </div>
      <div
        className='transfert__content__selectBlock--select'
        onClick={() => setIsOption(!isOption)}
      >
        <div className='placeholder'>
          <img
            src={selectedCountry?.flag || ''}
            width={32}
            height={32}
            alt={selectedCountry?.name || ''}
          />
          <div className='text'>
            <small>{t('send.selectCountry')}</small>
            <span>{selectedCountry?.name}</span>
          </div>
        </div>
        <div className={isOption ? 'options' : 'options close'}>
          {countries
            .filter(el => el.id !== userCountryId)
            .map(el => (
              <div
                className='option'
                key={el.id}
                onClick={() => {
                  setSelectedCountry(el);
                  setNetId(null);
                  setIsOption(false);
                }}
              >
                <img src={el.flag} width={32} height={32} alt={el.name} />
                <span>{el.name}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default CountrySelect;
