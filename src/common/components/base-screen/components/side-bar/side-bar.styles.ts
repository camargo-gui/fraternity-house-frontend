import styled from 'styled-components';

export const Wrapper = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  width: 20%;
  background-color: #002b5e;
  align-items: center;
  border-radius: 25px;
  margin: 1%;

  @media (max-width: 1024px) {
    width: 100%;
    z-index: 999999;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
    ${(props) => props.isOpen && `transform: translateX(0);`}
  }
`;

export const Logo = styled.img`
  width: 50%;
  justify-content: center;
  margin-top: 10%;

  @media (max-width: 1024px) {
    width: 20%;
  }

  @media (max-width: 768px) {
    width: 30%;
  }
`;

export const ListItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin-top: 10%;
  height: 100%;
  gap: 35px;
`;

export const HamburgerButton = styled.button`
  display: none;
  position: absolute;
  top: 20px;
  left: 20px;
  background: none;
  border: none;
  color: black;
  font-size: 24px;

  @media (max-width: 1024px) {
    display: block;
  }
`;
