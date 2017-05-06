import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  :root {
    /* Base colors */
    --black: #3a3940;
    --white: #fff;
    --light: #edeeef;
    --dark: #222222;
    --dark-grey: #444444;
    --light-gray: #f7f7f7;
    --gray: #535353;
    --grey: #acacac;
    --green: #62d2a2;
    --green-accent: #2aaf74;
    --red: #ff2e35;
    --red-accent: #cc252a;
    --red-opaque: rgba(255, 46, 53, 0.3);
    --orange: #fc7f3e;
    --orange-opaque: rgba(252, 127, 62, 0.3);
    --yellow: #faa842;
    --yellow-accent: #e0973b;
    --yellow-opaque: rgba(250, 168, 66, 0.3);
    --aqua: #00ddd4;
    --aqua-opaque: rgba(0, 221, 212, 0.3);
    --light-blue: #11b4ff;
    --light-blue-opaque: rgba(17, 180, 255, 0.3);
    --blue: #2a55e9;
    --blue-opaque: rgba(42, 85, 233, 0.3);
    --black-background: #222222;
    --white-background: #dddcde;
    --black-background-opaque: rgba(34, 34, 34, 0.4);
    --white-background-opaque: rgba(221, 220, 222, 0.8);
    --facebook-background: #3b5998;

    /* Imagine RIT Zone Colors */
    --recreation-zone: #42b0f4;
    --rit-central: #f7bf41;
    --ntid-area: #ef45e3;
    --information-station: #c9905b;
    --think-tank: #f74141;
    --artistic-alley: #a241f7;
    --engineering-park: #f9973e;
    --science-center: #f4eb42;
    --business-district: #41f75b;
    --innovation-center: #4187f7;
    --global-village: #ef45ae;
    --green-place: #abf244;
    --technology-quarter: #4187f7;
    --computer-zone: #3ef9c8;

    /* */
    --background-color: var(--white);
    --foreground-color: var(--black);
    --primary-accent-color: var(--orange);
    --success-color: var(--green);
    --success-color-accent: var(--green-accent);
    --error-color: var(--red);
    --error-color-accent: var(--red-accent);
    --warning-color: var(--yellow);
    --warning-color-accent: var(--yellow-accent);

    --cold-gradient: linear-gradient(to top right, var(--blue), var(--light-blue), var(--aqua));
    --cold-gradient-opaque: linear-gradient(to top right, var(--blue-opaque), var(--light-blue-opaque), var(--aqua-opaque));;
    --warm-gradient: linear-gradient(to top right, var(--red), var(--orange), var(--yellow));
    --warm-gradient-opaque: linear-gradient(to top right, var(--red-opaque), var(--orange-opaque), var(--yellow-opaque));;
    --pin-background-gradient: var(--warm-gradient);
    --pin-background-gradient-opaque: var(--warm-gradient-opaque);
    --pin-background-saved-gradient: var(--cold-gradient);
    --pin-background-saved-gradient-opaque: var(--cold-gradient-opaque);

    --panel-background-gradient: linear-gradient(to bottom, var(--white-background-opaque), var(--white-background));

    /* */
    --padding: 10px;
    --topbar-height: 40px;
    --segment-bar-height: 36px;
    --tab-bar-height: 50px;
    --pin-size: 30px;

    @media (min-width: 760px) {
      --topbar-height: 50px;
      --tab-bar-height: 60px;
      --segment-bar-height: 42px;
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
    background-color: var(--background-color);
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
    margin-left: 0.5em;
    margin-right: 0.5em;
    font-size: 1.2em;
  }

  button:focus {
    outline: 0;
  }

  .slider-slide {
    padding: var(--padding) 0;
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
