import { t } from 'i18next';

export const Home = () => {
  return (
    <main className="text-white/90 container mx-auto  px-4 py-8">
      <p className="mt-4 text-lg">{t('home.first-paragraph')}</p>
    </main>
  );
};
