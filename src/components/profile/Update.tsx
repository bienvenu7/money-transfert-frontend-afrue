import UpdateForm from '@/components/profile/UpdateForm';
import UpdateOtp from '@/components/profile/UpdateOtp';
import type { ICountry } from '@/types/country';
import type { IClientResponse, IClientUpdate } from '@/types/user';
import { useState } from 'react';

type Props = {
  countries: ICountry[];
  clientData: IClientResponse;
};

const Update = ({ countries, clientData }: Props) => {
  const [userData, setUserData] = useState<IClientUpdate>({
    userID: clientData.id,
    countryId: clientData.Country.id,
    password: undefined,
    phone: clientData.whatsappNumber,
    username: clientData.fullName,
  });
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [isErr, setIsErr] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  return (
    <div className='profile__update'>
      <h2>Update Profile</h2>
      {isErr && (
        <span>{`Une erreur s'est produite lors de la modification de vos données!`}</span>
      )}
      {message !== '' && <p>{message}</p>}

      {step === 1 && (
        <UpdateForm
          countries={countries}
          email={clientData.email}
          isErr={isErr}
          loading={loading}
          setIsErr={setIsErr}
          setLoading={setLoading}
          setStep={setStep}
          step={step}
          userData={userData}
          setUserData={setUserData}
        />
      )}
      {step === 2 && (
        <UpdateOtp
          email={clientData.email}
          isErr={isErr}
          loading={loading}
          setIsErr={setIsErr}
          setLoading={setLoading}
          setMessage={setMessage}
          userData={userData}
        />
      )}
    </div>
  );
};

export default Update;
