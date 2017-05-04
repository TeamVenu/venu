import styled from 'styled-components';

export const Wrapper = styled.section`
  position: relative;
  margin: 0;
  width: 100%;
  height: calc(100vh - var(--topbar-height));
  -webkit-box-orient: horizontal;
  -o-box-orient: horizontal;
  display: flex;
  flex-flow: row wrap;
`;

export const MapWrapper = styled.section`
  position: absolute;
  top: calc(calc(var(--topbar-height) / 1.2) + calc(var(--topbar-height) / 1.2));
  width: 100vw;
  height: calc(100vh - calc(calc(calc(var(--topbar-height) / 1.2) + calc(var(--topbar-height) / 1.2)) + var(--topbar-height)));
  z-index: 10;
`;

export const UserPinWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const UserPin = styled.section`
  width: 40px;
  min-width: 40px;
  height: 40px;
  background: var(--background-color);
  border: 3px solid var(--foreground-color);
  // box-shadow: 0 0 40px black;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(-100%);
  
  &:hover {
    cursor: pointer;

    & + section {
      visibility: visible;
    }
  }
`;

export const UserImage = styled.img`
  display: block;
  width: 16px;
  height: 16px;
`;

export const UserInfo = styled.section`
  margin-top: 10px;
  padding: 10px;
  background: var(--white);
  visibility: hidden;
  z-index: 9999;
  text-align: center;
`;
