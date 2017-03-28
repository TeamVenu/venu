import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router';

// Animations
const pulse = keyframes`
    0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.7);
  }

  100% {
    transform: scale(1);
  }
`;

// Styles
export const POIContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(-50%);
  flex-direction: column;
`;

export const PinPulse = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--pin-size);
  width: var(--pin-size);
  // box-shadow: 0 0 20px black;

  .exhibit & {
    background: var(--pin-background-gradient);
    border-radius: 100%;
  }

  .facility & {
    transform: rotate(45deg);
  }

  .recommended &:before {
      content: '';
      position: absolute;
      width: var(--pin-size);
      height: var(--pin-size);
      background: var(--pin-background-gradient-opaque);
      z-index: -1;
      opacity: 0.3;
      border-radius: 100%;
      // animation: ${pulse} 4s ease-out infinite;
  }

  .visited & {
    background: var(--pin-background-gradient-opaque);
  }
`;

export const PinWrapper = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--pin-size);
  height: var(--pin-size);

  .exhibit & {
    width: calc(var(--pin-size) - 8px);
    height: calc(var(--pin-size) - 8px);
    background: var(--light);
    border-radius: 100%;
  }

  .bookmarked &, 
  .visited & {
    background: none;
  }

  .hidden & {
    display: none;
  }

  .facility & {
    background: var(--foreground-color);
  }
`;

export const Pin = styled.section`
  display: block;
  margin: auto;
  width: calc(var(--pin-size) / 2);
  height: calc(var(--pin-size) / 2);
  background: none;
  width: calc(var(--pin-size) - 8px);
  height: calc(var(--pin-size) - 8px);

  .exhibit & {
    background: var(--pin-background-gradient-opaque);
    border-radius: 100%;
  }

  .bookmarked &,
  .visited & {
    background: none;
  }

  .facility & {
    display: flex;
    justify-content: center:
    align-items: center;
    transform: rotate(-45deg);
  }
`;

export const PinImage = styled.img`
  display: block;
  margin: auto;
  height: calc(var(--pin-size) / 2);
`;
