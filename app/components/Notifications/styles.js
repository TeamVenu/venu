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
  top: var(--topbar-height);
  right: 1rem;
  color: var(--background-color);
  display: flex;
  flex-flow: column;
  justify-content: center;
  animation: ${pop} 0.4s;

  &.error {
    background: var(--error-color);
  }

  &.warning {
    background: var(--warning-color);
  }

  &.success {
    background: var(--success-color);
  }

  p {
    padding: var(--padding);
  }
`;

export const IconWrapper = styled.section`
  padding: var(--padding);

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

export const Button = styled.button`
  background: none;
  padding: var(--padding);
  text-transform: uppercase;
  border-top: 1px solid transparent;

  .error & {
    color: var(--error-color-accent);
    border-color: var(--error-color-accent);
  }

  .warning & {
    color: var(--warning-color-accent);
    border-color: var(--warning-color-accent);
  }

  .success & {
    color: var(--success-color-accent);
    border-color: var(--success-color-accent);
  }

  &:hover {
    color: var(--background-color);

    .error & {
      background: var(--error-color-accent);
    }

    .warning & {
      background: var(--warning-color-accent);
    }

    .success & {
      background: var(--success-color-accent);
    }
  }
`;
