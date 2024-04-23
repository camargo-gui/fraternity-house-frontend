import styled from 'styled-components';
import { Button } from '../../common/components/button/button';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TransparentButton = styled(Button).attrs({
  backgroundColor: 'transparent',
  hoverBackgroundColor: 'transparent',
  width: '48px',
  heeight: '48px',
  padding: '0px 10px',
})``;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
