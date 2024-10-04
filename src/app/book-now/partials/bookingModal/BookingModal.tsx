import React, {Fragment} from 'react';
import {useForm, Controller, useWatch} from 'react-hook-form';
import dayjs from 'dayjs';
import {
  Form,
  Input,
  Select,
  DatePicker,
  TimePicker,
  InputNumber,
  Modal,
  Checkbox,
  Typography,
} from 'antd';
import styled from 'styled-components';
import Colors from '@constants/Colors';
import {useCustomMutation} from '@refinedev/core';
import {GLOBAL_DATE_FORMAT, HOUR_FORMAT} from '@utility/conmom';
import {IDataFormType} from '@interfaces/booking/booking';
import ButtonCustom from '@components/buttonCustom/ButtonCustom';

const {Option} = Select;
const {Text} = Typography;

import {useMediaQuery} from 'react-responsive';

interface IBookingFormModalProps {
  isModalOpen: boolean;
  //   handleOk: () => void;
  handleCancel: () => void;
  setSuccessModalOpen?: (isOpen: boolean) => void;
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
    formState: {errors, isValid},
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

  const {mutate: sendBooking, isLoading} = useCustomMutation();
  const isMobile = useMediaQuery({query: '(max-width: 576px)'});

  const checkinTime = useWatch({control, name: 'checkinTime'});
  const checkoutTime = useWatch({control, name: 'checkoutTime'});
  const adults = useWatch({control, name: 'adults'});
  const children = useWatch({control, name: 'children'});

  const today = dayjs().format(GLOBAL_DATE_FORMAT);

  // Calculate the total stay hours when both times are selected
  const totalStayHours =
    checkinTime && checkoutTime
      ? checkoutTime.diff(checkinTime, 'hour', true)
      : 0;

  // Calculate Subtotal
  const adultRate = 500000; // 500,000 VND per hour per adult
  const childRate = 250000; // 250,000 VND per hour per child

  const subTotal =
    adults * adultRate * Number(totalStayHours) +
    children * childRate * Number(totalStayHours);

  const onSubmit = (data: IDataFormType) => {
    console.log('Submitted:', data);
    if (!isValid) return;
    const currency = 'VND';
    const rentalType = 'Hour';

    const payload = {
      room: data.facility,
      checkInDate: data.date?.format(GLOBAL_DATE_FORMAT),
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

    console.log('payload: ', payload);

    const url = 'https://services.theark.studio/api/booking-stls';
    sendBooking(
      {
        method: 'post',
        url: url,
        values: {data: payload},
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

  // const handleOk = () => {};

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
            <Form.Item label="Select facility*">
              <Controller
                name="facility"
                control={control}
                render={({field}) => (
                  <Select
                    size="large"
                    {...field}
                    placeholder="Select a facility"
                  >
                    <Option value="lounge1">
                      95 Vo Thi Sau Saigon Travel Lounge
                    </Option>
                    {/* Add other facilities */}
                  </Select>
                )}
                rules={{required: true}}
              />
              {errors.facility && <Text type="danger">This is required.</Text>}
            </Form.Item>

            {/* Date Selection */}
            <Form.Item label="Select a date*">
              <Controller
                name="date"
                control={control}
                render={({field}) => (
                  <DatePicker
                    size="large"
                    {...field}
                    style={{width: '100%'}}
                    placeholder="DD - MMM - YYYY"
                    minDate={dayjs(today, GLOBAL_DATE_FORMAT)}
                  />
                )}
                rules={{required: true}}
              />
              {errors.date && <Text type="danger">This is required.</Text>}
            </Form.Item>

            <FormGroup>
              {/* Number of Adults */}
              <Form.Item label="Adults">
                <Controller
                  name="adults"
                  control={control}
                  defaultValue={1}
                  render={({field}) => (
                    <InputNumber
                      size="large"
                      {...field}
                      min={1}
                      max={10}
                      style={{width: '100%'}}
                    />
                  )}
                />
              </Form.Item>

              {/* Number of Children */}
              <Form.Item
                label={`${isMobile ? 'Children' : 'Children from 7-12'}`}
              >
                <Controller
                  name="children"
                  control={control}
                  defaultValue={0}
                  render={({field}) => (
                    <InputNumber
                      size="large"
                      {...field}
                      min={0}
                      max={10}
                      style={{width: '100%'}}
                    />
                  )}
                />
              </Form.Item>

              {/* Number of Infants */}
              <Form.Item label="Below 7">
                <Controller
                  name="infants"
                  control={control}
                  defaultValue={0}
                  render={({field}) => (
                    <InputNumber
                      size="large"
                      {...field}
                      min={0}
                      max={10}
                      style={{width: '100%'}}
                    />
                  )}
                />
              </Form.Item>
            </FormGroup>

            <FormGroup>
              {/* First Name */}
              <Form.Item label="First name*">
                <Controller
                  name="firstName"
                  control={control}
                  render={({field}) => (
                    <Input size="large" {...field} placeholder="First name" />
                  )}
                  rules={{required: true}}
                />
                {errors.firstName && (
                  <Text type="danger">This is required.</Text>
                )}
              </Form.Item>

              {/* Last Name */}
              <Form.Item label="Last name*">
                <Controller
                  name="lastName"
                  control={control}
                  render={({field}) => (
                    <Input size="large" {...field} placeholder="Last name" />
                  )}
                  rules={{required: true}}
                />
                {errors.lastName && (
                  <Text type="danger">This is required.</Text>
                )}
              </Form.Item>
            </FormGroup>

            <FormGroup>
              {/* Email */}
              <Form.Item label="Email*">
                <Controller
                  name="email"
                  control={control}
                  render={({field}) => (
                    <Input size="large" {...field} placeholder="Email" />
                  )}
                  rules={{required: true}}
                />
                {errors.email && <Text type="danger">This is required.</Text>}
              </Form.Item>

              {/* Phone Number */}
              <Form.Item label="Phone number*">
                <Controller
                  name="phone"
                  control={control}
                  render={({field}) => (
                    <Input size="large" {...field} placeholder="Phone number" />
                  )}
                  rules={{required: true}}
                />
                {errors.phone && <Text type="danger">This is required.</Text>}
              </Form.Item>
            </FormGroup>

            <FormGroup>
              {/* Check-in Time */}
              <Form.Item label="Check-in time*">
                <Controller
                  name="checkinTime"
                  control={control}
                  render={({field}) => (
                    <TimePicker
                      size="large"
                      {...field}
                      format="HH:mm"
                      style={{width: '100%'}}
                      onChange={(time, _) =>
                        setValue('checkinTime', dayjs(time))
                      }
                    />
                  )}
                  rules={{required: true}}
                />
                {errors.checkinTime && (
                  <Text type="danger">This is required.</Text>
                )}
              </Form.Item>

              {/* Check-out Time */}
              <Form.Item label="Check-out time*">
                <Controller
                  name="checkoutTime"
                  control={control}
                  render={({field}) => (
                    <TimePicker
                      size="large"
                      {...field}
                      format="HH:mm"
                      style={{width: '100%'}}
                      onChange={(time, _) =>
                        setValue('checkoutTime', dayjs(time))
                      }
                    />
                  )}
                  rules={{required: true}}
                />
                {errors.checkoutTime && (
                  <Text type="danger">This is required.</Text>
                )}
              </Form.Item>
            </FormGroup>

            {/* TODO For requesting Note is Disabled */}
            <NoteStyled>
              {/* note */}
              <div style={{padding: '16px'}}>
                <Form.Item>
                  <div className="notes-label">Notes for extra services</div>
                  <div style={{margin: '10px 0'}}>
                    <Controller
                      name="extraServices.airportPickup"
                      control={control}
                      render={({field}) => (
                        <Checkbox {...field} checked={field.value}>
                          <Text className="checkbox-label">Airport pickup</Text>
                        </Checkbox>
                      )}
                    />

                    <Controller
                      name="extraServices.spaManicure"
                      control={control}
                      render={({field}) => (
                        <Checkbox
                          style={{marginLeft: '10px'}}
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
                      render={({field}) => (
                        <Checkbox
                          style={{marginLeft: '10px'}}
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
                    render={({field}) => (
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

            <FormGroup>
              {/* Total Stay Time */}
              <Form.Item>
                <Text>{`Total stay time: ${totalStayHours ?? 0} hour(s)`}</Text>
              </Form.Item>

              <FormGroupLeft>
                {/* Sub Total */}
                <Form.Item style={{marginBottom: 0}}>
                  <Text>{`Sub total: ${
                    subTotal.toLocaleString() ?? 0
                  } VND`}</Text>
                </Form.Item>

                {/* Extra Hours */}
                <Form.Item>
                  <Text>{`Extra Hours: 00 hour(s)`}</Text>
                </Form.Item>
              </FormGroupLeft>
            </FormGroup>

            {/* Button in Footer */}
            <ButtonSubmitWrapStyled>
              <Form.Item>
                <ButtonCustom
                  loading={isLoading}
                  style={{width: 180, height: 40}}
                  type="primary"
                  htmlType="button"
                  onClick={() => console.log('calculate')}
                >
                  1 Calculate price
                </ButtonCustom>
              </Form.Item>
              <div className="dashed-arrow"></div>
              <Form.Item>
                <ButtonCustom
                  loading={isLoading}
                  style={{width: 180, height: 40}}
                  type="primary"
                  htmlType="submit"
                >
                  2 Send my booking
                </ButtonCustom>
              </Form.Item>
            </ButtonSubmitWrapStyled>
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
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* justify-content: flex-end; */
  .dashed-arrow {
    display: flex;
    align-items: center;
    position: relative;
    top: -7px;
    width: 50px;
    margin: 0 10px;
  }

  .dashed-arrow::before {
    content: '';
    border-top: 1px dashed #d9d9d9;
    width: 100%;
    position: absolute;
  }

  .dashed-arrow::after {
    content: '';
    border: solid #d9d9d9;
    border-width: 0 1px 1px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(-45deg);
    position: absolute;
    right: -5px;
  }
`;

export default BookingFormModal;
