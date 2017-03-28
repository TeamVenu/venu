import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  :root {
    /* Base colors */
    --black: #1e1e1e;
    --white: #fff;
    --light: #edeeef;
    --dark: #2b2b2b;
    --dark-grey: #444444;
    --light-gray: #dddfe0;
    --grey: #9e9e9e;
    --red: #fb433b;
    --red-opaque: rgba(251, 67, 59, 0.3);
    --orange: #fa8d39;
    --orange-opaque: rgba(250, 141, 57, 0.3);
    --yellow: #f9af3a;
    --yellow-opaque: rgba(249, 175, 58, 0.3);
    --black-background: #201f1e;
    --white-background: #f1f1f1;
    --black-background-opaque: rgba(32, 31, 30, 0.4);
    --white-background-opaque: rgba(241, 241, 241, 0.8);

    /* Imagine RIT Zone Colors */
    --recreation-zone: #19a3d2;
    --rit-central: #dfb235;
    --ntid-area: #6ac7e8;
    --information-station: #c9905b;
    --think-tank: #c7655a;
    --artistic-alley: #7d5f93;
    --engineering-park: #ec9244;
    --science-center: #f1e11a;
    --business-district: #55a172;
    --innovation-center: #437aa1;
    --global-village: #d6798c;
    --green-place: #95b045;
    --technology-quarter: #2a98bd;
    --computer-zone: #37a19d;

    /* */
    --background-color: var(--white);
    --foreground-color: var(--black);
    --success-color: #62d2a2;
    --success-color-accent: #2aaf74;
    --error-color: #fa7f7f;
    --error-color-accent: #e84a5f;
    --warning-color: #f8fba2;
    --warning-color-accent: #f8da5b;
    --blue-green-gradient-opaque: linear-gradient(to bottom, var(--light-green-opaque), var(--light-blue-opaque));
    --blue-green-gradient: linear-gradient(to bottom, var(--light-green), var(--light-blue));
    --blue-red-gradient: linear-gradient(to bottom, var(--red), var(--blue));


    --warm-gradient: linear-gradient(to top right, var(--red), var(--orange), var(--yellow));
    --warm-gradient-opaque: linear-gradient(to top right, var(--red-opaque), var(--orange-opaque), var(--yellow-opaque));;
    --pin-background-gradient: var(--warm-gradient);
    --pin-background-gradient-opaque: var(--warm-gradient-opaque);
    
    --panel-background-gradient: linear-gradient(to bottom, var(--white-background-opaque), var(--white-background));

    /* */
    --padding: 10px;
    --topbar-height: 50px;
    --pin-size: 30px;

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
    background-color: var(--foreground-color);
    color: var(--foreground-color);
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: var(--background-color);
    min-height: 100%;
    min-width: 100%;
    font-size: 0.875rem;
    overflow: hidden;
  }

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
  }

  p,
  label {
    // line-height: 1.5em;
  }

  i.icon {
    margin-right: 0.5em;
    font-size: 1.2em;
  }

  button:focus {
    outline: 0;
  }

  @media screen and (min-width: 20rem) {
    #app {
      font-size: calc(0.875rem + 0.5 * ((100vw - 20rem) / 60));
    }
  }

  @media screen and (min-width: 80rem) {
    #app {
      font-size: 1.375rem;
    }
  }
`;
