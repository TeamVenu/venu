import styled from 'styled-components';

export const Wrapper = styled.section`
  position: relative;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  transform: translateY(-75%);
  
  @media (min-width: 720px) {
    transform: translateY(0);
    flex-basis: 30%;
  }
`;

export const Title = styled.h1`
  position: relative;
  margin: 0;
  font-size: 1.8em;
  color: var(--white);
  padding: calc(var(--padding) * 2) var(--padding);

  @media (min-width: 720px) {
    top: var(--topbar-height);
  }
`;

export const ListView = styled.ul`
  position: relative;
  margin: 0;
  padding: 0 var(--padding);
  margin-top: calc(var(--padding) * 2);
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow-x: scroll;
  padding-right: 100px;
  
  @media (min-width: 720px) {
    margin-top: var(--topbar-height);
    overflow-x: hidden;
    overflow-y: scroll;
    height: 100%;
    flex-direction: column;
    padding-right: var(--padding);
    padding-bottom: 100px;
  }
`;

export const Item = styled.li`
  display: inline;
  background: var(--accent-color);
  margin-right: calc(var(--padding) * 2);
  padding: var(--padding);
  min-width: 200px;
  border-radius: 4px;

  @media (min-width: 720px) {
    margin-right: 0;
    margin-bottom: calc(var(--padding) * 2);
  }
`;

export const ItemTitle = styled.h2``;

export const ItemSubtitle = styled.h3``;

export const ItemCategory = styled.p``;
