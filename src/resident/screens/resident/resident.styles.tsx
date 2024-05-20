import styled from 'styled-components';
import { Button as BaseButton } from '../../../common/components/button/button';

export const Wrapper = styled.div`
  width: 100%;
`;

export const Button = styled(BaseButton)``;

export const AlignButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

export const SearchRow = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;
