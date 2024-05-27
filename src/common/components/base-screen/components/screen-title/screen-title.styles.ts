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
  flex-direction: row;
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

export const ImageEmployee = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-right: 20px;
  object-fit: cover;
  border: 2px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    width 0.3s ease,
    height 0.3s ease;

  &:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
`;

export const AlignContentHeader = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin-right: 20px;
`;
