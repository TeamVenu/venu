import styled from 'styled-components';

export const ShadowBG = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--black-background-opaque);
  overflow: hidden;
  z-index: 9999;
`;

export const Wrapper = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  background: var(--background-color);
  color: var(--foreground-color);
  max-width: 380px;
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
