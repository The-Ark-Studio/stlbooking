import React from 'react';
import {Image} from 'antd';
import styled from 'styled-components';

interface IBannerProps {
  alt?: string;
  width?: number;
  fullWidth?: boolean;
  height?: number;
  imageUrl: string;
  preview?: boolean;
}

const Banner = ({
  alt,
  width,
  fullWidth,
  height,
  imageUrl,
  preview,
}: IBannerProps) => {
  return (
    <BannerWrap className={`${fullWidth ? 'full-width' : ''}`}>
      <Image
        width={fullWidth ? '100%' : width}
        alt={alt}
        style={{height: height}}
        src={imageUrl}
        preview={preview}
      />
    </BannerWrap>
  );
};

const BannerWrap = styled.div`
  .full-width {
  }
`;

export default Banner;
