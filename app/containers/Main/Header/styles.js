import styled from 'styled-components';
import { Link } from 'react-router';

export const Topbar = styled.header`
  position: relative;
  width: 100%;
  padding: 0 var(--padding);
  height: var(--topbar-height);
  line-height: var(--topbar-height);
  background: var(--header-background-gradient);
  box-shadow: 0 10px 10px var(--black-background-opaque);
  color: var(--white);
  z-index: 10;

  display: flex;
  flex: 1;
  justify-content: center;
  align-items: baseline;

  @media (min-width: 720px) {
    flex-basis: 100%;
    padding: 0 25px;
    justify-content: space-between;
    align-items: center;
  }
`;

export const AppTitle = styled(Link)`
  display: none;
  color: var(--white);
  text-decoration: none;
  letter-spacing: 1px;
  font-size: 1.5em;

  @media (min-width: 720px) {
    display: block;
  }
`;

export const ModeWrapper = styled.nav`
  overflow-x: auto;
`;

export const ModeList = styled.ul`
  margin: 0;
  padding: 0;
`;

export const ModeListItem = styled.li`
  display: inline;
  padding: var(--padding);
  letter-spacing: 1px;
  color: var(--grey);

  &.selected {
    color: var(--foreground-color);
    border-bottom: 3px solid var(--foreground-color);
  }
`;
