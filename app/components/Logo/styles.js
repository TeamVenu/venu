import styled from 'styled-components';

export const LogoWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  marging-bottom: 2rem;
`;

export const LogoOuterWhite = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background: var(--background-color);
  border-radius: 100%;
`;

export const LogoGradientOpaque = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(var(--pin-size) + 6px);
  height: calc(var(--pin-size) + 6px);
  background: var(--pin-background-gradient-opaque);
  border-radius: 100%;
`;

export const LogoWhiteStroke = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(var(--pin-size) - 3px);
  height: calc(var(--pin-size) - 3px);
  background: var(--background-color);
  border-radius: 100%;
`;

export const LogoInnerGradient = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(var(--pin-size) - 4px);
  height: calc(var(--pin-size) - 4px);
  background: var(--pin-background-gradient);
  border-radius: 100%;
`;
