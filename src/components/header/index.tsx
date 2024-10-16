'use client';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState, useTransition } from 'react';
import { ReactComponent as KrFlag } from '../../../public/images/countryFlags/krFlag.svg';
import { ReactComponent as EnFlag } from '../../../public/images/countryFlags/enFlag.svg';
import ButtonCustom from '@components/buttonCustom/ButtonCustom';
import { Space, Typography, Menu, Drawer, Select } from 'antd';
import Image from 'next/image';
import styled from 'styled-components';
import Logo from '../../../public/images/logo/logo.png';
import LanguageIcon from '../../../public/images/Language.png';
import {
  ClockCircleOutlined,
  ClockCircleTwoTone,
  CloseOutlined,
  DownOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import Colors from '@constants/Colors';
import type { MenuProps } from 'antd';
import { useRouter } from 'next/navigation';

import { useMediaQuery } from 'react-responsive';

type MenuItem = Required<MenuProps>['items'][number];

const Header = () => {
  const t = useTranslations('header');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();
  const [openSideBar, setOpenSideBar] = useState(false);

  const [current, setCurrent] = useState('');
  const [showHeader, setShowHeader] = useState(false);

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1023px)' });

  const localNavigate = useLocale() === 'ko' ? 'ko' : '';
  const domainURL = 'https://stl.sg';

  const items: MenuItem[] = [
    {
      label: `${t('Nav.intro')}`,
      key: 'introduce',
      icon: <DownOutlined />,
      children: [
        {
          key: 'about1',
          label: `${t('Nav.about')}`,
          onClick: () => {
            window.location.href = `${domainURL}/${localNavigate}/about-us/`; // Domain about-us
          },
        },
      ],
      onTitleClick: () => {
        window.location.href = `${domainURL}/${localNavigate}/`; // Domain home
      },
    },
    {
      label: `${t('Nav.service')}`,
      key: 'service',
      icon: <DownOutlined />,
      children: [
        {
          key: 'facility',
          label: `${t('Nav.facility')}`,
          onClick: () =>
            (window.location.href = `${domainURL}/${localNavigate}/facility-overview/`),
        },
        {
          key: 'faqs',
          label: `${t('Nav.faqs')}`,
          onClick: () => {
            window.location.href = `${domainURL}/${localNavigate}/faqs/`; // Domain faqs
          },
          disabled: false,
        },
        {
          key: 'contact',
          label: `${t('Nav.contact')}`,
          onClick: () => {
            window.location.href = `${domainURL}/${localNavigate}/contact/`; // Domain contact
          },
          disabled: false,
        },
        {
          key: 'partnership',
          label: `${t('Nav.partnerShip')}`,
          onClick: () => {
            window.location.href = `${domainURL}/${localNavigate}/elementor-page-4428/stl-partnership/`; // Domain partnership
          },
          disabled: false,
        },
      ],
      onTitleClick: () => {
        // window.location.href = `${domainURL}/${localNavigate}/service/`; // Domain service
      },
    },
    {
      label: `${t('Nav.gallery')}`,
      key: 'gallery',
      onClick: () => {
        window.location.href = `${domainURL}/${localNavigate}/gallery/`; // Domain gallery
      },
    },
  ];

  const showSideBar = () => {
    setOpenSideBar(true);
  };

  const onCloseSideBar = () => {
    setOpenSideBar(false);
  };

  const [collapsed, setCollapsed] = useState(false);

  // const toggleCollapsed = () => {
  //   setCollapsed(!collapsed);
  // };

  const handleChangeLanguage = (value: string) => {
    console.log(`selected ${value}`);
    const nextLocale = value;
    startTransition(() => {
      router.replace(`/${nextLocale}`);
    });
  };

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  // for suggested from NextJS. Warning: Portal rendering.
  useEffect(() => {
    setShowHeader(true);
  }, []);

  return (
    <HeaderWrap id="header" style={{ paddingBottom: '10px' }}>
      <SpaceWrap>
        <Space>
          <Space>
            <a href="https://stl.sg" target="_blank" rel="noopener noreferrer">
              <Image src={Logo} width={132} height={128} alt="Logo" />
            </a>
          </Space>

          <Space
            id="main-navbar"
            style={{ display: isTabletOrMobile ? 'none' : '' }}
          >
            <Space>
              <LanguageIconWrap>
                <Image
                  src={LanguageIcon}
                  width={42}
                  height={42}
                  alt="change langs"
                />
                {/* <LanguageTextStyle>English</LanguageTextStyle> */}
                <Select
                  defaultValue={localActive}
                  style={{ width: 100 }}
                  onChange={handleChangeLanguage}
                  options={[
                    { value: 'en', label: 'English' },
                    { value: 'ko', label: 'Korean' },
                  ]}
                  disabled={isPending}
                />
              </LanguageIconWrap>

              <MenuWrapStyle>
                {showHeader && (
                  <Menu
                    onClick={onClick}
                    // selectedKeys={[current]}
                    mode="horizontal"
                    forceSubMenuRender
                    overflowedIndicator={false}
                    style={{ minWidth: '443px' }}
                    items={items}
                  />
                )}
              </MenuWrapStyle>
            </Space>
          </Space>
        </Space>

        {/* opening hours */}
        <Space style={{ padding: '40px 0' }}>
          <ClockCircleOutlined />
          <div
            style={{
              fontSize: isTabletOrMobile ? '16px' : '18px',
              color: Colors.neutral600,
            }}
          >
            {t('opening_hours')}
          </div>
        </Space>
        <div
          style={{
            display: isTabletOrMobile ? 'flex' : 'block',
            alignItems: 'center',
          }}
        >
          {/* <ButtonCustom
            style={{maxWidth: '253px', width: '125px', height: '40px'}}
            type="primary"
          >
            {t('booking_button')}
          </ButtonCustom> */}

          {/* Mobile */}
          <div id="mobile-menu" style={{ marginLeft: 10 }}>
            <ButtonCustom onClick={showSideBar}>
              {openSideBar ? <CloseOutlined /> : <MenuOutlined />}
            </ButtonCustom>
            <DrawerStyled
              title={
                <div className="close-in-sideBar">
                  <ButtonCustom onClick={onCloseSideBar}>
                    <CloseOutlined />
                  </ButtonCustom>
                </div>
              }
              placement="left"
              closable={false}
              onClose={onCloseSideBar}
              open={openSideBar}
              width={290}
            >
              <div>
                <ListItemFlagsStyled>
                  <li
                    className="country-flag-item"
                    style={{
                      cursor: localActive === 'ko' ? 'not-allowed' : 'pointer',
                    }}
                    onClick={() => handleChangeLanguage('ko')}
                  >
                    <KrFlag />
                  </li>
                  <li
                    className="country-flag-item"
                    style={{
                      cursor: localActive === 'en' ? 'not-allowed' : 'pointer',
                    }}
                    onClick={() => handleChangeLanguage('en')}
                  >
                    <EnFlag />
                  </li>
                </ListItemFlagsStyled>
              </div>

              <MobileMenuWrapStyle>
                <Menu
                  className="mobile-menu"
                  onClick={onClick}
                  // selectedKeys={[current]}
                  mode="inline"
                  inlineCollapsed={collapsed}
                  forceSubMenuRender
                  overflowedIndicator={false}
                  items={items}
                />
              </MobileMenuWrapStyle>
            </DrawerStyled>
          </div>
        </div>
      </SpaceWrap>
    </HeaderWrap>
  );
};

const HeaderWrap = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${Colors.white};
  z-index: 100;
`;

const SpaceWrap = styled.div`
  max-width: 1260px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const LanguageIconWrap = styled(Space)`
  cursor: pointer;
`;
const LanguageTextStyle = styled(Typography)`
  font-size: 24px;
  line-height: 36px;
  font-weight: 400;
  color: ${Colors.neutral900};
`;
const MenuWrapStyle = styled(Space)`
  margin-left: 50px;
  ul.ant-menu {
    border-bottom: none;
  }
  .ant-menu-submenu-title {
    position: relative;
  }
  .anticon-down {
    position: absolute;
    right: -18px;
    top: 50%;
    bottom: 50%;
    transform: translateY(-50%);
    svg {
      width: 12px;
      height: 12px;
    }
  }
  .ant-menu-title-content {
    color: ${Colors.neutral600};
    font-weight: 400;
    font-size: 18px;
    margin-right: 4px;
  }
  .ant-menu-submenu-selected .ant-menu-title-content {
    color: ${Colors.primary500};
    font-weight: 700;
  }
`;

// Mobile styles
const DrawerStyled = styled(Drawer)`
  .close-in-sideBar {
    display: flex;
    justify-content: flex-end;
  }
  .close-in-sideBar button {
    box-shadow: inset;
    border: none;
  }
  .ant-drawer-body {
    padding-top: 16px;
    padding-left: 8px;
    padding-right: 8px;
  }
`;

const MobileMenuWrapStyle = styled.div`
  .mobile-menu {
    border-inline-end: none !important;
  }
  .mobile-menu .ant-menu-item-icon {
    display: none !important;
  }
`;

const ListItemFlagsStyled = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 0;

  .country-flag-item {
    display: flex;
    align-items: center;
    height: 40px;
    padding-left: 32px;
    cursor: pointer;
    border-bottom: 1px solid ${Colors.neutral200};
  }
  .country-flag-item:hover {
    background-color: ${Colors.listHover};
    border-radius: 8px;
  }
  .country-flag-item:first-child {
    /* margin-bottom: 10px; */
  }
  .country-flag-item svg {
    width: 40px;
    height: 20px;
  }
`;

const ClockCircleTwoToneIcon = styled(ClockCircleTwoTone)`
  svg {
    width: 24px;
    height: 24px;
  }
`;

export default Header;
