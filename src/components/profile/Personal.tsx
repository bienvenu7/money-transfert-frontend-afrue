import Modal from '@/components/layouts/Modal';
import CardPersonnel from '@/components/profile/CardPersonnel';
import Update from '@/components/profile/Update';
import type { ICountry } from '@/types/country';
import type { IClientResponse } from '@/types/user';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TfiPencilAlt } from 'react-icons/tfi';
// import CardPersonnel from './CardPersonnel';

export interface IPCard {
  title: string;
  text: string;
}

export interface IPSecurity {
  title: string;
}

type Props = {
  type: string;
  clientData: IClientResponse | null;
  countries: ICountry[];
};

const Personal = ({ type, clientData, countries }: Props) => {
  const { t } = useTranslation();

  const PCard: IPCard[] = [
    {
      title: t('profile.clientNumber'),
      text: `#${clientData?.clientNumber as number}`,
    },
    {
      title: t('profile.fullName'),
      text: clientData?.fullName as string,
    },
    {
      title: t('profile.email'),
      text: clientData?.email as string,
    },
    {
      title: t('profile.phone'),
      text: clientData?.whatsappNumber as string,
    },
    {
      title: t('profile.country'),
      text: clientData?.Country.pubicName as string,
    },
  ];

  const PSCard: IPSecurity[] = [
    { title: t('profile.changePassword') },
    { title: t('profile.others') },
  ];

  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <div className='profile__personel'>
        <div className='title'>
          <h2>
            {type === 'Information personnelle'
              ? t('profile.personalInfo')
              : t('profile.security')}
          </h2>
          {type === 'Information personnelle' && (
            <button onClick={() => setOpenModal(true)}>
              <TfiPencilAlt />
            </button>
          )}
        </div>
        <div className='profile__personel--cards'>
          {type !== 'Sécurité'
            ? PCard.map(el => (
                <CardPersonnel title={el.title} text={el.text} key={el.title} />
              ))
            : PSCard.map(el => (
                <CardPersonnel title={el.title} text={''} key={el.title} />
              ))}
        </div>
      </div>
      <Modal onClose={() => setOpenModal(false)} show={openModal}>
        <Update
          countries={countries}
          clientData={clientData as IClientResponse}
        />
      </Modal>
    </>
  );
};

export default Personal;
