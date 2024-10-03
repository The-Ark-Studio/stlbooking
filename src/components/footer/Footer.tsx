'use client';
import React from 'react';
import {Space, Divider, List, Typography} from 'antd';
import {
  FacebookOutlined,
  HomeOutlined,
  InstagramOutlined,
  MailOutlined,
  PhoneOutlined,
  TikTokOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import Colors from '@constants/Colors';
import {EmailField} from '@refinedev/antd';

const Footer = () => {
  const {Item} = List;
  const {Link, Text} = Typography;

  return (
    <SpaceWrap>
      <Space style={{display: 'flex', alignItems: 'baseline'}}>
        {/* Left */}
        <Space>
          <ListItemStyle align="start">
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
        {/* right */}
        <Space style={{marginLeft: '40px'}}>
          <ListItemStyle align="start">
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
        }}
      >
        <Text style={{lineHeight: '36px'}}>
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
  padding: 60px 20px 40px 20px;
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
