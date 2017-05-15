import styled, { keyframes } from 'styled-components';

const pop = keyframes`
  0% {
    // transform-origin: 50% 50%;
    transform: scale(0);
  }
  85% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
`;

export const ShadowBG = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--black-background-opaque);
  overflow: hidden;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.section`
  animation: ${pop} 0.2s;
  width: 90%;
  background: var(--background-color);
  color: var(--foreground-color);
  max-width: 320px;
  border-radius: 4px;
`;

export const IconWrapper = styled.section`
  position: relative;
  background: var(--light-gray);
  padding: 2em;
`;

export const TextWrapper = styled.section`
  text-align: center;
  position: relative;
  margin: auto;
  padding-top: 1em;
  padding-bottom: 1em;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
