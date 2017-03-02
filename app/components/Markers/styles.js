import styled, { keyframes } from 'styled-components';

// Animations

const pulse = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.5);
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

export const PinWrapper = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--pin-size);
  height: var(--pin-size);
  border: 1px solid var(--white);

  .exhibit & {
    background: var(--black);
    border: none;
    border-radius: 100%;

    &:before {
      content: '';
      position: absolute;
      width: calc(var(--pin-size) + 4px);
      height: calc(var(--pin-size) + 4px);
      background: var(--blue-green-gradient);
      z-index: -1;
      border-radius: 100%;
    }
  }

  .recommended & {

    &:after {
      content: '';
      position: absolute;
      width: calc(var(--pin-size) + 2px);
      height: calc(var(--pin-size) + 2px);
      background: var(--blue-green-gradient-opaque);
      z-index: -1;
      opacity: 0.3;
      border-radius: 100%;
      animation: ${pulse} 4s ease-out infinite;
    }
  }

  .bookmarked & {
    background: var(--blue-green-gradient-opaque);

    &:before {
      content: '';
      position: absolute;
      width: calc(var(--pin-size) + 4px);
      height: calc(var(--pin-size) + 4px);
      background: none;
      z-index: -1;
      border-radius: 100%;
    }

    &:after {
      content: '';
      position: absolute;
      width: calc(var(--pin-size) + 2px);
      height: calc(var(--pin-size) + 2px);
      background: var(--blue-green-gradient-opaque);
      z-index: -1;
      opacity: 0.3;
      border-radius: 100%;
      animation: ${pulse} 4s ease-out infinite;
    }
  }

  .visited & {
    display: none;
  }

  .facility &  {
    border: 1px solid var(--white);
    background: var(--black);
    color: var(--white);
    box-shadow: 0 0 40px black;
    transform: rotate(45deg);
  }

  &:hover {
    cursor: pointer;

    + section { 
      visibility: visible;
    }
`;

export const Pin = styled.section`
  display: block;
  margin: auto;
  width: calc(var(--pin-size) / 2);
  height: calc(var(--pin-size) / 2);

  .exhibit & {
    border-radius: 100%;
  }

  .recommended & {
    background: var(--blue-green-gradient);
  }

  .bookmarked & {
    background: var(--blue-green-gradient);
  }

  .facility & {
    display: flex;
    justify-content: center:
    align-items: center;
    transform: rotate(-45deg);
    transform-origin: 45% 45%;
  }

  .restroom & {
  }
`;

export const PinImage = styled.img`
  display: block;
  margin: auto;
  height: calc(var(--pin-size) / 2);
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
