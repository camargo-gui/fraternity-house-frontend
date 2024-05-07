import styled from 'styled-components';

export const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding-bottom: 2%;
`;

export const ButtonRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  padding-bottom: 2%;
`;

export const FullColumn = styled.div`
  width: 100%;
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

export const TabText = styled.div<{ active: boolean }>`
  font-size: 1.5rem;
  border-bottom: 2px solid
    ${(props) => (props.active ? '#2a1aa5' : 'transparent')};
`;
