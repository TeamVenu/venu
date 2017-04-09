import styled from 'styled-components';

const TabBar = styled.nav`
  // Positioning
  position: relative;
  z-index: 20;

  // Size
  width: 100%;
  height: var(--topbar-height);

  // Styling
  background: ${(props) => props.transparent ? 'none' : 'var(--background-color)'};
  box-shadow: ${(props) => props.borderless ? 'none' : 'inset 0 -7px 1px -7px var(--foreground-color)'};
  color: ${(props) => props.transparent ? 'var(--background-color)' : 'inherit'};
  &.bottom-bar {
    // Positioning
    position: fixed;
    bottom: 0;
    z-index: 9999;

    // Styling
    box-shadow: inset 0 7px 1px -7px var(--foreground-color);

    // Larger Screens
    // @media (min-width: 720px) {
    //   // Positioning
    //   top: 0;
    //   left: 0;
    //   bottom: auto;

    //   // Size
    //   width: var(--topbar-height);
    //   height: 100vh;

    //   // Styling
    //   box-shadow: inset -7px 0 1px -7px var(--foreground-color);
    // }
  }
`;

export default TabBar;
