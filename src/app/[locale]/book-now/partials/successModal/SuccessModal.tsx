import React from 'react';
import {Modal, Typography} from 'antd';
import Colors from '@constants/Colors';
import ButtonCustom from '@components/buttonCustom/ButtonCustom';
import styled from 'styled-components';

interface ISuccessModalProps {
  open: boolean;
  handleCancel?: () => void;
}
const {Text} = Typography;

const SuccessModal = ({open, handleCancel}: ISuccessModalProps) => {
  return (
    <Modal
      maskClosable={false}
      width={850}
      open={open}
      onCancel={handleCancel}
      footer={null}
    >
      <ContentWrapStyled>
        <div>
          <Text
            style={{fontSize: 32, color: Colors.neutral900, fontWeight: 400}}
          >
            From STL
          </Text>
        </div>
        <div>
          <Text
            style={{fontSize: 22, color: Colors.neutral900, fontWeight: 400}}
          >
            Thank you for choosing to stay with us! We are delighted to have you
            and hope you enjoy your time here. Please check your mailbox for
            important information regarding your stay.
          </Text>
        </div>

        <div>
          <Text
            style={{fontSize: 22, color: Colors.neutral900, fontWeight: 400}}
          >
            If you need any assistance or have any questions, feel free to reach
            out to our team. We are here to ensure you have a comfortable and
            memorable experience.
          </Text>
        </div>
        <ButtonWrapStyled>
          <ButtonCustom
            style={{width: 210, height: 36}}
            type="primary"
            onClick={handleCancel}
          >
            Ok!
          </ButtonCustom>
        </ButtonWrapStyled>
      </ContentWrapStyled>
    </Modal>
  );
};

const ContentWrapStyled = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  row-gap: 20px;
`;

const ButtonWrapStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SuccessModal;
