import { ButtonGroup as BaseButtonGroup } from 'react-bootstrap';
import styled from 'styled-components';
import { Button as BaseButton } from '../../common/components/button/button';

export const Wrapper = styled.div`
  width: 100%;
`;

export const Button = styled(BaseButton)``;

export const ButtonGroup = styled(BaseButtonGroup)`
  display: flex;
  flex-grow: 1;
`;

export const GoBackButton = styled(BaseButton).attrs({
  backgroundColor: 'transparent',
  width: 'auto',
  color: '#000',
  hoverBackgroundColor: 'transparent',
  padding: '20px 20px 20px 0',
  fontWeight: 'bold',
})``;

export const MedicineWrapper = styled.div`
  padding-right: 80px;
`;
