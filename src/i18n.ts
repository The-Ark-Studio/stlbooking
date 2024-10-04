import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

const locales = ['en', 'ko'];

export default getRequestConfig(async ({locale}) => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.

  if (!locales.includes(locale as any)) notFound();
  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
