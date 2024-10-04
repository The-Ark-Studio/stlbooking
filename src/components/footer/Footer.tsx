'use client';
import React from 'react';
import {Space, Divider, List, Typography} from 'antd';
import {
  FacebookOutlined,
  HomeOutlined,
  InstagramOutlined,
  MailOutlined,
  MessageOutlined,
  PhoneOutlined,
  TikTokOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import Colors from '@constants/Colors';
import {EmailField} from '@refinedev/antd';
import {useMediaQuery} from 'react-responsive';

const Footer = () => {
  const {Item} = List;
  const {Link, Text} = Typography;
  const isMobile = useMediaQuery({query: '(max-width: 576px)'});
  const isTablet = useMediaQuery({query: '(max-width: 1023px)'});

  return (
    <SpaceWrap style={{maxHeight: isTablet ? 800 : 345}}>
      <Space
        style={{display: 'flex', alignItems: 'baseline', flexWrap: 'wrap'}}
      >
        {/* Left */}
        <Space>
          <ListItemStyle
            style={{padding: isTablet ? '20px 10px' : '40px 20px'}}
            align="start"
          >
            <ItemStyled style={{marginLeft: 0}}>
              <Text>CONTACT</Text>
            </ItemStyled>
            <ItemStyled>
              <MailOutlined />
              <EmailField value="support@stl.sg" />
            </ItemStyled>
            <ItemStyled>
              <PhoneOutlined />
              <Link href="tel:+84 901 820 196 ">+84 901 820 196</Link>
            </ItemStyled>
            <ItemStyled>
              <HomeOutlined />
              <Text>
                95 Võ Thị Sáu street, Ward 6, District 3, Hồ Chí Minh 70000,
                Việt Nam
              </Text>
            </ItemStyled>
          </ListItemStyle>
        </Space>
        {/* center */}
        <Space>
          <ListItemStyle
            style={{padding: isTablet ? '20px 10px' : '40px 20px'}}
            align="start"
          >
            <ItemStyled style={{marginLeft: 0}}>
              <Text>TRAVEL BOOK</Text>
            </ItemStyled>
            <ItemStyled>
              <MailOutlined />
              <EmailField value="kpglee44@naver.com" />
            </ItemStyled>
            <ItemStyled>
              <PhoneOutlined />
              <Link href="tel:01067352180">01067352180 (KR)</Link>
            </ItemStyled>
            <ItemStyled>
              <MessageOutlined />
              <Text>kakaotalk ID: kpglee44</Text>
            </ItemStyled>
          </ListItemStyle>
        </Space>

        {/* right */}
        <Space style={{marginLeft: isTablet ? 0 : '40px'}}>
          <ListItemStyle
            style={{padding: isTablet ? '20px 10px' : '40px 20px'}}
            align="start"
          >
            <ItemStyled style={{marginLeft: 0}}>
              <Text>STAY IN TOUCH</Text>
            </ItemStyled>
            <SocialListIconStyle>
              <Link
                href="https://www.facebook.com/saigontravellounge/"
                target="_blank"
              >
                <FacebookOutlined />
              </Link>

              <Link
                href="https://www.instagram.com/saigontravellounge/"
                target="_blank"
              >
                <InstagramOutlined />
              </Link>

              <Link
                href="https://www.tiktok.com/@saigontravellounge"
                target="_blank"
              >
                <TikTokOutlined />
              </Link>
            </SocialListIconStyle>
          </ListItemStyle>
        </Space>
      </Space>
      <Divider style={{borderBlockColor: Colors.neutral400}} />
      <Space
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
          textAlign: 'center',
        }}
      >
        <Text style={{lineHeight: isMobile ? '18px' : '36px'}}>
          © 2024 Develop by The Ark Studio - Manage by STL Company
        </Text>
      </Space>
    </SpaceWrap>
  );
};

const SpaceWrap = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 345px;
  margin: 0 -30px;
  padding: 0 60px;
  background-color: ${Colors.neutral900};
  span {
    color: ${Colors.white};
  }
`;
const ListItemStyle = styled(Space)`
  list-style: none;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  /* padding: 40px 20px 40px 20px; */
`;

const ItemStyled = styled(List.Item)`
  display: flex;
  align-items: center;
  span.ant-typography,
  a {
    margin-left: 10px;
  }
  a {
    display: inline-block;
    line-height: 24px;
    color: ${Colors.white};
  }
`;

const SocialListIconStyle = styled(List.Item)`
  display: flex;
  align-items: center;
  column-gap: 20px;
  margin-top: 20px;
  width: 100%;

  a {
    display: inline-block;
  }
  a span {
    font-size: 32px;
  }
  a span:hover {
    transform: scale(1.2);
    transition: all 0.5s ease-in-out;
  }
`;

export default Footer;
