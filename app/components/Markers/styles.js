import styled, { keyframes } from 'styled-components';
import Ionicon from 'react-ionicons';
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
  
  // Makes exhibits opaque based on mode
  // .exhibit:not(.selected) & {
  //   opacity: 0.3;
  // }

  .exhibit & {
    background: var(--pin-background-gradient);
    border-radius: 100%;
  }

  .facility & {
    transform: rotate(45deg);
  }

  // .recommended &:before {
  //     content: '';
  //     position: absolute;
  //     width: var(--pin-size);
  //     height: var(--pin-size);
  //     background: var(--pin-background-gradient-opaque);
  //     z-index: -1;
  //     opacity: 0.3;
  //     border-radius: 100%;
  //     // animation: ${pulse} 4s ease-out infinite;
  // }

  .recommended & {
    background: var(--pin-background-gradient-opaque);
  }

  .saved & {
    background: var(--pin-background-saved-gradient-opaque);
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
  color: var(--background-color);

  .exhibit & {
    width: calc(var(--pin-size) - 8px);
    height: calc(var(--pin-size) - 8px);
    background: var(--light);
    border-radius: 100%;
  }

  .hidden & {
    display: none;
  }

  .facility & {
    background: var(--gray);
    border-radius: 4px;
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

  .recommended & {
    background: var(--pin-background-gradient);
  }

  .saved & {
    background: var(--pin-background-saved-gradient);
  }

  .visited & {
    background: var(--pin-background-gradient-opaque);
  }

  .facility & {
    display: flex;
    justify-content: center;
    align-items: center;
    transform: rotate(-45deg);
  }
`;

export const PinIcons = styled.section`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`;

export const PinIcon = styled(Ionicon)`
  margin: auto;
`;
