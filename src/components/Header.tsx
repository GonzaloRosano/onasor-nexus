import i18n from 'i18next';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const { t } = useTranslation('global');
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null); // Ref para el botón

  const routes = [
    { name: t('header.home'), path: '/' },
    { name: t('header.members'), path: '/members' },
  ];

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('i18nextLng', lang);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  return (
    <>
      <div className="h-16 sm:h-14  w-screen"></div>
      <header className="flex fixed top-0 w-full h-16 sm:h-14 justify-between px-4 sm:px-6 text-white items-center bg-black/55 shadow-md z-50">
        <h1 className="text-xl sm:text-2xl font-semibold">Onasor Nexus</h1>
        <div className="sm:hidden">
          <button
            ref={buttonRef} // Asigna el ref al botón
            onClick={() => setMenuOpen(!menuOpen)}
            className={`text-white focus:outline-none transition-transform duration-300 ${
              menuOpen ? 'transform rotate-90' : ''
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <nav className="hidden sm:flex flex-1 justify-center">
          <ul className="flex gap-6">
            {routes.map((route) => (
              <li key={route.path} className="relative">
                <Link
                  to={route.path}
                  className={`text-white transition-all duration-300 hover:text-red-500 ${
                    location.pathname === route.path ? 'text-red-500' : ''
                  }`}
                >
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden sm:flex gap-4 items-center">
          <div className="flex gap-4">
            <span
              className={`cursor-pointer text-lg font-medium ${
                i18n.language === 'es'
                  ? 'text-red-500'
                  : 'text-gray-400 hover:text-red-500'
              }`}
              onClick={() => changeLanguage('es')}
            >
              Español
            </span>
            <span
              className={`cursor-pointer text-lg font-medium ${
                i18n.language === 'en'
                  ? 'text-red-500'
                  : 'text-gray-400 hover:text-red-500'
              }`}
              onClick={() => changeLanguage('en')}
            >
              English
            </span>
          </div>
          <a
            href="#"
            className="flex text-white justify-center transition-all duration-300 hover:text-red-500 border-2 hover:border-red-500 px-4 py-1 w-full sm:w-auto sm:min-w-[130px]"
          >
            {t('header.login')}
          </a>
        </div>
      </header>
      <div
        ref={menuRef}
        className={`sm:hidden flex flex-col items-center bg-black/95 text-white text-lg p-4 absolute w-full left-0 top-16 z-40 shadow-lg transform transition-all duration-300 ease-in-out ${
          menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <nav>
          <ul className="flex flex-col gap-4 items-center">
            {routes.map((route) => (
              <li key={route.path} className="relative">
                <Link
                  to={route.path}
                  className={`transition-all duration-300 hover:text-red-500 ${
                    location.pathname === route.path ? 'text-red-500' : ''
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <br />

        <div className="mt-4 flex gap-4 justify-center">
          <span
            className={`cursor-pointer font-normal ${
              i18n.language === 'es'
                ? 'text-red-500 font-medium'
                : 'text-gray-400 hover:text-red-500'
            }`}
            onClick={() => changeLanguage('es')}
          >
            Español
          </span>
          <span
            className={`cursor-pointer font-normal ${
              i18n.language === 'en'
                ? 'text-red-500 font-medium'
                : 'text-gray-400 hover:text-red-500'
            }`}
            onClick={() => changeLanguage('en')}
          >
            English
          </span>
        </div>
        <a
          href="#"
          className="text-white justify-center transition-all duration-300 hover:text-red-500 border-2 hover:border-red-500 px-4 py-2 mt-4 text-center w-full"
          onClick={() => setMenuOpen(false)}
        >
          {t('header.login')}
        </a>
      </div>
    </>
  );
};

export default Header;
