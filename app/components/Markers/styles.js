import styled from 'styled-components';

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
    box-shadow: 0 0 40px var(--blue-pin-accent-color);
  }

  .recommended & {
    background: var(--blue-pin-accent-color-opaque);
    border-color: transparent;
  }

  .bookmarked & {
    background: yellow;
    border-color: transparent;
    box-shadow: 0 0 40px yellow;
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
    background: var(--blue-pin-color);
  }

  .bookmarked & {

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
