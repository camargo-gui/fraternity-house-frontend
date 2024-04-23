import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;

  & > :first-child {
    width: 20%;
    flex: 2 1 auto;
  }

  & > *:not(:first-child) {
    flex: 1 1 auto;
  }

  & > :last-child {
    flex: 0 1 auto;
  }

  & > * {
    flex: 1 1 auto;
  }
`;
