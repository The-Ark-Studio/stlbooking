'use client';
import {useEffect, useState} from 'react';
import ButtonCustom from '@components/buttonCustom/ButtonCustom';
import {Space, Typography} from 'antd';
import Image from 'next/image';
import styled from 'styled-components';
import Logo from '../../../public/images/logo/logo.png';
import LanguageIcon from '../../../public/images/Language.png';
import {DownOutlined} from '@ant-design/icons';
import Colors from '@constants/Colors';
import type {MenuProps} from 'antd';
import {Menu} from 'antd';
type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[] = [
  {
    label: 'Introduction',
    key: 'introduce',
    icon: <DownOutlined />,
    children: [{key: 'about1', label: 'About Us'}],
  },
  {
    label: 'Saigon Travel Lounge',
    key: 'travel-lounge',
    icon: <DownOutlined />,
    children: [
      {key: 'service1', label: 'Service'},
      {key: 'contact1', label: 'Contact'},
      {key: 'partnership1', label: 'Partnership'},
    ],
  },
];

const Header = () => {
  const [current, setCurrent] = useState('introduce');
  const [showHeader, setShowHeader] = useState(false);

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  // for suggested from NextJS. Warning: Portal rendering.
  useEffect(() => {
    setShowHeader(true);
  }, []);

  return (
    <HeaderWrap>
      <SpaceWrap>
        <Space>
          <Space>
            <Image src={Logo} width={112} height={128} alt="Logo" />
          </Space>
          <Space>
            <Space>
              <LanguageIconWrap>
                <Image
                  src={LanguageIcon}
                  width={42}
                  height={42}
                  alt="change langs"
                />
                <LanguageTextStyle>English</LanguageTextStyle>
              </LanguageIconWrap>

              <MenuWrapStyle>
                {showHeader && (
                  <Menu
                    onClick={onClick}
                    selectedKeys={[current]}
                    mode="horizontal"
                    forceSubMenuRender
                    overflowedIndicator={false}
                    style={{minWidth: '443px'}}
                    items={items}
                  />
                )}
              </MenuWrapStyle>
            </Space>
          </Space>
        </Space>
        <ButtonCustom
          style={{maxWidth: '253px', width: '125px', height: '40px'}}
          type="primary"
        >
          Book Now
        </ButtonCustom>
      </SpaceWrap>
    </HeaderWrap>
  );
};

const HeaderWrap = styled.div`
  width: 100%;
  background-color: ${Colors.white};
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

export default Header;
