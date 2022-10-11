import React from 'react';
import { Oval } from 'react-loader-spinner';
import * as S from './style';

const LoadingPage = () => {
  return (
    <S.LoadingPage>
      <Oval
        ariaLabel="loading-indicator"
        height={60}
        width={60}
        strokeWidth={2.5}
        strokeWidthSecondary={2.5}
        color="#f0f2f5"
        secondaryColor="#001529"
      />
    </S.LoadingPage>
  );
};

export default LoadingPage;