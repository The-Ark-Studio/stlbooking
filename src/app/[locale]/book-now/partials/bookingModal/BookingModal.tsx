import React, { Fragment, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import {
  Form,
  Input,
  DatePicker,
  TimePicker,
  InputNumber,
  Modal,
  Checkbox,
  Typography,
  Row,
  Col, Flex,
} from 'antd';
import styled from 'styled-components';
import Colors from '@constants/Colors';
import { useCustomMutation } from '@refinedev/core';
import {
  GLOBAL_DATE_FORMAT,
  HOUR_FORMAT,
  TIME_CHECK_IN_OUT_FORMAT,
} from '@utility/conmom';
import { IDataFormType } from '@interfaces/booking/booking';
import ButtonCustom from '@components/buttonCustom/ButtonCustom';
import { axiosInstance } from '@utility/axios-instance';

// const {Option} = Select;
const { Text } = Typography;

// import {useMediaQuery} from 'react-responsive';
import { useTranslations } from 'next-intl';

interface IBookingFormModalProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  setSuccessModalOpen?: (isOpen: boolean) => void;
}

interface ICalculationData {
  baseHours: number;
  extraHour: number;
  extraPrice: number;
  extraRate: number;
  priceDetail: number;
  standardExtraHours: number;
  subtotalCost: number;
  totalCost: number;
  totalDurations: number;
  totalGuests: number;
}

const BookingFormModal = ({
  isModalOpen,
  handleCancel,
  setSuccessModalOpen,
}: IBookingFormModalProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<IDataFormType>({
    defaultValues: {
      adults: 1,
      children: 0,
      infants: 0,
      extraServices: {
        airportPickup: false,
        spaManicure: false,
        tourPackage: false,
      },
    },
    mode: 'onChange',
  });

  const t = useTranslations('BookingScreen');

  const [isCalculateDisabled, setIsCalculateDisabled] = useState(false);
  const [isSendBookingDisabled, setIsSendBookingDisabled] = useState(true);
  const [isLoadingCalculate, setIsLoadingCalculate] = useState(false);
  const [openCheckInTime, setOpenCheckInTime] = useState(false);
  const [openCheckOutTime, setOpenCheckOutTime] = useState(false);
  const [calculationError, setCalculationError] = useState<null | string>(null);

  const { mutate: sendBooking, isLoading } = useCustomMutation();

  const today = dayjs().format(GLOBAL_DATE_FORMAT);

  const [calculationData, setCalculationData] =
    useState<ICalculationData | null>(null);

  const handleFormChange = () => {
    // Khi có sự thay đổi trong form, mở khóa nút Calculate và khóa lại nút Send my booking
    setIsCalculateDisabled(false);
    setIsSendBookingDisabled(true);
    setCalculationError(null);
  };

  const handleCalculatePrice = async (data: IDataFormType) => {
    if (!isValid) return;
    setIsLoadingCalculate(true);
    const payload = {
      checkInDate: data.date, //dayjs(data.date).format(GLOBAL_DATE_FORMAT),
      checkInTime: data.checkinTime?.format(HOUR_FORMAT),
      checkOutTime: data.checkoutTime?.format(HOUR_FORMAT),
      adults: data.adults,
      childrens: data.children,
      babies: data.infants,
    };

    const url = 'https://services.theark.studio/api/booking-stls/calculation';
    try {
      await axiosInstance.post(
        url,
        { data: payload },
        {
          headers: {
            'Content-Type': 'application/json',
            // Authorization: 'Bearer your-auth-token',
          },
        }
      ).then(r => {
        setCalculationData(r.data.data);
        setCalculationError(null);
      }).catch( e => {
        if (e.status === 400) {
          setCalculationError(e.response.data['message']);
        } else {
          setCalculationError(t('modal_booking.calc_error_common'));
        }
      }).finally(() => {
        setIsCalculateDisabled(!isCalculateDisabled);
        setIsSendBookingDisabled(false);
        setIsLoadingCalculate(false);
      });
    } catch (error) {
      setIsLoadingCalculate(false);
      console.log('🚀 ~  error:', error);
    }
  };

  const handleSendBooking = (data: IDataFormType) => {
    const currency = 'VND';
    const rentalType = 'Hour';

    const payload = {
      // room: data.facility,
      checkInDate: data.date, //dayjs(data.date).format(GLOBAL_DATE_FORMAT),
      checkInTime: data.checkinTime?.format(HOUR_FORMAT),
      checkOutTime: data.checkoutTime?.format(HOUR_FORMAT),
      adults: data.adults,
      childrens: data.children,
      babies: data.infants,
      firstName: data.firstName,
      lastName: data.lastName,
      currency: currency,
      rentalType: rentalType,
      emailAddress: data.email,
      phoneNumber: data.phone,
    };

    const url = 'https://services.theark.studio/api/booking-stls';
    sendBooking(
      {
        method: 'post',
        url: url,
        values: { data: payload },
        config: {
          headers: {
            'Content-Type': 'application/json',
            //   Authorization: 'Bearer your-auth-token',
          },
        },

        successNotification: () => {
          return {
            message: 'Booking Successful!',
            description: 'Your booking has been submitted.',
            type: 'success',
          };
        },

        errorNotification: () => ({
          message: 'Booking Failed',
          description: 'Something went wrong. Please try again.',
          type: 'error',
        }),
      },
      {
        onSuccess: () => {
          handleCancel();
          if (setSuccessModalOpen) {
            setSuccessModalOpen(true);
          }
        },
      }
    );
  };

  const onSubmit = async (data: IDataFormType) => {
    if (!isValid) return;
    if (isSendBookingDisabled) await handleCalculatePrice(data);
    else await handleSendBooking(data);
  };

  return (
    <Fragment>
      <Modal
        maskClosable={false}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <FromWrapStyled>
          <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
            {/* Facility Selection */}
            {/* <Form.Item label="Select facility*">
          <Controller
            name="facility"
            control={control}
            render={({ field }) => (
              <Select size="large" {...field} placeholder="Select a facility">
                <Option value="lounge1">
                  95 Vo Thi Sau Saigon Travel Lounge
                </Option>
              </Select>
            )}
            rules={{ required: true }}
          />
          {errors.facility && <Text type="danger">This is required.</Text>}
        </Form.Item> */}

            {/* Date Selection */}
            <Form.Item label={t('modal_booking.date')}>
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    size="large"
                    {...field}
                    format="DD-MM-YYYY" // Định dạng cho UI
                    style={{ width: '100%' }}
                    placeholder="DD - MMM - YYYY"
                    minDate={dayjs(today, GLOBAL_DATE_FORMAT)}
                    value={
                      field.value ? dayjs(field.value, 'DD-MM-YYYY') : null
                    } // Định dạng giá trị khi hiển thị
                    onChange={(date, dateString) => {
                      field.onChange(dateString);
                      handleFormChange();
                    }} // Định dạng giá trị được chọn
                  />
                )}
                rules={{ required: true }}
              />
              {errors.date && (
                <Text type="danger">
                  {t('modal_booking.this_field_is_required')}
                </Text>
              )}
            </Form.Item>

            <Row gutter={[16, 16]}>
              {/* Number of Adults */}
              <Col xs={24} sm={24}>
                <Form.Item label={t('modal_booking.adults')}>
                  <Controller
                    name="adults"
                    control={control}
                    defaultValue={1}
                    render={({ field }) => (
                      <InputNumber
                        size="large"
                        {...field}
                        min={1}
                        style={{ width: '100%' }}
                        onChange={(value) => {
                          field.onChange(value);
                          handleFormChange();
                        }}
                      />
                    )}
                  />
                </Form.Item>
              </Col>

              {/* Number of Children */}
              <Col xs={24} sm={24}>
                <Form.Item label={t('modal_booking.children')}>
                  <Controller
                    name="children"
                    control={control}
                    defaultValue={0}
                    render={({ field }) => (
                      <InputNumber
                        size="large"
                        {...field}
                        min={0}
                        style={{ width: '100%' }}
                        onChange={(value) => {
                          field.onChange(value);
                          handleFormChange();
                        }}
                      />
                    )}
                  />
                </Form.Item>
              </Col>

              {/* Number of Infants */}
              <Col xs={24} sm={24}>
                <Form.Item label={t('modal_booking.infants')}>
                  <Controller
                    name="infants"
                    control={control}
                    defaultValue={0}
                    render={({ field }) => (
                      <InputNumber
                        size="large"
                        {...field}
                        min={0}
                        style={{ width: '100%' }}
                        onChange={(value) => {
                          field.onChange(value);
                          handleFormChange();
                        }}
                      />
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>

            <FormGroup>
              {/* First Name */}
              <Form.Item label={t('modal_booking.first_name')}>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      size="large"
                      {...field}
                      placeholder={t('modal_booking.first_name')}
                    />
                  )}
                  rules={{ required: true }}
                />
                {errors.firstName && (
                  <Text type="danger">
                    {t('modal_booking.this_field_is_required')}
                  </Text>
                )}
              </Form.Item>

              {/* Last Name */}
              {/* <Form.Item label={t('modal_booking.last_name')}>
                <Controller
                  name="lastName"
                  control={control}
                  render={({field}) => (
                    <Input
                      size="large"
                      {...field}
                      placeholder={t('modal_booking.lastname')}
                    />
                  )}
                  rules={{required: true}}
                />
                {errors.lastName && (
                  <Text type="danger">
                    {t('modal_booking.this_field_is_required')}
                  </Text>
                )}
              </Form.Item> */}
            </FormGroup>

            <FormGroup>
              {/* Email */}
              <Form.Item label={t('modal_booking.email')}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      size="large"
                      {...field}
                      placeholder={t('modal_booking.email_placeholder')}
                    />
                  )}
                  rules={{ required: true }}
                />
                {errors.email && (
                  <Text type="danger">
                    {t('modal_booking.this_field_is_required')}
                  </Text>
                )}
              </Form.Item>

              {/* Phone Number */}
              <Form.Item label={t('modal_booking.phone_number')}>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <Input
                      size="large"
                      {...field}
                      placeholder={t('modal_booking.phoneNumber')}
                    />
                  )}
                  rules={{ required: true }}
                />
                {errors.phone && (
                  <Text type="danger">
                    {t('modal_booking.this_field_is_required')}
                  </Text>
                )}
              </Form.Item>
            </FormGroup>

            <FormGroup>
              {/* Check-in Time */}
              <Form.Item label={t('modal_booking.check_in_time')}>
                <Controller
                  name="checkinTime"
                  control={control}
                  render={({ field }) => (
                    <TimePicker
                      needConfirm={false}
                      allowClear={false}
                      showNow={false}
                      placeholder={t('modal_booking.check_in_time')}
                      open={openCheckInTime}
                      size="large"
                      {...field}
                      format={TIME_CHECK_IN_OUT_FORMAT}
                      style={{ width: '100%' }}
                      onCalendarChange={(time, _) => {
                        handleFormChange();
                        if (Array.isArray(time)) {
                          // Handle multiple selected times
                          time.forEach((selectedTime) => {
                            setValue(
                                'checkinTime',
                                dayjs(selectedTime.toDate())
                            );
                          });
                          setOpenCheckInTime(false);
                        } else {
                          // Handle single selected time
                          setValue('checkinTime', dayjs(time.toDate()));
                          setOpenCheckInTime(false);
                        }
                      }}
                      onChange={(time, _) => {
                        handleFormChange();
                        setValue('checkinTime', dayjs(time));
                        if (time) {
                          setOpenCheckInTime(false);
                        }
                      }}
                      minuteStep={30}
                      onClick={() => {
                        setOpenCheckInTime(true);
                      }}
                    />
                  )}
                  rules={{ required: true }}
                />
                {errors.checkinTime && (
                  <Text type="danger">
                    {t('modal_booking.this_field_is_required')}
                  </Text>
                )}
              </Form.Item>

              {/* Check-out Time */}
              <Form.Item label={t('modal_booking.check_out_time')}>
                <Controller
                  name="checkoutTime"
                  control={control}
                  render={({ field }) => (
                    <TimePicker
                      needConfirm={false}
                      allowClear={false}
                      showNow={false}
                      placeholder={t('modal_booking.check_out_time')}
                      open={openCheckOutTime}
                      size="large"
                      {...field}
                      format={TIME_CHECK_IN_OUT_FORMAT}
                      style={{ width: '100%' }}
                      onCalendarChange={(time, _) => {
                        handleFormChange();
                        if (Array.isArray(time)) {
                          // Handle multiple selected times
                          time.forEach((selectedTime) => {
                            setValue(
                                'checkoutTime',
                                dayjs(selectedTime.toDate())
                            );
                          });
                          setOpenCheckOutTime(false);
                        } else {
                          // Handle single selected time
                          setValue('checkoutTime', dayjs(time.toDate()));
                          setOpenCheckOutTime(false);
                        }
                      }}
                      onChange={(time, _) => {
                        setValue('checkoutTime', dayjs(time));
                        handleFormChange();
                        if (time) {
                          setOpenCheckOutTime(false);
                        }
                      }}
                      minuteStep={30}
                      onClick={() => {
                        setOpenCheckOutTime(true);
                      }}
                    />
                  )}
                  rules={{ required: true }}
                />
                {errors.checkoutTime && (
                  <Text type="danger">
                    {t('modal_booking.this_field_is_required')}
                  </Text>
                )}
              </Form.Item>
            </FormGroup>
            <Flex style={{ marginBottom: "24px" }}>
              {(calculationError != null) && (
                  <Text type="danger">
                    {calculationError}
                  </Text>
              )}
            </Flex>

            {/* TODO For requesting Note is Disabled */}
            <NoteStyled>
              {/* note */}
              <div style={{ padding: '16px' }}>
                <Form.Item>
                  <div className="notes-label">Notes for extra services</div>
                  <div style={{ margin: '10px 0' }}>
                    <Controller
                      name="extraServices.airportPickup"
                      control={control}
                      render={({ field }) => (
                        <Checkbox {...field} checked={field.value}>
                          <Text className="checkbox-label">Airport pickup</Text>
                        </Checkbox>
                      )}
                    />

                    <Controller
                      name="extraServices.spaManicure"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          style={{ marginLeft: '10px' }}
                          {...field}
                          checked={field.value}
                        >
                          <Text className="checkbox-label">Spa & manicure</Text>
                        </Checkbox>
                      )}
                    />

                    <Controller
                      name="extraServices.tourPackage"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          style={{ marginLeft: '10px' }}
                          {...field}
                          checked={field.value}
                        >
                          <Text className="checkbox-label">Tour package</Text>
                        </Checkbox>
                      )}
                    />
                  </div>

                  <Controller
                    name="notes"
                    control={control}
                    render={({ field }) => (
                      <Input.TextArea
                        {...field}
                        rows={4}
                        placeholder="Input text"
                      />
                    )}
                  />
                </Form.Item>
              </div>
            </NoteStyled>
            {(!isCalculateDisabled || calculationError != null) ? null : (
              <div>
                <FormGroup>
                  {/* Total Guests */}
                  <Form.Item>
                    <Text>{`${t('modal_booking.total_guests')}: ${calculationData?.totalGuests || 0
                      }`}</Text>
                  </Form.Item>
                  {/* Total Stay Time */}
                  <Form.Item>
                    <Text>{`${t('modal_booking.total_stay_hours')}: ${Math.round((calculationData?.totalDurations || 0) * 10) /
                      10
                      } ${t('hours')}`}</Text>
                  </Form.Item>
                </FormGroup>
                <FormGroup>
                  {/* Extra hours */}
                  <Form.Item>
                    <Text>{`${t('modal_booking.extra_hours')}: ${calculationData?.extraHour || 0
                      } ${t('hours')}`}</Text>
                  </Form.Item>
                  {/* Extra price */}
                  <Form.Item>
                    <Text>{`${t('modal_booking.extra_price')}: ${calculationData?.extraPrice.toLocaleString() ?? 0
                      } VND`}</Text>
                  </Form.Item>
                </FormGroup>
                <FormGroup>
                  {/* Sub Total */}
                  <Form.Item>
                    {/* <Text>Sub total: 500,000 VND</Text> */}
                    <Text>{`${t('modal_booking.sub_total_price')}: ${calculationData?.subtotalCost.toLocaleString() ?? 0
                      } VND`}</Text>
                  </Form.Item>
                  {/* Total price */}
                  <Form.Item>
                    <Text>{`${t('modal_booking.total')}: ${calculationData?.totalCost.toLocaleString() ?? 0
                      } VND`}</Text>
                  </Form.Item>
                </FormGroup>
                <FormGroup>
                  {/* Payment method */}
                  <Form.Item>
                    <Text>{`${t('modal_booking.payment_method')}`}</Text>
                  </Form.Item>
                </FormGroup>
              </div>
            )}

            <ButtonSubmitWrapStyled>
              <Form.Item>
                <Row gutter={[0, 16]}>
                  {/* Khoảng cách bên trái */}
                  <Col xs={0} sm={2} />
                  {/* Button tính toán */}
                  <Col xs={24} sm={9}>
                    <ButtonCustom
                      loading={isLoadingCalculate}
                      style={{ width: '100%', height: 40 }}
                      type="primary"
                      disabled={isCalculateDisabled}
                      htmlType="submit"
                    >
                      {t('modal_booking.calculate_button')}
                    </ButtonCustom>
                  </Col>
                  {/* Khoảng cách giữa các button */}
                  <Col xs={0} sm={2} />
                  {/* Button gửi booking */}
                  <Col xs={24} sm={9}>
                    <ButtonCustom
                      loading={isLoading}
                      style={{ width: '100%', height: 40 }}
                      type="primary"
                      htmlType="submit"
                      disabled={isSendBookingDisabled}
                    >
                      {t('modal_booking.send_booking_button')}
                    </ButtonCustom>
                  </Col>
                </Row>
              </Form.Item>
            </ButtonSubmitWrapStyled>
            {/* Button in Footer */}
            {/* <ButtonSubmitWrapStyled>
              <Form.Item>
                <ButtonCustom
                  loading={isLoading}
                  style={{ width: 180, height: 40 }}
                  type="primary"
                  htmlType="button"
                  disabled={isCalculateDisabled}
                >
                  {t('modal_booking.calculate_button')}
                </ButtonCustom>
              </Form.Item>
              <div className="dashed-arrow"></div>
              <Form.Item>
                <ButtonCustom
                  loading={isLoading}
                  style={{ width: 180, height: 40 }}
                  type="primary"
                  htmlType="submit"
                  disabled={isSendBookingDisabled}
                >
                  {t('modal_booking.send_booking_button')}
                </ButtonCustom>
              </Form.Item>
            </ButtonSubmitWrapStyled> */}
          </Form>
        </FromWrapStyled>
      </Modal>
    </Fragment>
  );
};

const FromWrapStyled = styled.div`
  .ant-form-item {
    margin-bottom: 8px;
  }
  .ant-form-item-control {
    margin-bottom: 10px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 10px;
  width: 100%;
  div {
    width: 100%;
  }
`;

const FormGroupLeft = styled.div`
  .ant-form-item-control {
    margin-bottom: 0;
  }
`;

const NoteStyled = styled.div`
  display: none; // TODO: For requesting Note and Extra Services is disabled
  width: 431px;
  position: absolute;
  top: 80px;
  right: -431px;
  background-color: ${Colors.neutral200};
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;

  .notes-label {
    font-size: 24px;
    color: ${Colors.neutral900};
    font-weight: 700;
  }
  .checkbox-label {
    font-size: 14px;
  }
`;

const ButtonSubmitWrapStyled = styled.div`
  // display: flex;
  // justify-content: flex-end;
  // justify-content: space-between
`;

export default BookingFormModal;
