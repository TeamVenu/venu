import styled from 'styled-components';

export const Bar = styled.section`
  height: 100%;
  position: relative;
  /*overflow: hidden;*/
  background: var(--background-color);

  display: flex;
  flex-direction: column;  
  order: 2;
  flex: 1;

  @media (min-width: 720px) {
    display: block;
    flex-direction: row;
    order: 1;
    flex: 1;
  }
`;

export const Title = styled.h1`
  flex: 1;
  border-bottom: 1px solid var(--dark);
  padding: calc(var(--padding) * 2) var(--padding);
  font-size: 1.8em;
  margin: 0;
`;
