import { confirmOtpUpdate, updateClient } from '@/lib/auth';
import type { IClientUpdate } from '@/types/user';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  isErr: boolean;
  setIsErr: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  userData: IClientUpdate;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  email: string;
};

const UpdateOtp = ({
  // isErr,
  setIsErr,
  loading,
  setLoading,
  userData,
  setMessage,
  email,
}: Props) => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [mistake, setMistake] = useState<boolean>(false);
  const [disable, setDisable] = useState<boolean>(false);

  const router = useNavigate();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (isNaN(event.target.value as any)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? event.target.value : d))]);

    //Focus next input
    if (event.target.nextSibling) {
      (event.target.nextSibling as any).focus();
    }
  };

  const confirmCode = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (loading) return; // Prevent multiple calls

    setLoading(true);
    setIsErr(false);
    setMistake(false);

    try {
      const otpResponse = await confirmOtpUpdate(email, otp);

      if (otpResponse === 200) {
        const updateResponse = await updateClient(userData);

        if (updateResponse) {
          router('/auth/login');
          setMessage(updateResponse);
          // Use setTimeout to prevent potential state update issues
        }
      } else {
        setMistake(true);
        setIsErr(true);
      }
    } catch (error) {
      console.error(error);
      setMistake(true);
      setIsErr(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (otp[otp.length - 1] !== '') {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [otp]);

  return (
    <>
      <p>{`Veillez s'il vous plait saisir le code de confirmation reçu par message.`}</p>
      <div className='auth__otp--inputs'>
        {otp.map((el, index) => (
          <input
            key={index}
            type={'tel'}
            value={el}
            onChange={e => handleChange(e, index)}
            onFocus={e => e.target.select()}
            maxLength={1}
            className={mistake ? 'underline' : ''}
          />
        ))}
      </div>
      <button
        type={'button'}
        className={loading ? 'loading' : ''}
        style={!disable ? { backgroundColor: 'rgba(97, 131, 245, .5)' } : {}}
        onClick={confirmCode}
      >
        Confirmer
      </button>
    </>
  );
};

export default UpdateOtp;
