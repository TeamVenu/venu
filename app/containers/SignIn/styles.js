import styled from 'styled-components';
import RITMap from 'media/images/map-gradient-bg.png';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: no-wrap;
  margin: 0 auto;
  width: 100%;
  min-height: 100vh;
  text-align: center;
  overflow: auto;
`;

export const HeaderContainer = styled.header`
  flex: 2;
  background: url(${RITMap}) no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: flex-end;
`;

export const Header = styled.section`
  position: relative;
  margin: 0 auto;
  display: flex;
  // background: blue;
  justify-content: center;
  flex-direction: column;
  width: 90%;
  height: 100%;
  max-width: 1170px;
  justify-content: flex-end;
  color: var(--background-color);
`;


export const Body = styled.ul`
  width: 90%;
  margin: 0 auto;
  max-width: 1170px;
  // flex: 1;
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  justify-content: center;

  li:first-of-type {
    padding-bottom: calc(var(--padding) * 1.5);
  }
`;

export const Footer = styled.section`
  width: 90%;
  max-width: 1170px;
  margin: 0 auto;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1em;
`;

export const Img = styled.img`
  display: block;
  margin: auto;
  height: 52px;
`;
