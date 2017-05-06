import styled from 'styled-components';

export const Wrapper = styled.section`
  position: relative;
  margin: 0;
  width: 100%;
  height: 100vh;
`;

export const MapWrapper = styled.section`
  position: absolute;
  top: calc(var(--topbar-height) + var(--segment-bar-height));
  width: 100vw;
  height: calc(100% - (var(--tab-bar-height) + var(--segment-bar-height) + var(--topbar-height)));
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
