import styled from 'styled-components';
import { Button as BaseButton } from '../../../common/components/button/button';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100vh;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const LeftSize = styled.div`
  width: 30%;
  height: 100%;
  background-color: #002b5e;
  color: #002b5e;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const RightSize = styled.div`
  width: 70%;
  height: 100%;
  background-color: #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: left;
  flex-direction: column;
  padding: 0 10% 0 10%;

  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
    align-items: center;
  }
`;

export const Logo = styled.img`
  justify-content: center;
  max-width: 100%;
  height: auto;
`;

export const Button = styled(BaseButton).attrs({
  backgroundColor: '#002b5e',
  hoverBackgroundColor: '#001a3d',
})``;

export const TransparentButton = styled(BaseButton).attrs({
  backgroundColor: 'transparent',
  hoverBackgroundColor: 'transparent',
})`
  text-align: left;
`;

export const GoBackButton = styled(BaseButton).attrs({
  backgroundColor: 'transparent',
  width: 'auto',
  color: '#000',
  hoverBackgroundColor: 'transparent',
  padding: '20px 20px 20px 0',
  fontWeight: 'bold',
})`
  text-align: left;
`;

export const RequirementsBox = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  gap: 4px;

  width: 60%;
  background: rgba(209, 227, 255, 0.1);
  border: 1px solid #d1e3ff;
  border-radius: 12px;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const IconContainer = styled.div`
  width: 20px;
  height: 24px;
  margin-right: 10px;
`;

export const InfosWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ResetRightSize = styled.div`
  width: 70%;
  height: 100%;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10% 0 10%;

  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
    align-items: center;
  }
`;
