import styled from 'styled-components';

export const NotificationList = styled.ul`
  position: absolute;
  display: none;
  background: none;
  padding: 0;
  right: 1rem;
  color: var(--foreground-color);
  list-style-type: none;
  font-size: 1rem;

  &.error {
    background: var(--error-color);
    border-color: var(--error-color-accent);
  }

  &.success {
    background: var(--success-color);
    border-color: var(--success-color-accent);
  }

  &.warning {
    background: var(--warning-color);
    border-color: var(--warning-color-accent);
    color: var(--background-color);
  }

  &.visible {
    display: block;
  }
`;

export const NotificationItem = styled.li`
  padding: calc(var(--padding) / 2) var(--padding);
`;

export const NotificationHeader = styled.button`
  padding: calc(var(--padding) / 2) var(--padding);
  width: 100%;
  text-align: left;

  .error & {
    background: var(--error-color-accent);
  }

  .success & {
    background: var(--success-color-accent);
  }

  .warning & {
    background: var(--warning-color-accent);
  }
`;
