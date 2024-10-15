'use client';
import React, {useEffect, useState} from 'react';
import Banner from '@components/banner/Banner';
import ImageBanner from '../../../../public/images/ImageBanner.jpg';
import {Image, Typography, Table} from 'antd';
import styled from 'styled-components';
import BannerBooking from '../../../../public/images/bookNow/_ONY9838.jpg';
import BookNow1 from '../../../../public/images/bookNow/_ONY9849.jpg';
import BookNow2 from '../../../../public/images/bookNow/_ONY9861.jpg';
import BookNow3 from '../../../../public/images/bookNow/_ONY9865.jpg';
import BookNow4 from '../../../../public/images/bookNow/_ONY9867.jpg';
import BookNow5 from '../../../../public/images/bookNow/_ONY9872.jpg';
import {
  basePriceRangeDataMock,
  extraHours as extraHoursMock,
} from '@app/[locale]/book-now/partials/dataMock';

import {type TableProps} from 'antd';
import ButtonCustom from '@components/buttonCustom/ButtonCustom';
import Colors from '@constants/Colors';
import BookingFormModal from '@app/[locale]/book-now/partials/bookingModal/BookingModal';
import {IBasePriceRange, IExtraHours} from '@interfaces/booking/booking';
import SuccessModal from '@app/[locale]/book-now/partials/successModal/SuccessModal';

const {Text} = Typography;
import {useMediaQuery} from 'react-responsive';
import {useTranslations} from 'next-intl';
import WorkingHoursModal from '@app/[locale]/book-now/partials/bookingModal/WorkingHoursModal';

const BookNowScreen = () => {
  const t = useTranslations('BookingScreen');
  const [isOpenBookingModal, setIsOpenBookingModal] = useState(false);
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);
  const [showOpeningHourModal, setShowOpeningHourModal] = useState(false);

  useEffect(() => {
    setShowOpeningHourModal(true);
  }, []);

  const isMobile = useMediaQuery({query: '(max-width: 576px)'});
  // const isTabletOrMobile = useMediaQuery({query: '(max-width: 1023px)'});

  const [basePriceRangeData, setBasePriceRangeData] = useState<
    IBasePriceRange[]
  >([]);

  const [extraHours, setExtraHours] = useState<IExtraHours[]>([]);

  const columns: TableProps<IBasePriceRange>['columns'] = [
    {
      title: `${t('base_price_range_table.adult_column_header')}`,
      dataIndex: 'adultPrice',
      align: 'center',
    },
    {
      title: `${t('base_price_range_table.children_column_header')}`,
      dataIndex: 'childrenPrice',
      align: 'center',
    },
    {
      title: `${t('base_price_range_table.babies_column_header')}`,
      dataIndex: 'underPrice',
      align: 'center',
      render: () => (
        <Text>{t('base_price_range_table.babies_column_row_cell')}</Text>
      ),
    },
  ];

  const columnsExtraHours: TableProps<IExtraHours>['columns'] = [
    {
      title: `${t('extra_services_table.fiveHours_column_header')}`,
      dataIndex: 'fiveHours',
      align: 'center',
      render: () => <Text>{t('extra_services_table.fiveHours_row_cell')}</Text>,
    },
    {
      title: `${t('extra_services_table.sevenHours_column_header')}`,
      dataIndex: 'sevenHours',
      align: 'center',
      render: () => (
        <Text>{t('extra_services_table.sevenHours_row_cell')}</Text>
      ),
    },
    {
      title: `${t('extra_services_table.nineHours_column_header')}`,
      dataIndex: 'nineHours',
      align: 'center',
      render: () => <Text>{t('extra_services_table.nineHours_row_cell')}</Text>,
    },
    {
      title: `${t('extra_services_table.elevenHours_column_header')}`,
      dataIndex: 'elevenHours',
      align: 'center',
      render: () => (
        <Text>{t('extra_services_table.elevenHours_row_cell')}</Text>
      ),
    },
  ];

  useEffect(() => {
    basePriceRangeDataMock?.length
      ? setBasePriceRangeData(basePriceRangeDataMock)
      : setBasePriceRangeData([]);
  }, []);

  useEffect(() => {
    extraHoursMock?.length ? setExtraHours(extraHoursMock) : setExtraHours([]);
  }, []);

  return (
    <BookingNowWrapStyled>
      <Banner
        alt="Banner"
        fullWidth
        imageUrl={ImageBanner.src}
        height={171}
        preview={false}
      />
      {/* Content */}
      <BookNowContentStyled>
        <ContentLeftWrap id="booking-content-left">
          <ImagePrimary>
            <Image
              width="100%"
              style={{height: '100%'}}
              preview={true}
              src={BannerBooking.src}
              alt=""
            />
          </ImagePrimary>
          <ImageBottomList style={{width: '100%'}}>
            <div className="image-list-item">
              <Image preview={true} width="100%" src={BookNow1.src} alt="" />
            </div>
            <div className="image-list-item">
              <Image preview={true} width="100%" src={BookNow2.src} alt="" />
            </div>
            <div className="image-list-item">
              <Image preview={true} width="100%" src={BookNow3.src} alt="" />
            </div>
            <div className="image-list-item">
              <Image preview={true} width="100%" src={BookNow4.src} alt="" />
            </div>
            <div className="image-list-item">
              <Image preview={true} width="100%" src={BookNow5.src} alt="" />
            </div>
          </ImageBottomList>
        </ContentLeftWrap>
        <ContentRightWrap id="booking-content-right">
          <ContentRightTop className="content-right__top">
            <div>
              <Text
                style={{fontSize: isMobile ? 24 : 34}}
                className="title-text"
              >
                {t('title_text')}
              </Text>
            </div>
            {/*  </ContentRightTop>
           <div>
             <Text style={{ fontSize: 26, color: Colors.neutral900 }}>
               Base Price Range
             </Text> */}
            <div>
              <Text
                style={{fontSize: isMobile ? 20 : 26}}
                className="sub-title-text"
              >
                {t('subtitle_text')}
              </Text>
            </div>
            <div>
              <Text className="description-text">{t('description_text')}</Text>
            </div>
          </ContentRightTop>

          {/*Gallery for mobile view  */}
          {isMobile ? (
            <ContentLeftWrap style={{width: '100%'}}>
              <ImagePrimary>
                <Image
                  width="100%"
                  style={{height: '100%'}}
                  preview={true}
                  src={BannerBooking.src}
                  alt=""
                />
              </ImagePrimary>
              <ImageBottomList>
                <div className="image-list-item">
                  <Image
                    preview={true}
                    width="100%"
                    src={BookNow1.src}
                    alt=""
                  />
                </div>
                <div className="image-list-item">
                  <Image
                    preview={true}
                    width="100%"
                    src={BookNow2.src}
                    alt=""
                  />
                </div>
                <div className="image-list-item">
                  <Image
                    preview={true}
                    width="100%"
                    src={BookNow3.src}
                    alt=""
                  />
                </div>
                <div className="image-list-item">
                  <Image
                    preview={true}
                    width="100%"
                    src={BookNow4.src}
                    alt=""
                  />
                </div>
                <div className="image-list-item">
                  <Image
                    preview={true}
                    width="100%"
                    src={BookNow5.src}
                    alt=""
                  />
                </div>
              </ImageBottomList>
            </ContentLeftWrap>
          ) : null}

          <div>
            <Text
              style={{fontSize: isMobile ? 22 : 26, color: Colors.neutral900}}
            >
              {t('base_price_range_table.title')}
            </Text>
            <div id="booking__base-price-range">
              <Table<IBasePriceRange>
                columns={columns}
                dataSource={basePriceRangeData}
                bordered
                pagination={false}
              />
            </div>
          </div>

          {/* <div> */}
          {/* <Text style={{ fontSize: 26, color: Colors.neutral900 }}>
              Extra hours (apply for Adults only) */}
          <div id="booking__extra-hours">
            <Text
              style={{fontSize: isMobile ? 22 : 26, color: Colors.neutral900}}
            >
              {t('extra_services_table.title')}
            </Text>
            <div>
              <Table<IExtraHours>
                columns={columnsExtraHours}
                dataSource={extraHours}
                bordered
                pagination={false}
              />
            </div>
          </div>

          <div className="booking-button">
            <ButtonCustom
              // style={{ height: 40, width: 180, padding: 30 }}
              style={{
                height: isMobile ? 30 : 40,
                width: 180,
                padding: isMobile ? 20 : 30,
              }}
              type="primary"
              onClick={() => setIsOpenBookingModal(true)}
            >
              {t('reserve_button')}
            </ButtonCustom>
          </div>
        </ContentRightWrap>
      </BookNowContentStyled>

      {isOpenBookingModal ? (
        <BookingFormModal
          isModalOpen={isOpenBookingModal}
          handleCancel={() => setIsOpenBookingModal(false)}
          setSuccessModalOpen={setIsOpenSuccessModal}
        />
      ) : null}

      {isOpenSuccessModal ? (
        <SuccessModal
          open={isOpenSuccessModal}
          handleCancel={() => setIsOpenSuccessModal(false)}
        />
      ) : null}

      {showOpeningHourModal ? (
        <WorkingHoursModal
          setShowOpeningHourModal={setShowOpeningHourModal}
          open={showOpeningHourModal}
        />
      ) : null}
    </BookingNowWrapStyled>
  );
};

const BookingNowWrapStyled = styled.div`
  margin-bottom: 80px;
`;

const BookNowContentStyled = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

const ContentLeftWrap = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  .ant-image-mask {
    visibility: hidden;
  }
`;

const ImagePrimary = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  cursor: pointer;
  .ant-image {
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    img {
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
    }
  }
`;

const ImageBottomList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap; // TODO maybe update Swipe or slider
  justify-content: space-between;
  /* column-gap: 8px; */

  margin-top: 10px;
  row-gap: 10px;
  div.image-list-item {
    width: calc(33.333% - 5px);
  }

  div.image-list-item:nth-child(-n + 3) {
    margin-left: 0;
  }

  div.image-list-item:nth-child(-n + 3):not(:first-child) {
    margin-left: 5px;
  }

  div {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    cursor: pointer;
  }
`;

const ContentRightWrap = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  .booking-button {
    display: flex;
    justify-content: center;
  }
`;

const ContentRightTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  row-gap: 8px;

  .title-text {
    /* font-size: 34px; */
    font-weight: 500;
    line-height: 40px;
    color: ${Colors.neutral900};
  }
  .sub-title-text {
    /* font-size: 26px; */
    font-weight: 400;
    line-height: 36px;
    color: ${Colors.neutral400};
  }
  .description-text {
    font-size: 20px;
    font-weight: 400;
    line-height: 36px;
    color: ${Colors.neutral900};
  }
`;

export default BookNowScreen;
