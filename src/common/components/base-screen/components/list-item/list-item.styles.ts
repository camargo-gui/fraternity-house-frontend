import styled from 'styled-components';

export const Wrapper = styled.button`
  display: flex;
  background-color: transparent;
  border: none;
  flex-direction: row;
  width: 100%;
  margin: 0 10% 0 10%;
  align-items: center;
  height: 5%;
  padding-left: 10%;
  cursor: pointer;
`;

export const Icon = styled.img`
  height: 100%;
  width: 20%;
`;

export const Title = styled.h1<{ color: string }>`
  color: #ffffff;
  font-size: 1.3em;
  margin: 0;
  margin-left: 4%;
  font-family: 'Roboto Flex';
  color: ${(props) => props.color};
`;
