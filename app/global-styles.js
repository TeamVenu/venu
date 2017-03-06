import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  :root {
    /* Base colors */
    --black: #1e1e1e;
    --white: #f1f1f1;
    --light: #e2e2e3;
    --dark: #2b2b2b;
    --dark-grey: #444444;
    --red: #f9000c;
    --blue: #00d8f9;
    --dark-blue: #66b4d8;
    --blue-pin-accent-color: #1b80a5;
    --blue-pin-color: #24bdf6;
    --blue-pin-accent-color-opaque: rgba(29, 131, 168, 0.9);
    --light-blue: #0dfff9;
    --light-green: #7aea35;
    --light-blue-opaque: rgba(13, 255, 249, 0.3);
    --light-green-opaque: rgba(122, 234, 53, 0.3);
    --black-background: #201f1e;
    --black-background-opaque: rgba(32, 31, 30, 0.4);
    --white-background-opaque: rgba(241, 241, 241, 0.8);
    --grey: #9e9e9e;

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
    --background-color: var(--black);
    --foreground-color: var(--white);
    --blue-green-gradient-opaque: linear-gradient(to bottom, var(--light-green-opaque), var(--light-blue-opaque));
    --blue-green-gradient: linear-gradient(to bottom, var(--light-green), var(--light-blue));
    --blue-red-gradient: linear-gradient(to bottom, var(--red), var(--blue));
    --header-background-gradient: linear-gradient(to bottom, var(--black-background), var(--black-background-opaque));
    --panel-background-gradient: linear-gradient(to bottom, var(--black-background-opaque), var(--black-background));
    --card-background-gradient: linear-gradient(to bottom, var(--white), var(--grey));
    --detail-background-gradient: linear-gradient(to bottom, var(--white-background-opaque), var(--white));
    --primary-color: var(--blue);
    --accent-color: var(--dark-blue);

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
    overflow: hidden;
    color: var(--foreground-color);
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

  i.icon {
    margin-right: 0.5em;
    font-size: 1.2em;
  }
`;
  // Hide Google Maps Attribution
  // .gm-style a[title='Click to see this area on Google Maps']{ display: none!important; }

  // .gm-style a[href^="https://maps.google.com/maps"] {
  //   display: none !important;
  // }

  // .gm-style-cc {
  //   display: none !important;
  // }

  // a[href$="google.com/maps"], .gmnoprint:not(.gm-bundled-control) {
  //   display: none !important
  // }

  // .gm-bundled-control .gmnoprint {
  //     display: block;
  // }
