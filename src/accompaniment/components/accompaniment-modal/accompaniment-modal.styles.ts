import styled from 'styled-components';

export const AlignHeaderModal = styled.div<{
  canCreateOrEditAccompaniment: boolean;
}>`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) =>
    props.canCreateOrEditAccompaniment ? 'space-between' : 'flex-start'};
  gap: 15px;
  align-items: center;
  width: 100%;
`;
