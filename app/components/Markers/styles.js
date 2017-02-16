import styled from 'styled-components';

export const PinWrapper = styled.section`
  // width: 0;
  // height: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Pin = styled.section`
  width: 20px;
  min-width: 20px;
  height: 20px;
  border: 2px solid ${(props) => props.event ? 'var(--accent-color)' : 'palevioletred'};
  border-radius: 100% 100% 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(-100%);

  &:hover {
    cursor: pointer;
    background: ${(props) => props.event ? 'var(--accent-color)' : 'palevioletred'};
  }
`;

export const EventPinWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: var(--pin-size);
  width: var(--pin-size);
  height: var(--pin-size);
  border: 1px solid var(--blue-pin-accent-color);
  border-radius: 50%;
  box-shadow: 0 0 40px var(--blue-pin-accent-color);
  background: ${(props) => props.highlight ? 'var(--blue-pin-accent-color-opaque)' : 'none'};
  border-color: ${(props) => props.highlight ? 'transparent' : 'var(--blue-pin-accent-color)'};

  &:hover {
    cursor: pointer;

    + div { 
      display: block;
    }
  }
`;

export const EventPin = styled.section`
  background: ${(props) => props.highlight ? 'var(--blue-pin-color);' : 'none'};
  min-width: calc(var(--pin-size) / 2);
  width: calc(var(--pin-size) / 2);
  height: calc(var(--pin-size) / 2);
  border-radius: 50%;
`;

export const FacilityPinWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: var(--pin-size);
  width: var(--pin-size);
  height: var(--pin-size);
  border: 1px solid var(--white);
  background: var(--black);

  &:hover {
    cursor: pointer;

    + div { 
      display: block;
    }
  }
`;

export const FacilityPin = styled.p`
  color: var(--white);
`;

export const TextWrapper = styled.div`
  margin-top: 10px;
  padding: 10px;
  background: var(--white);
  display: none;
  z-index: 9999;

  &.show {
    display: block;
  }
`;

export const Text = styled.p`
  text-align: center;
`;
