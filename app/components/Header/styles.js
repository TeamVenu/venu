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

export const MenuButton = styled.button`
  background: red;
  border: none;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;

  &:focus {
    outline: 0;
  }

  &:hover div {
    color: var(--primary-color);
  }
`;

export const HamburgerIcon = styled.div`
  color: var(--white);
  position: relative;
  width: 20px;
  height: 1px;
  background-color: currentColor;

  &:before, 
  &:after {
    content: '';
    position: absolute;
    left: 0;
    width: 20px;
    height: 1px;
    background-color: currentColor;
  }
  &:before {
    margin-top: -7px;
  }
  &:after {
    top: 7px;
  }
`;

export const SearchIcon = styled.div`
  color: var(--foreground-color);
  position: absolute;
  width: 15px;
  height: 15px;
  margin-left: -1px;
  border: 1px solid currentColor;
  border-radius: 100%;
  transform: rotate(-45deg);

  &:before {
    content: '';
    position: absolute;
    top: 13px;
    left: 7px;
    height: 8px;
    width: 1px;
    background-color: currentColor;
  }
`;
