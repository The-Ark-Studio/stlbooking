import Colors from '@constants/Colors';
import {Button, Modal} from 'antd';
import React, {useState} from 'react';
import {ReactComponent as OpenHour} from '../../../../../../public/images/opening-hours.svg';
import styled from 'styled-components';

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
              Opening Hour
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
        <h2>Operating hours from Now until December 31, 2024</h2>
        <p>From 5:00 PM to 12:00 AM the next day.</p>
      </StyledModal>
    </>
  );
};

export default WorkingHoursModal;

const StyledModal = styled(Modal)`
  max-width: 600px;
  .ant-modal-body {
    height: 200px;
    padding: 50px !important;
    padding-top: 30px !important;
  }
  h2 {
    font-size: 24px;
    font-weight: bold;
    color: #0b2d6b;
    color: ${Colors.primary500};
    margin-top: 0;
    text-align: center;
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
