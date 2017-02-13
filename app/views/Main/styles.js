import styled from 'styled-components';

export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  marging: 0;
  height: 100vh;
  -webkit-box-orient: horizontal;
  -o-box-orient: horizontal;

  @media (min-width: 720px) {
    flex-direction: row;
  }
`;

export const MapWrapper = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
`;
