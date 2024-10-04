'use client';

/**
 * Now We just don't use Login so we don't need this Authenticated.
 * and not have any special components to handle user authentication.
 */
import {Suspense} from 'react';
// import {Authenticated} from '@refinedev/core';
// import {NavigateToResource} from '@refinedev/nextjs-router';
import HomePage from '@app/home/page';
import MainLayout from '@components/mainLayout/MainLayout';
import BookNowScreen from '@app/book-now/page';

export default function IndexPage() {
  return (
    <Suspense>
      <MainLayout>
        <BookNowScreen />
      </MainLayout>
      {/* <Authenticated key="home-page">
        <NavigateToResource />
      </Authenticated> */}
    </Suspense>
  );
}
