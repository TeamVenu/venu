import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  :root {
    /* Base colors */
    --white: #fff;
    --black: #000;
    --light: #f3f6fa;
    --dark: #272727;
    --blue: #48b5e9;
    --dark-blue: #66b4d8;

    /* */
    --background-color: var(--white);
    --foreground-color: var(--black);

    --primary-color: var(--blue);
    --accent-color: var(--dark-blue);

    /* */
    --padding: 10px;
    --topbar-height: 50px;

    @media (min-width: 720px) {
      --topbar-height: 80px;
    }
  }

  /* Custom Media queries */
  @custom-media --screen-phone (width <= 35.5em);
  @custom-media --screen-phone-lg (width > 35.5em);

  @custom-media --screen-sm var(--screen-phone) and (width < 48em);
  @custom-media --screen-md (width >= 48em) and (width < 64em);
  @custom-media --screen-lg (width >= 64em) and (width < 80em);
  @custom-media --screen-xl (width >= 80em);

  *,
  *:after,
  *:before {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system, ".SFNSText-Regular", "San Francisco", "Roboto", "Open Sans", sans-serif;
    font-smoothing: antialiased;
    overflow: hidden;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: var(--background-color);
    min-height: 100%;
    min-width: 100%;
  }

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
  }

  p,
  label {
    // line-height: 1.5em;
  }
`;
