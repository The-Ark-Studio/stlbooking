'use client';
import React from 'react';
import Header from '@components/header';
import styled from 'styled-components';
import Footer from '@components/footer/Footer';
import Colors from '@constants/Colors';

interface IMainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({children}: IMainLayoutProps) => {
  return (
    <SpaceWrap>
      <Header />
      <Content id="body-content">{children}</Content>
      <Footer />
    </SpaceWrap>
  );
};

const SpaceWrap = styled.div`
  width: 100%;
  background-color: ${Colors.white};
`;

const Content = styled.div`
  max-width: 1260px;
  margin: 0 auto;
  .full-width {
    width: 100vw;
    margin-left: calc(-50vw + 50%); /* Align full-width content correctly */
    max-width: 1900px;
  }
`;

export default MainLayout;
