import styled from 'styled-components';

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
  justify-content: space-between;
  align-items: baseline;

  @media (min-width: 720px) {
    flex-basis: 100%;
    padding: 0 25px;
    align-items: center;
  }
`;

export const AppTitle = styled.a`
  color: var(--white);
  text-decoration: none;
  letter-spacing: 1px;
  font-size: 1.5em;
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
  font-size: 1em;
  letter-spacing: 1px;

  &.selected {
    border-bottom: 3px solid var(--white);
  }
`;
