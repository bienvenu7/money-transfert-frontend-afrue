import Otp from '@/components/auth/Otp';
import { useAuthentication } from '@/hooks/useAuthentication';
// import { useGetCountries } from '@/hooks/useCountry';
import { errorMessage } from '@/utils/notification';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
// import { errorMessage, successMessage } from '../utils/notification';

type Props = {
  pageName: string;
  // countries: ICountry[] | null;
};

const Form = ({ pageName }: Props) => {
  // const { isLoading } = useGetCountries();
  const [email, setEmail] = useState<string>('');
  const [password, setPasword] = useState<string>('');
  // const [confirmPassword, setConfirmPassword] = useState<string>('');
  // const [name, setName] = useState('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  // const [confirmError, setConfirmError] = useState<boolean>(false);
  const [checking, setChecking] = useState<boolean>(false);
  // const [country, setCountry] = useState<string>('');
  // const [genre, setGenre] = useState<'Homme' | 'Femme' | ''>('');
  // const [countryError, setCountryError] = useState<boolean>(false);
  // const [genreError, setGenreError] = useState<boolean>(false);
  // const [nameError, setNameError] = useState<boolean>(false);
  // const [loading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { isLogin, postLogin } = useAuthentication(email, password);

  // const submit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   setConfirmError(false);
  //   setCountryError(false);
  //   setEmailError('');
  //   setNameError(false);
  //   setPasswordError('');
  //   setGenreError(false);

  //   if (name === '' || name.length <= 3) {
  //     setNameError(true);
  //   } else if (country === '') {
  //     setCountryError(true);
  //   } else if (genre === '') {
  //     setGenreError(true);
  //   } else if (email === '') {
  //     setEmailError('Veillez entrer un mail valide!');
  //   } else if (password.length < 8 || !isValidPassword(password)) {
  //     setPasswordError(
  //       'Votre mot de passe doit contenir au moins:<br/>*une lettre majiscule<br/>*une lettre miniscule<br/>*un chiffre'
  //     );
  //   } else if (confirmPassword !== password) {
  //     setConfirmError(true);
  //   } else {
  //     //handling registration with the server👇🏽
  //     await register(email, password, name, country, genre)
  //       .then(el => {
  //         if (el.statusCode === 201) {
  //           setConfirmError(false);
  //           setConfirmPassword('');
  //           setEmail('');
  //           setEmailError('');
  //           setPasswordError('');
  //           setPasword('');
  //           // successMessage(el.message);
  //           setNameError(false);
  //           setCountryError(false);
  //           setGenreError(false);
  //         } else if (el.statusCode === 400) {
  //           const obj = el as IBadResquestErrorData;
  //           obj.data?.map(x => {
  //             if (x.message.split(':')[0].includes('email')) {
  //               setEmailError(x.message.split(':')[1]);
  //             } else if (x.message.split(':')[0].includes('password')) {
  //               setPasswordError(x.message.split(':')[1]);
  //             } else if (x.message.split(':')[0].includes('fullName')) {
  //               setNameError(true);
  //             } else if (x.message.split(':')[0].includes('countryId')) {
  //               setCountryError(true);
  //             }
  //           });
  //         } else {
  //           const obj = el as IBaseErrorData;
  //           console.log(obj);
  //           errorMessage(obj.message);
  //         }
  //       })
  //       .catch(error => console.error(error));
  //   }
  // };

  const submitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setEmailError('');
    setPasswordError('');

    if (password.length < 8) {
      return setPasswordError(t('common.password-error'));
    } else if (!email.includes('@')) {
      return setEmailError(t('common.email-error'));
    } else {
      postLogin()
        .then(() => setChecking(true))
        .catch(() => {
          errorMessage(t('common.error-message-login'));
          setPasword('');
        });
    }
  };

  const { t } = useTranslation();

  // const genders = ['Homme', 'Femme'];

  return (
    <>
      {!checking ? (
        <form
          onSubmit={event => submitLogin(event)}
          className='form__container'
        >
          <h1 className='title'>
            {pageName === 'Se connecter'
              ? t('common.login')
              : t('common.register')}
          </h1>
          <div className='form__inputs'>
            {/* {pageName === "S'enregistrer" && (
            <>
              <div className='form__input'>
                <label htmlFor='username'>Nom Prénom</label>
                <input
                  id='username'
                  onChange={e => setName(e.target.value)}
                  value={name}
                  type={'text'}
                  placeholder='Votre nom et prénom(s)'
                  className={nameError ? 'underline' : ''}
                />
                {nameError && (
                  <p>Veillez entrer votre nom et votre prénom!</p>
                )}
              </div>
              <div className='form__input'>
                <label htmlFor='country'>Pays de residence</label>
                <select
                  className={countryError ? 'underline' : ''}
                  onChange={el => setCountry(el.target.value)}
                  defaultValue=''
                  id='country'
                  disabled={isLoading}
                >
                  <option value=''>
                    {isLoading
                      ? 'Chargement des localités...'
                      : 'Sélectionez votre localité'}
                  </option>
                  {countries?.map(el => (
                    <option value={el.id} key={el.id}>
                      {el.pubicName}
                    </option>
                  ))}
                </select>
              </div>
              <div className='form__input'>
                <label htmlFor='country'>Genre</label>
                <select
                  className={genreError ? 'underline' : ''}
                  onChange={el => setGenre(el.target.value as any)}
                  defaultValue=''
                  id='country'
                >
                  <option value=''>Sélectionez votre genre</option>
                  {genders.map((el, index) => (
                    <option value={el} key={index}>
                      {el}
                    </option>
                  ))}
                </select>
                {genreError && <p>Veillez sélectioner votre genre!</p>}
              </div>
            </>
          )} */}
            <div className='form__input'>
              <label htmlFor='email'>{t('common.emailLabel')}</label>
              <input
                id='email'
                onChange={e => setEmail(e.target.value)}
                type={'email'}
                placeholder='JohnDoe@mail.com'
                value={email}
                className={emailError !== '' ? 'underline' : ''}
              />
              {emailError !== '' && <p>{emailError}</p>}
            </div>
            <div className='form__input'>
              <label htmlFor='password'>{t('common.passwordLabel')}</label>
              <input
                id='password'
                onChange={e => setPasword(e.target.value)}
                type={!showPassword ? 'password' : 'text'}
                placeholder={t('common.passwordPlaceholder')}
                value={password}
                className={passwordError !== '' ? 'underline' : ''}
              ></input>
              <button
                onClick={() => setShowPassword(!showPassword)}
                type={'button'}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
              {passwordError !== '' && (
                <p dangerouslySetInnerHTML={{ __html: passwordError }} />
              )}
            </div>
            {/* {pageName === "S'enregistrer" && (
            <div className='form__input'>
              <label htmlFor='confirm'>Confirmer le mot de passe</label>
              <input
                id='confirm'
                onChange={e => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                type={'password'}
                placeholder='Confirmer le mot de passe'
                className={confirmError ? 'underline' : ''}
              />
              {confirmError && (
                <p>Veillez saisir le même mot de passe une seconde fois!</p>
              )}
            </div>
          )} */}
            {isLogin && (
              <p style={{ color: '#5063bf' }}>{t('common.loading-login2')}</p>
            )}
            {pageName === 'Se connecter' && (
              <a href={'/auth/recovery'}>{t('common.forgotPassword')}</a>
            )}

            <button disabled={isLogin} type={'submit'}>
              {isLogin
                ? t('common.loading-login')
                : pageName === "S'enregistrer"
                  ? t('common.register')
                  : t('common.login')}
            </button>
            {pageName === 'Se connecter' && (
              <p>
                {t('common.noAccount')}{' '}
                <a href={'/auth/register'}>{t('common.register')}</a>
              </p>
            )}
            {/* {pageName === "S'enregistrer" ? (
            <>
              <p>
                Déja enregistrer?{' '}
                <Link href={'/auth/login'}>Se connecter</Link>
              </p>
              <p className='second'>
                En vous inscrivant, vous acceptez nos{' '}
                <Link href={'/'}>
                  {
                    "conditions d'utilisation et notre politique de confidentialité."
                  }
                </Link>
              </p>
            </>
          ) : (
            <></>
          )} */}
          </div>
        </form>
      ) : (
        <Otp email={email} />
      )}
    </>
  );
};

export default Form;
