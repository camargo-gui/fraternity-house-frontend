import styled from 'styled-components';

export const RowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0px;
  border-bottom: 1px solid #e0e0e0;

  > div:first-child {
    margin-right: 24px;
    flex-grow: 1;
    max-width: 700px;
  }
`;

export const SelectContainer = styled.div`
  display: flex;
  width: 500px;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;

  > div:first-child {
    margin-right: 24px;
  }
`;
