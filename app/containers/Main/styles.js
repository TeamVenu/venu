import styled from 'styled-components';

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin: 0;
  height: 100vh;
  -webkit-box-orient: horizontal;
  -o-box-orient: horizontal;

  @media (min-width: 720px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

export const MapWrapper = styled.section`
  position: relative;
  width: 100%;
  height: calc(100% - 200px);
  margin-top: var(--topbar-height);
  
  @media (min-width: 720px) {
    margin-top: 0;
    height: calc(100% - var(--topbar-height));
    flex-basis: 80%;
  }
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
  background: var(--white);
  border: 3px solid var(--black);
  box-shadow: 0 0 40px black;
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
