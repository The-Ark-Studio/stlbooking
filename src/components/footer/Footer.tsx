'use client';
import React from 'react';
import { Space, Divider, List, Typography } from 'antd';
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
import { EmailField } from '@refinedev/antd';
import { useMediaQuery } from 'react-responsive';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('footer');
  const { Item } = List;
  const { Link, Text } = Typography;
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const isTablet = useMediaQuery({ query: '(max-width: 1023px)' });

  return (
    <FooterWrapStyled>
      <SpaceWrap style={{ maxHeight: isTablet ? 800 : 345 }}>
        <Space
          style={{
            display: 'flex',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            columnGap: 40,
          }}
        >
          {/* Left */}
          <Space>
            <ListItemStyle
              style={{ padding: isTablet ? '20px 10px' : '40px 0' }}
              align="start"
            >
              <ItemStyled style={{ marginLeft: 0 }}>
                <Text>{t('contact.title')}</Text>
              </ItemStyled>
              <ItemStyled>
                <MailOutlined />
                <EmailField value={t('contact.email')} />
              </ItemStyled>
              <ItemStyled>
                <PhoneOutlined />
                <Link href={"tel: " + t('contact.phone')}>{t('contact.phone')}</Link>
              </ItemStyled>
              <ItemStyled>
                <HomeOutlined />
                <Text>
                  {t('contact.address')}
                </Text>
              </ItemStyled>
              <ItemStyled>
                <Link href={t('contact.check_map.link')} target="_blank" rel="noopener noreferrer">
                  <u>
                    {t('contact.check_map.title')}
                  </u>
                </Link>
              </ItemStyled>
            </ListItemStyle>
          </Space>
          {/* center */}
          <Space>
            <ListItemStyle
              style={{ padding: isTablet ? '20px 10px' : '40px 0' }}
              align="start"
            >
              <ItemStyled style={{ marginLeft: 0 }}>
                <Text>{t('travel_booking.title')}</Text>
              </ItemStyled>
              <ItemStyled>
                <MailOutlined />
                <EmailField value={t('travel_booking.email')} />
              </ItemStyled>
              <ItemStyled>
                <PhoneOutlined />
                <Link href={"tel: " + t('travel_booking.phone')}>{t('travel_booking.phone')}</Link>
              </ItemStyled>
              <ItemStyled>
                <MessageOutlined />
                <Text>{t('travel_booking.kakao')}</Text>
              </ItemStyled>
            </ListItemStyle>
          </Space>

          {/* right */}
          <Space style={{ marginLeft: isTablet ? 0 : '40px' }}>
            <ListItemStyle
              style={{ padding: isTablet ? '20px 10px' : '40px 0' }}
              align="start"
            >
              <ItemStyled style={{ marginLeft: 0 }}>
                <Text>{t('stay_in_touch.title')}</Text>
              </ItemStyled>
              <SocialListIconStyle>
                <Link
                  href={t('stay_in_touch.facebook')}
                  target="_blank"
                >
                  <FacebookOutlined />
                </Link>

                <Link
                  href={t('stay_in_touch.instagram')}
                  target="_blank"
                >
                  <InstagramOutlined />
                </Link>

                <Link
                  href={t('stay_in_touch.tiktok')}
                  target="_blank"
                >
                  <TikTokOutlined />
                </Link>
              </SocialListIconStyle>
            </ListItemStyle>
          </Space>
        </Space>
        <Divider style={{ borderBlockColor: Colors.neutral400 }} />
        <Space
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          <Text style={{ lineHeight: isMobile ? '18px' : '36px' }}>
            © 2024 Developed by The Ark Studio - Manage by STL Company
          </Text>
        </Space>
      </SpaceWrap>
    </FooterWrapStyled>
  );
};

const FooterWrapStyled = styled.div`
  display: flex;
  justify-content: center;
  max-width: 100vw;
  width: 100vw;
  background-color: ${Colors.neutral900};
`;

const SpaceWrap = styled.div`
  max-width: 1260px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  max-height: 345px;

  span {
    color: ${Colors.white};
  }
`;
const ListItemStyle = styled(Space)`
  list-style: none;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
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
  a.ant-typography {
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
