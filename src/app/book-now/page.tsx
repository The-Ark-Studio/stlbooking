'use client';
import React, { useEffect, useState } from 'react';
import Banner from '@components/banner/Banner';
import ImageBanner from '../../../public/images/ImageBanner.png';
import { Image, Typography, Table } from 'antd';
import styled from 'styled-components';
import BannerBooking from "../../../public/images/bookNow/_ONY9838.jpg";
import BookNow1 from "../../../public/images/bookNow/_ONY9849.jpg";
import BookNow2 from "../../../public/images/bookNow/_ONY9861.jpg";
import BookNow3 from "../../../public/images/bookNow/_ONY9865.jpg";
import BookNow4 from "../../../public/images/bookNow/_ONY9867.jpg";
import BookNow5 from "../../../public/images/bookNow/_ONY9872.jpg";
import {
  basePriceRangeDataMock,
  extraHours as extraHoursMock,
} from '@app/book-now/partials/dataMock';

import { type TableProps } from 'antd';
import ButtonCustom from '@components/buttonCustom/ButtonCustom';
import Colors from '@constants/Colors';
import BookingFormModal from '@app/book-now/partials/bookingModal/BookingModal';
import { IBasePriceRange, IExtraHours } from '@interfaces/booking/booking';
import SuccessModal from '@app/book-now/partials/successModal/SuccessModal';

const { Text } = Typography;

const BookNowScreen = () => {
  const [isOpenBookingModal, setIsOpenBookingModal] = useState(false);
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);

  const [basePriceRangeData, setBasePriceRangeData] = useState<
    IBasePriceRange[]
  >([]);

  const [extraHours, setExtraHours] = useState<IExtraHours[]>([]);

  const columns: TableProps<IBasePriceRange>['columns'] = [
    {
      title: 'Adult',
      dataIndex: 'adultPrice',
      align: 'center',
    },
    {
      title: 'Children from 7~12',
      dataIndex: 'childrenPrice',
      align: 'center',
    },
    {
      title: 'Under 7',
      dataIndex: 'underPrice',
      align: 'center',
    },
  ];

  const columnsExtraHours: TableProps<IExtraHours>['columns'] = [
    {
      title: '5 hours',
      dataIndex: 'fiveHours',
      align: 'center',
    },
    {
      title: '7 hours',
      dataIndex: 'sevenHours',
      align: 'center',
    },
    {
      title: '9 hours',
      dataIndex: 'nineHours',
      align: 'center',
    },
    {
      title: '11 hours',
      dataIndex: 'elevenHours',
      align: 'center',
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
        <ContentLeftWrap>
          <ImagePrimary>
            <Image
              width="100%"
              style={{ height: 400 }}
              preview={true}
              src={BannerBooking.src}
            />
          </ImagePrimary>
          <ImageBottomList>
            <div>
              <Image preview={true} width={150} src={BookNow1.src} />
            </div>
            <div>
              <Image preview={true} width={150} src={BookNow2.src} />
            </div>

            <div>
              <Image preview={true} width={150} src={BookNow3.src} />
            </div>

            <div>
              <Image preview={true} width={150} src={BookNow4.src} />
            </div>
            <div>
              <Image preview={true} width={150} src={BookNow5.src} />
            </div>
          </ImageBottomList>
        </ContentLeftWrap>
        <ContentRightWrap>
          <ContentRightTop className="content-right__top">
            <div>
              <Text className="title-text">Lounge Booking</Text>
            </div>
            <div>
              <Text className="sub-title-text">from 500,000VND / 5 hours</Text>
            </div>
            <div>
              <Text className="description-text">
                You can enjoy access to your own private balcony, the room is
                equipped with modern and most luxurious equipment to bring you
                the most wonderful time.
              </Text>
            </div>
          </ContentRightTop>
          <div>
            <Text style={{ fontSize: 26, color: Colors.neutral900 }}>
              Base Price Range
            </Text>
            <div>
              <Table<IBasePriceRange>
                columns={columns}
                dataSource={basePriceRangeData}
                bordered
                pagination={false}
              />
            </div>
          </div>

          <div>
            <Text style={{ fontSize: 26, color: Colors.neutral900 }}>
              Extra hours (apply for Adults only)
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
              style={{ height: 40, width: 180, padding: 30 }}
              type="primary"
              onClick={() => setIsOpenBookingModal(true)}
            >
              Reserve my seat
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
  width: 40%;
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
  column-gap: 20px;
  margin-top: 10px;
  row-gap: 10px;
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
    font-size: 34px;
    font-weight: 500;
    line-height: 40px;
    color: ${Colors.neutral900};
  }
  .sub-title-text {
    font-size: 26px;
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
