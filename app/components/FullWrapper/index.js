import styled from 'styled-components';

import RITMap from 'media/rit map.png';

const FullWrapper = styled.section`
  position: relative;
  margin: 0;
  width: 100%;
  min-height: 100vh;

  &.full-page + .bottom-bar {
    display: none;
  }

  &.map-bg {
    background: url(${RITMap}) no-repeat center center;
  }

  &.gradient-bg {
    background: var(--pin-background-gradient);
    color: var(--background-color);
  }

  &.opaque {
    opacity: 0.9;
  }
`;

export default FullWrapper;
