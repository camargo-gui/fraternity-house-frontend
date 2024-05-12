import styled from 'styled-components';
import { Button } from '../../../common/components/button/button';

export const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding-bottom: 2%;
`;

export const CenterRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  padding-bottom: 2%;
  width: 70%;
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding-bottom: 2%;
`;

export const FullColumn = styled.div`
  width: 100%;
`;

export const MajorColumn = styled.div`
  width: 75%;
  display: flex;
  align-items: center;
`;

export const HalfColum = styled.div`
  width: 45%;
`;

export const MinorColumn = styled.div`
  width: 30%;
`;

export const TabsRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 2%;
`;

export const TabText = styled.button<{ active: boolean }>`
  font-size: 1.5rem;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid
    ${(props) => (props.active ? '#2a1aa5' : 'transparent')};
`;

export const SimpleButton = styled.button`
  background-color: transparent;
  border: none;
  padding-bottom: 2%;
`;

export const TabWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CancelButton = styled(Button).attrs({
  backgroundColor: '#b51414',
  hoverBackgroundColor: '#b51414',
  text: 'Cancelar',
})``;
