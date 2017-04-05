import styled from 'styled-components';
// import { Link } from 'react-router';

export const Topbar = styled.header`
  position: relative;
  width: 100%;
  height: var(--topbar-height);
  line-height: var(--topbar-height);
  background: var(--background-color);
  z-index: 10;
  display: flex;

  @media (min-width: 720px) {
    padding: 0 25px;
  }
`;

export const ModeWrapper = styled.nav`
  position: relative;
  width: 100%;
  height: var(--topbar-height);
  overflow-x: auto;
`;

export const ModeList = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const ModeListItem = styled.li`
  margin: 0 var(--padding);
  display: block;
  letter-spacing: 1px;
  border-bottom: 5px solid transparent;

  &.selected {
    color: var(--foreground-color);
    border-color: var(--foreground-color);
  }
`;
