import { useOptCheck } from '@/hooks/useAuthentication';
import { errorMessage } from '@/utils/notification';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
// import { errorMessage, successMessage } from '../utils/notification';

type Props = {
  email: string;
  // password: string | null;
};

const Otp = ({ email }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [disable, setDisable] = useState<boolean>(false);
  const [mistake, setMistake] = useState<boolean>(false);
  // const [success, setSuccess] = useState<boolean>(false);
  // const [done, setDone] = useState<boolean>(false);
  // const [isloading, setIsLoading] = useState<boolean>(false);

  const { postOtp, lodingOtp, successOtp } = useOptCheck(email, otp);

  useEffect(() => {
    if (otp[otp.length - 1] !== '') {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [otp]);

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

  const sendOtp = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (!disable) {
      setMistake(true);
      return;
    }
    await postOtp()
      .then(() => navigate('/'))
      .catch(() => errorMessage("Impossible de vérifier l'otp!"));
  };

  // const resend = async (
  //   event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  //   event.preventDefault();
  //   await resendOtp(email)
  //     .then(() => setDone(true))
  //     .catch(error => console.error(error));
  // };

  const countRef = useRef(60);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [, forceUpdate] = useState(60); // Trigger UI update

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (countRef.current > 0) {
        countRef.current -= 1;
        forceUpdate(n => n + 1);
      } else if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className='auth__otp'>
      <div className='auth__otp--box'>
        <svg
          width='800px'
          height='800px'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
          id='secure'
          // class="icon glyph"
        >
          <path
            d='M19.42,3.83,12.24,2h0A.67.67,0,0,0,12,2a.67.67,0,0,0-.2,0h0L4.58,3.83A2,2,0,0,0,3.07,5.92l.42,5.51a12,12,0,0,0,7.24,10.11l.88.38h0a.91.91,0,0,0,.7,0h0l.88-.38a12,12,0,0,0,7.24-10.11l.42-5.51A2,2,0,0,0,19.42,3.83ZM15.71,9.71l-4,4a1,1,0,0,1-1.42,0l-2-2a1,1,0,0,1,1.42-1.42L11,11.59l3.29-3.3a1,1,0,0,1,1.42,1.42Z'
            // style="fill:#231f20"
          ></path>
        </svg>
        <h1>{t('common.otp-title')}</h1>
      </div>
      <div className='auth__otp--inputs'>
        {otp.map((el, index) => (
          <input
            key={index}
            type={'tel'}
            value={el}
            onChange={e => handleChange(e, index)}
            onFocus={e => {
              e.target.select();
              document.body.style.transform = 'scale(1.0)';
            }}
            onPointerOut={() => (document.body.style.transform = 'scale(1.0)')}
            maxLength={1}
            className={mistake ? 'underline' : ''}
          />
        ))}
      </div>
      {/* {lodingOtp && (
        <p>{`En cours de véfication du code entré. Veillez patienter s'il vous plait...`}</p>
      )} */}

      {successOtp && <p>{t('common.success-otp')}</p>}
      {/* {done && <p>{`Un nouveau code a été envoyé avec success`}</p>} */}

      {/* <button
        disabled={countRef.current > 0 ? true : false}
        className='text'
        onClick={resend}
      >
        {countRef.current > 0
          ? `Vous pourrez demander un nouveau code après: ${countRef.current}s`
          : 'Recevoir un nouveau code'}
      </button> */}

      <button
        disabled={lodingOtp}
        style={!disable ? { backgroundColor: 'rgba(97, 131, 245, .5)' } : {}}
        onClick={sendOtp}
      >
        {lodingOtp ? t('common.loading-login') : t('common.confirm-btn')}
      </button>
    </div>
  );
};

export default Otp;
