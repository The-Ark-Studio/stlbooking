'use client';
import React from 'react';
import MainLayout from '@components/mainLayout/MainLayout';
interface IHomePageProps {
  children: React.ReactNode;
}
const HomePage = ({ children }: IHomePageProps) => {
  return <MainLayout>{children}</MainLayout>;
};

export default HomePage;
