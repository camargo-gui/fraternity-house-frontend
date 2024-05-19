import styled from 'styled-components';

export const ScreenTitleText = styled.h1`
  font-size: 36px;
  font-family: 'Roboto flex';
  color: #002b5e;
  font-weight: 500;
  margin-bottom: 30px;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

export const UserName = styled.h2`
  font-size: 20px;
  font-family: 'Roboto flex';
  color: #002b5e;
  font-weight: 500;
  margin: 0;
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

export const BellIconContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-left: 10px;
  cursor: pointer;

  & > span {
    position: absolute;
    top: -5px;
    right: -5px;
    width: 10px;
    height: 10px;
    background-color: red;
    border-radius: 50%;
  }
`;
