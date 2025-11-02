import type { ICountry } from '@/types/country';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

function BeneficiaryForm({
  name,
  setName,
  phone,
  setPhone,
  coutryData,
  countryList,
  selectedCountry,
}: {
  name: string;
  setName: (s: string) => void;
  phone: string;
  setPhone: (s: string) => void;
  coutryData: ICountry | null;
  countryList: ICountry[] | null;
  selectedCountry: { id: string } | null;
}) {
  const { t } = useTranslation();

  const telMax = useMemo(
    () =>
      parseInt(
        coutryData?.TelMaxNumber ||
          countryList?.find(el => el.name === selectedCountry?.id)
            ?.TelMaxNumber ||
          '0'
      ),
    [coutryData, countryList, selectedCountry]
  );
  return (
    <div className='transfert__content__convert'>
      <h2>{t('send.beneficiaryInfo')}</h2>
      <div className='transfert__content__wrap'>
        <div className='transfert__content__inputs'>
          <div>
            <label htmlFor='name'>{t('send.beneficiaryName')}</label>
            <input
              id='name'
              type='text'
              placeholder='Mavoungou Mabiala'
              value={name}
              onChange={e => {
                const regex = /^[A-Za-z\s]+$/;
                if (regex.test(e.target.value) || e.target.value === '') {
                  setName(e.target.value);
                }
              }}
            />
          </div>
          <div>
            <label htmlFor='phone'>{t('send.beneficiaryPhone')}</label>
            <input
              id='phone'
              type='tel'
              placeholder='000 000 00 00'
              value={phone}
              minLength={telMax}
              maxLength={telMax}
              onChange={e => {
                const regex = /^\d+$/;
                if (e.target.value === '' || regex.test(e.target.value)) {
                  setPhone(e.target.value);
                }
              }}
            />
          </div>
        </div>
        <p>{t('send.beneficiaryNote')}</p>
      </div>
    </div>
  );
}

export default BeneficiaryForm;
