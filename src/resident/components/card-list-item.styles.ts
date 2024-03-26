import styled from 'styled-components';
import { Button } from '../../common/components/button/button';

export const ActionButton = styled(Button).attrs({
  backgroundColor: 'transparent',
  hoverBackgroundColor: 'transparent',
  width: '32px',
})`
  border: none;
  padding: 0;
`;

export const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  gap: 0px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const DivCardIcons = styled.div`
  margin-top: 10px;
`;
