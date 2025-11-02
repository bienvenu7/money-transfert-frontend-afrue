import Copied from '@/components/confirmation/Copied';
import Modal from '@/components/layouts/Modal';
import { useGetCountries } from '@/hooks/useCountry';
import { updateTransaction } from '@/lib/transaction';
import type { ICountry } from '@/types/country';
import type { ITrasanctionResponse } from '@/types/transaction';
import {
  errorMessage,
  infoMessage,
  successMessage,
} from '@/utils/notification';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

type Props = {
  transaction: ITrasanctionResponse;
};

const Wrapper = ({ transaction }: Props) => {
  const { t } = useTranslation();

  const { countries } = useGetCountries('confirmation');
  const [step, setStep] = useState<number>(1);
  const [hour, setHour] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const { id } = useParams();
  const router = useNavigate();
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState<ICountry | undefined>(undefined);
  // const [countries, setCountries] = useState<ICountry[]>([]);
  const [openModal, setOpenModal] = useState(false);

  // Initialize client-side data after hydration
  useEffect(() => {
    const foundCountry = countries?.find(
      el => el.id === transaction.card.countryId
    );
    setCountry(foundCountry);
  }, [countries]);

  console.log(countries);
  console.log(transaction);

  const confirmTransaction = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (
      country?.name !== 'ru' &&
      phone.length !== parseInt(country?.TelMaxNumber as string)
    ) {
      return infoMessage("Le numéro d'envoie n'est pas correcte");
    }

    if (country?.name === 'ru' && name === '') {
      return infoMessage("Le numéro d'envoie n'est pas correcte");
    }

    if (hour === '') {
      return infoMessage(
        "Veillez s'il vous plait selectionner une heure précise!"
      );
    }

    setLoading(true);

    const myHour = hour.split(':');

    await updateTransaction(
      id as string,
      `${country?.name === 'ru' ? name : phone}`,
      `${myHour[0]}h${myHour[1]}`,
      'INPROGRESS' as any
    )
      .then(transaction => {
        console.table(transaction);
        successMessage('La transaction a été confirmé avec succès!');
        router('/confirmation');
      })
      .catch(err => {
        errorMessage(
          "Une erreur s'est produite lors de la confirmation de la transaction"
        );
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  const status = [
    { status: 'INPROGRESS', name: 'En cours' },
    { status: 'ERROR', name: 'Echec' },
    { status: 'FINISH', name: 'Terminée' },
  ];

  return (
    <>
      <div className='transfert__confirmation--content'>
        <div className='transfert__confirmation--count'>
          <div className={`number`}>
            <span>1</span>
          </div>
          <div className={`number`}>
            <span>2</span>
          </div>
          <div className={`number`}>
            <span>3</span>
          </div>
          <div
            className={`line ${step === 2 ? 'two' : step === 3 ? 'three' : ''}`}
          ></div>
        </div>
        <div className='transfert__confirmation--content__left'>
          <div className='transfert__confirmation--content__left__first'>
            <h2>{t('confirmation.steps.depositInfo')}</h2>
            <div className='transfert__confirmation--content__left--cards'>
              <div className='transfert__confirmation--content__row'>
                <h3>{t('confirmation.steps.method')}</h3>
                <span>{transaction.card?.network.pubicName}</span>
              </div>
              <div className='transfert__confirmation--content__row'>
                <h3>{t('confirmation.steps.accountNumber')}</h3>
                <span>{transaction.card?.phone}</span>
              </div>
              <div className='transfert__confirmation--content__row'>
                <h3>{t('confirmation.steps.name')}</h3>
                <span>{transaction.card?.fullName}</span>
              </div>
              <div className='transfert__confirmation--content__row'>
                <h3>{t('confirmation.steps.amount')}</h3>
                <span>
                  {transaction.amountToSend} {country?.currency}
                </span>
              </div>
            </div>
            {transaction.status !== ('INPROGRESS' as any) && (
              <Copied
                method={transaction.card?.network.pubicName}
                motant={transaction.amountToSend}
                name={transaction.card?.fullName}
                phone={transaction.card?.phone}
                setStep={setStep}
              />
            )}
          </div>
          <div
            className={`transfert__confirmation--content__left__first ${
              step >= 2 || transaction.status === ('INPROGRESS' as any)
                ? ''
                : 'hide'
            }`}
          >
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit
              tempora mollitia perspiciatis minima, ipsum vel amet aperiam vero,
              reiciendis deserunt distinctio dicta ratione repellendus molestias
              consequatur quibusdam, veritatis odio laboriosam.
              <br /> Suscipit tempora mollitia perspiciatis minima, ipsum vel
              amet aperiam vero, reiciendis deserunt distinctio dicta ratione
              repellendus molestias consequatur quibusdam, veritatis odio
              laboriosam.
              <br /> Suscipit tempora mollitia perspiciatis minima, ipsum vel
              amet aperiam vero, reiciendis deserunt distinctio dicta ratione
              repellendus.
            </p>
            <button
              className={step >= 2 ? '' : 'hide'}
              onClick={() => setStep(3)}
            >{`J'ai compris`}</button>
          </div>
          <div
            className={`transfert__confirmation--content__left__first ${
              step >= 3 || transaction.status === ('INPROGRESS' as any)
                ? ''
                : 'hide'
            }`}
          >
            {transaction.status !== ('INPROGRESS' as any) && (
              <>
                <h2>{t('confirmation.steps.depositDetails')}</h2>
                <div className='transfert__confirmation--content__right--forms'>
                  {country?.name === 'ru' ? (
                    <div className='transfert__confirmation--content__right--input'>
                      <label className='confirm' htmlFor='name'>
                        {t('confirmation.steps.accountName')}
                        {/* {`Nom rélié au compte, ex: El Nuntia`} */}
                      </label>
                      <input
                        id='name'
                        type='text'
                        placeholder={t(
                          'confirmation.steps.accountNamePlaceholder'
                        )}
                        value={name}
                        onChange={e => {
                          const regex = /^[A-Za-z\s]+$/;
                          if (
                            regex.test(e.target.value) ||
                            e.target.value === ''
                          ) {
                            setName(e.target.value);
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <div className='transfert__confirmation--content__right--input'>
                      <label className='confirm' htmlFor='phone'>
                        {t('confirmation.steps.sendNumber')}
                        {/* {`Numero d'envoie, ex: 066779090`} */}
                      </label>
                      <input
                        id='phone'
                        onChange={e => setPhone(e.target.value)}
                        type={'tel'}
                        placeholder={t(
                          'confirmation.steps.sendNumberPlaceholder'
                        )}
                        value={phone}
                        maxLength={parseInt(country?.TelMaxNumber as string)}
                      />
                    </div>
                  )}
                  <div className='transfert__confirmation--content__right--input'>
                    <label className='confirm' htmlFor='hour'>
                      {/* {`Heure précise, ex: 14h05`} */}
                      {t('confirmation.steps.exactTime')}
                    </label>

                    <input
                      id='hour'
                      onChange={e => setHour(e.target.value)}
                      type={'time'}
                      placeholder={t('confirmation.steps.exactTimePlaceholder')}
                      value={hour}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    />
                  </div>
                </div>
              </>
            )}
            {transaction.status === ('INPROGRESS' as any) ? (
              <button onClick={() => setOpenModal(true)}>
                {t('confirmation.steps.viewDetails')}
                {/* Voir les details */}
              </button>
            ) : (
              <button
                className={step >= 2 ? '' : 'hide'}
                onClick={confirmTransaction}
              >
                {loading
                  ? t('confirmation.steps.pleaseWait')
                  : t('confirmation.steps.depositDone')}
              </button>
            )}
          </div>
        </div>
      </div>
      <Modal onClose={setOpenModal} show={openModal}>
        <div className='modal__container'>
          <h2>A propos de la transaction</h2>
          <div className='modal__box'>
            <div className='modal__line'>
              <small>status:</small>
              <strong>
                {
                  status.find(el => el.status === (transaction.status as any))
                    ?.name
                }
              </strong>
            </div>
            <div className='modal__line'>
              <small>{`Date d'initiation:`}</small>
              <strong>{transaction.dateTime}</strong>
            </div>
            <div className='modal__line'>
              <small>{`Iltinéraire:`}</small>
              <strong>{transaction.code}</strong>
            </div>
            <div className='modal__line'>
              <small>Montant transféré:</small>
              <strong>
                {transaction.amountToSend}{' '}
                {
                  countries?.find(
                    el => el.name === transaction.code.split('-')[0]
                  )?.currency
                }
              </strong>
            </div>
            <div className='modal__line'>
              <small>Montant à recevoir:</small>
              <strong>
                {transaction.amountToPayOut}{' '}
                {
                  countries?.find(
                    el => el.name === transaction.code.split('-')[1]
                  )?.currency
                }
              </strong>
            </div>
            <div className='modal__line'>
              <small>Nom du destinataire:</small>
              <strong>{transaction.receiverName}</strong>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Wrapper;
