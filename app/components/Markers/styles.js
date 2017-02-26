import styled, { keyframes } from 'styled-components';

// Animations

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0px var(--blue-pin-accent-color);
  }

  25% {
    box-shadow: 0 0 20px var(--blue-pin-accent-color);
  }

  50% {
    box-shadow: 0 0 40px var(--blue-pin-accent-color);
  }

  50% {
    box-shadow: 0 0 20px var(--blue-pin-accent-color);
  }

  100% {
    box-shadow: 0 0 0px var(--blue-pin-accent-color);
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

export const PinWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: var(--pin-size);
  width: var(--pin-size);
  height: var(--pin-size);
  border: 1px solid var(--white);

  .exhibit & {
    border-color: var(--blue-pin-accent-color);
    color: transparent;
    border-radius: 50%;
  }

  .recommended & {
    box-shadow: 0 0 40px var(--blue-pin-accent-color);
    animation: ${pulse} 4s ease-out infinite;
  }

  .bookmarked & {
    background: var(--blue-pin-accent-color-opaque);
    border-color: transparent;
    box-shadow: 0 0 40px var(--blue-pin-accent-color);
    animation: ${pulse} 4s ease-out infinite;
  }

  .visited & {
    display: none;
  }

  .facility &  {
    border: 1px solid var(--white);
    background: var(--black);
    color: var(--white);
  }

  &:hover {
    cursor: pointer;

    + section { 
      visibility: visible;
    }
`;

export const Pin = styled.section`
  .exhibit & {
    min-width: calc(var(--pin-size) / 2);
    width: calc(var(--pin-size) / 2);
    height: calc(var(--pin-size) / 2);
    border-radius: 50%;
  }

  .recommended & {

  }

  .bookmarked & {
    background: var(--blue-pin-color);
  }

  .facility & {

  }

  .restroom & {
    // background
  }
`;

export const InfoPane = styled.section`
  margin-top: 10px;
  padding: 10px;
  background: var(--white);
  visibility: hidden;
  z-index: 9999;
  text-align: center;

  .selected & {
    visibility: visible;
  }
`;