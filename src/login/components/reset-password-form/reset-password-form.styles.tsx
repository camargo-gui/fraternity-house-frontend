import styled from 'styled-components';

export const FormGroup = styled.div<{
  shouldShow?: boolean;
  hasError: boolean;
}>`
  transition: max-height 0.2s linear;
  overflow: hidden;
  margin: 0;
  padding-bottom: '16px';

  max-height: 300px;
  overflow: visible;
  margin-bottom: 20px;
`;

export const ErrorMessage = styled.span`
  display: block;
  font-size: 14px;
  color: #be0606;
  min-height: 40px;
  margin-top: 10px;
`;

export const RequirementsBox = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  gap: 4px;

  width: 60%;
  height: 10%;

  background: rgba(209, 227, 255, 0.1);

  border: 1px solid #d1e3ff;
  border-radius: 12px;

  flex: none;
  order: 5;
  flex-grow: 0;

  margin-bottom: 24px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const FormDescriptionText = styled.p``;

export const IconContainer = styled.div`
  width: 20px;
  height: 24px;
  margin-right: 10px;
`;
