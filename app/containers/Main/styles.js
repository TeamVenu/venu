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
    height: 100%;
    flex-basis: 80%;
  }
`;
