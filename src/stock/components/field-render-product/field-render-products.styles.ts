import styled from 'styled-components';

export const StockEntryScreenContainer = styled.div`
  position: relative;
  width: 100%;
  height: 40%;
`;

export const Container = styled.div`
  left: 0;
  width: 100%;
  background-color: #e2e2e2;
  border-radius: 5px;
`;

export const DivTextProduct = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 5px 0;
`;

export const TextProduct = styled.div`
  font-size: 20px;
  font-family: 'Roboto flex';
  color: black;
  padding: 10px;
  width: 20%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Button = styled.button`
  margin-right: 10px;
  border: none;
  background-color: #e2e2e2;
`;

export const ContentButtonForm = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;
