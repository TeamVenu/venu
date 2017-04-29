import styled from 'styled-components';

export const Wrapper = styled.section`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

export const BottomContainer = styled.section`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 1em;
`;

export const CardContainer = styled.section`
  background: var(--background-color);
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  overflow: hidden;

  section {
    background: none;
  }

  > p {
    text-align: center;
  }
`;

export const ActionContainer = styled.section`
  display: flex;
  background: var(--background-color);
  border-top: 1px solid var(--light-gray);
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  overflow: hidden;

  & button:first-of-type {
    border-right: 1px solid var(--light-gray);
    color: var(--grey);
  }
`;
