import styled, { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const EmojiButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  text-align: center;
  animation: ${fadeIn} 0.3s ease-in-out;

  &:hover {
    transform: scale(1.2);
    transition: transform 0.2s ease-in-out;
  }
`;

export const Emoji = styled.div`
  font-size: 2.5rem;
`;

export const Description = styled.div`
  margin-top: 10px;
  font-size: 1rem;
  font-weight: bold;
  color: #333;
`;
