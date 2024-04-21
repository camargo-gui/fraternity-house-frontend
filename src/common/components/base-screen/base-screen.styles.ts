import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 98vh;
`;

export const ContentContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  height: 98vh;
  padding: 2%;
  width: 1000px;
`;

export const ScreenTitle = styled.h1`
  font-size: 36px;
  font-family: 'Roboto flex';
  color: #002b5e;
  font-weight: 500;
  margin-bottom: 30px;
`;
