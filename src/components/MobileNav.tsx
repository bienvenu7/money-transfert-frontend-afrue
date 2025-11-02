import { useEffect, useRef, useState, type ReactElement } from 'react';

import HeaderData from '@/components/HeaderData';
import HeaderNoData from '@/components/HeaderNoData';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Svgs from '@/components/Svgs';
import { Auth } from '@/providers/AuthContext';
import { useTranslation } from 'react-i18next';
import { AiOutlineLogin } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';

export interface Ilinks {
  name: string;
  icon: ReactElement<any, any>;
  uri: string;
}

const links: Ilinks[] = [
  {
    name: 'Главная',
    uri: '/',
    icon: <Svgs name='home' />,
  },
  {
    name: 'Профиль',
    uri: '/profile',
    icon: <Svgs name='profile' />,
  },
  {
    icon: <Svgs name='h-t-d' />,
    name: 'Отправить',
    uri: '/send',
  },
  {
    icon: <Svgs name='h-t-d' />,
    name: 'Получить',
    uri: '/receive',
  },
  // {
  //   icon: <Svgs name="h-t-d" />,
  //   name: "Transaction",
  //   uri: "/transaction",
  // },
  {
    name: 'История',
    uri: '/historiques',
    icon: <Svgs name='history' />,
  },
];

const MobileNav = () => {
  const { state } = Auth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // const voyelles = ['e', 'a'];
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const [_, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window === 'undefined') return;

      if (window.scrollY <= lastScrollY) {
        // if scroll down hide the navbar
        setShow(false);
      } else {
        // if scroll up show the navbar
        setShow(true);
      }

      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', controlNavbar);

    // cleanup function
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const { pathname } = useLocation();

  return (
    <div
      className={`navbar__mobile--container ${pathname === '/auth/login' ? 'auth' : ''}`}
    >
      <div className='navbar__mobile--header'>
        <div
          className={`navbar__mobile--header__box ${pathname === '/auth/login' ? 'auth' : ''}`}
        >
          <div className='navbar__mobile--logo'>
            <img
              src={'/logo.png'}
              alt=''
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <ul className='navbar__mobile--list'>
            <a href='/#about'>{t('navigation.about')}</a>
            <a href='/#advantage'>{t('navigation.advantages')}</a>
            <a href=''>Конвертер</a>
            {/* <a href='/#faq'>Вопросы и ответы</a> */}
          </ul>
          <div className='navbar__mobile--btn'>
            <LanguageSwitcher />
            {state.user !== null ? (
              <div className='navbar__mobile--btn__avatar'>
                <img
                  src={`https://avatar.iran.liara.run/public/${
                    state.user?.gender === 'Femme' ? 'girl' : 'boy'
                  }?username=${state.user.fullName.split(' ')[0]}`}
                  alt={state.user.fullName}
                />
              </div>
            ) : (
              <button onClick={() => navigate('/auth/login')} className='login'>
                Se connecter
              </button>
            )}
            <button className='menu' onClick={() => setOpenMenu(true)}>
              <Svgs name='menu' />
            </button>
          </div>
        </div>
      </div>
      <div
        className={
          openMenu ? 'navbar__mobile--menu open' : 'navbar__mobile--menu'
        }
      >
        <div className='navbar__mobile--menu__wrapper'>
          <div ref={modalRef} className='navbar__mobile--menu__box'>
            <div className='navbar__mobile--menu__header'>
              {state.user ? (
                <HeaderData clientData={state.user} />
              ) : (
                <HeaderNoData />
              )}
            </div>
            <ul className='navbar__mobile--menu__links'>
              {links.map((el, index) => (
                <a onClick={() => setOpenMenu(false)} key={index} href={el.uri}>
                  {el.icon} <span>{el.name}</span>
                </a>
              ))}
            </ul>
            <a href='/auth/login'>
              <AiOutlineLogin /> <span>{t('common.login')}</span>
            </a>
          </div>
        </div>
      </div>
      <div className='navbar__mobile--phone'>
        <div className='navbar__mobile--phone__logo'>
          <img
            src={'/logo.png'}
            alt=''
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
        <button onClick={() => setOpenMenu(true)}>
          <Svgs name='menu' />
        </button>
      </div>
    </div>
  );
};

export default MobileNav;
