import Colors from '@constants/Colors';
import {Button, Modal} from 'antd';
import React, {useState} from 'react';
import {ReactComponent as OpenHour} from '../../../../../../public/images/opening-hours.svg';
import styled from 'styled-components';
import {useTranslations} from 'next-intl';

interface IWorkingHoursModalProps {
  open: boolean;
  setShowOpeningHourModal: (isOpen: boolean) => void;
}

const WorkingHoursModal = ({
  open,
  setShowOpeningHourModal,
}: IWorkingHoursModalProps) => {
  const handleCancel = () => {
    setShowOpeningHourModal(false);
  };

  const t = useTranslations('BookingScreen');

  return (
    <>
      <StyledModal
        title={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{marginRight: 10, fontSize: 36, color: Colors.neutral600}}
            >
              {t('opening_hours_modal.title')}
            </div>
            <OpenHour width={40} height={40} />
          </div>
        }
        open={open}
        maskClosable={true}
        centered
        width={600}
        footer={null}
        closable={open}
        onCancel={handleCancel}
      >
        <h2>{t('opening_hours_modal.description')}</h2>
        {/* <p>From 17h:00 to 24h the next day.</p> */}
      </StyledModal>
    </>
  );
};

export default WorkingHoursModal;

const StyledModal = styled(Modal)`
  max-width: 600px;
  .ant-modal-body {
    height: 200px;
    padding: 40px 60px 0 !important;
  }
  h2 {
    font-size: 24px;
    font-weight: bold;
    color: ${Colors.primary500};
    margin-top: 0;
    text-align: center;
    line-height: 42px;
  }
  p {
    margin-top: 20px;
    font-size: 20px;
    color: ${Colors.neutral600};
    margin-bottom: 20px;
    font-weight: bold;
    text-align: center;
  }
`;
