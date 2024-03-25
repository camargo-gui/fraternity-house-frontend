import styled from 'styled-components';
import { Button as BaseButton } from '../../common/components/button/button';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

export const LeftSize = styled.div`
  width: 30%;
  height: 100%;
  background-color: #002b5e;
  color: #002b5e;
  display: flex;
  justify-content: center;
  align-items: center;
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
`;

export const Logo = styled.img`
  justify-content: center;
`;

export const Button = styled(BaseButton).attrs({
  backgroundColor: '#002b5e',
  // just less blue than the background color
  hoverBackgroundColor: '#001a3d',
})``;
