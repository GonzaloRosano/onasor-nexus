import { useTranslation } from 'react-i18next';

export const Home = () => {
  const { t } = useTranslation('global');

  return (
    <main className="text-white/90 container mx-auto  px-4 py-8">
      <p className="mt-4 text-lg">{t('home.first-paragraph')}</p>
    </main>
  );
};
