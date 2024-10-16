import { DevtoolsProvider } from '@providers/devtools';
import { useNotificationProvider } from '@refinedev/antd';
import { Refine } from '@refinedev/core';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';
// import routerProvider from '@refinedev/nextjs-router';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import React, { Suspense } from 'react';
import { Roboto } from 'next/font/google';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { AppIcon } from '@components/app-icon';
import { ColorModeContextProvider } from '@contexts/color-mode';
// import {authProvider} from '@providers/auth-provider';
import { dataProvider } from '@providers/data-provider';
import '@refinedev/antd/dist/reset.css';
import { ConfigProvider } from 'antd';
import antdTheme from '@configs/antdTheme';
import './global.css';
import Favicon from '../../../public/images/logo/logo.png';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const robotoFont = Roboto({
  subsets: ['latin'],
  weight: '100',
});

export const metadata: Metadata = {
  title: 'Booking - STL',
  description: 'Generated by create refine app',
  icons: [{ rel: 'icon', url: Favicon.src }],
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  const cookieStore = cookies();
  const theme = cookieStore.get('theme');
  const defaultMode = theme?.value === 'dark' ? 'dark' : 'light';
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <Suspense>
          <RefineKbarProvider>
            <NextIntlClientProvider messages={messages}>
              <AntdRegistry>
                <ConfigProvider theme={antdTheme}>
                  <ColorModeContextProvider defaultMode={defaultMode}>
                    <DevtoolsProvider>
                      <Refine
                        // routerProvider={routerProvider}
                        // authProvider={authProvider}
                        dataProvider={dataProvider}
                        notificationProvider={useNotificationProvider}
                        resources={[
                          {
                            name: 'home',
                            // list: '/blog-posts',
                            // create: '/blog-posts/create',
                            // edit: '/blog-posts/edit/:id',
                            // show: '/blog-posts/show/:id',
                            // meta: {
                            //   canDelete: true,
                            // },
                          },
                          // {
                          //   name: 'blog-posts',
                          //   list: '/blog-posts',
                          //   create: '/blog-posts/create',
                          //   edit: '/blog-posts/edit/:id',
                          //   show: '/blog-posts/show/:id',
                          //   meta: {
                          //     canDelete: true,
                          //   },
                          // },
                          // {
                          //   name: 'categories',
                          //   list: '/categories',
                          //   create: '/categories/create',
                          //   edit: '/categories/edit/:id',
                          //   show: '/categories/show/:id',
                          //   meta: {
                          //     canDelete: true,
                          //   },
                          // },
                        ]}
                        options={{
                          syncWithLocation: true,
                          warnWhenUnsavedChanges: true,
                          useNewQueryKeys: true,
                          projectId: 'k3NvGV-qBcRmD-kZ9nGr',
                          title: { text: 'Refine Project', icon: <AppIcon /> },
                        }}
                      >
                        {children}
                        <RefineKbar />
                      </Refine>
                    </DevtoolsProvider>
                  </ColorModeContextProvider>
                </ConfigProvider>
              </AntdRegistry>
            </NextIntlClientProvider>
          </RefineKbarProvider>
        </Suspense>
      </body>
    </html>
  );
}
