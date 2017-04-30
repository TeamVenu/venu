import styled from 'styled-components';

import RITMap from 'media/images/map-gradient-bg.png';

const FullWrapper = styled.section`
  position: relative;
  margin: 0;
  width: 100%;
  min-height: 100vh;
  padding-bottom: ${(props) => (props.bottomPadding) ? 'calc(var(--topbar-height) * 1.5);' : '0'};

  &.centered {
    margin: 0 auto;
    width: 90%;
    max-width: 720px;
    display: flex;
    flex-direction: column;
  }

  &.full-page + .bottom-bar {
    display: none;
  }

  &.map-bg {
    background: url(${RITMap}) no-repeat center center;
    background-size: cover;
  }

  &.gradient-bg {
    background: var(--pin-background-gradient);
    color: var(--background-color);
  }

  &.opaque {
    opacity: 0.8;
  }
`;

export default FullWrapper;
