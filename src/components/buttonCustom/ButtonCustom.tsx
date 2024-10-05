import React, {ReactNode} from 'react';

import {Button, ButtonProps} from 'antd';
interface IButtonCustom extends ButtonProps {
  children: string | ReactNode;
}

const ButtonCustom = ({children, ...rest}: IButtonCustom) => {
  return <Button {...rest}>{children}</Button>;
};

export default ButtonCustom;
