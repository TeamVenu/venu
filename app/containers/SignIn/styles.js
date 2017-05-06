import styled from 'styled-components';
import RITMap from 'media/images/map-gradient-bg.png';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  flex-wrap: no-wrap;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  text-align: center;
  overflow: auto;

  @media screen and (min-height: 380px) {
    height: 100vh;
  }
`;

export const HeaderContainer = styled.header`
  position: relative;
  background: url(${RITMap}) no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: flex-end;
  height: 50%;
`;

export const Header = styled.section`
  margin: 0 auto;
  padding: 2em 0;
  display: flex;
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
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 30%;
  padding-top: var(--padding);
  
  li {
    margin-bottom: var(--padding);
  }

  // li:last-of-type {
  //   padding-bottom: var(--padding);
  // }
`;

export const Footer = styled.section`
  width: 90%;
  max-width: 1170px;
  margin: 0 auto;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--padding);
  height: 15%;
  text-align: center;
`;

export const Img = styled.img`
  display: block;
  margin: auto;
  max-height: 64px;
`;
