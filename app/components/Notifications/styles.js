import styled, { keyframes } from 'styled-components';

const pop = keyframes`
  0% {
    transform: scale(0);
  }

  90% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
`;

export const Wrapper = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  color: var(--background-color);
  display: flex;
  flex-flow: column;
  justify-content: center;
  animation: ${pop} 0.4s;
  box-shadow: 0 0 28px var(--grey);

  &.error {
    background: var(--background-color);
    color: var(--error-color);
  }

  &.warning {
    background: var(--warning-color);
  }

  &.success {
    background: var(--success-color);
  }

  p {
    width: 90%;
    margin: auto;
    text-align: center;
  }
`;

export const IconWrapper = styled.section`
  padding: var(--padding);
  margin: auto;
  .error & {
    color: var(--error-color-accent);
  }

  .warning & {
    color: var(--warning-color-accent);
  }

  .success & {
    color: var(--success-color-accent);
  }
`;
