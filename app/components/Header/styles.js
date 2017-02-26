import styled from 'styled-components';

export const Topbar = styled.header`
  position: relative;
  width: 100%;
  padding: 0 var(--padding);
  height: var(--topbar-height);
  line-height: var(--topbar-height);
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
  color: var(--accent-color);
  text-decoration: none;
  letter-spacing: 1px;
  font-size: 1.5em;
  /* box-shadow: 5px -1px 5px var(--accent-color); */
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
  color: var(--accent-color);

  &.selected {
    border-bottom: 3px solid var(--accent-color);
  }
`;

export const PlaceHolder = styled.a`
  color: var(--accent-color);
  text-decoration: none;
  letter-spacing: 1px;
  font-size: 1.5em;
`;
