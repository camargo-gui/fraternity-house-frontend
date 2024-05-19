import styled from 'styled-components';

export const ModalContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100%;
  background-color: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  transform: translateX(${(props) => (props.isOpen ? '0' : '100%')});
  transition: transform 0.3s ease;
  overflow-y: auto;
`;

export const ModalContent = styled.div`
  padding: 20px;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

export const NotificationList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const NotificationItem = styled.li<{ read: boolean }>`
  background: ${(props) => (props.read ? '#f8f9fa' : '#e2e3e5')};
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const NotificationHeader = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const NotificationText = styled.p`
  margin: 5px 0;
  font-size: 16px;
`;

export const NotificationDate = styled.span`
  font-size: 14px;
  color: #888;
  margin-top: 10px;
  align-self: flex-end;
`;
