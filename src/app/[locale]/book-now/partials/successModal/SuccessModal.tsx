import React from 'react';
import {Modal, Typography} from 'antd';
import Colors from '@constants/Colors';
import ButtonCustom from '@components/buttonCustom/ButtonCustom';
import styled from 'styled-components';
import {useTranslations} from 'next-intl';

interface ISuccessModalProps {
  open: boolean;
  handleCancel?: () => void;
}
const {Text} = Typography;

const SuccessModal = ({open, handleCancel}: ISuccessModalProps) => {
  const t = useTranslations('BookingScreen');

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
            {t('success_modal.title')}
          </Text>
        </div>
        <div>
          <Text
            style={{fontSize: 22, color: Colors.neutral900, fontWeight: 400}}
          >
            {t('success_modal.description_one')}
          </Text>
        </div>

        <div>
          <Text
            style={{fontSize: 22, color: Colors.neutral900, fontWeight: 400}}
          >
            {t('success_modal.description_two')}
          </Text>
        </div>
        <ButtonWrapStyled>
          <ButtonCustom
            style={{width: 210, height: 36}}
            type="primary"
            onClick={handleCancel}
          >
            {t('success_modal.ok_button')}
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
