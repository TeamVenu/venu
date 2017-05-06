import styled from 'styled-components';

export const Wrapper = styled.section`
  position: fixed;
  width: ${(props) => (props.full) ? '100vw' : '90vw'};
  margin: ${(props) => (props.full) ? '0' : '0 auto'};
  padding: calc(var(--padding) * 2) 0;
  z-index: 15;
  left: auto;
  right: auto;
  bottom: var(--topbar-height);
`;

export const ButtonWrapper = styled.section`
  position: relative;
  align-self: flex-end;
  margin: 0;
  width: 100%;
  padding: calc(var(--padding) * 2);
  z-index: 15;
`;

export const SlideList = styled.section`
  padding: calc(var(--padding) / 2) var(--padding);
`;
