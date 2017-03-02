import styled from 'styled-components';

export const Wrapper = styled.section`
  position: relative;
  background: var(--white);
  height: 100%;
  overflow: hidden;
  z-index: 0;

  @media (min-width: 720px) {
    flex-basis: 20%;
    display: block;
  }
`;

export const Title = styled.h1`
  // position: relative;
  // margin: 0;
  // font-size: 1.8em;
  // color: var(--white);
  // padding: calc(var(--padding) * 2) var(--padding);

  // @media (min-width: 720px) {
  //   top: var(--topbar-height);
  // }
`;

export const ListView = styled.ul`
  height: 100%;
  overflow: auto;
  margin: 0;
  padding: 0 0 50px;

  @media (min-width: 720px) {
    padding-bottom: 100px;
  }
`;

export const Item = styled.li`
  display: flex;
  flex-direction: column;
  background: var(--white);
  border-bottom: 1px solid var(--light);
  padding: var(--padding);
  text-decoration: none;
  cursor: pointer;

  &:last-of-type {
    border: none;
  }

  // Add these later to edit based on type
  &.exhibit {
    color: var(--accent-color);
  }

  // &.facility { }
  // &.restroom { }
`;

export const ItemTitle = styled.h2`
  flex: 2;
`;

export const ItemSubtitle = styled.h3``;

export const ItemCategory = styled.p``;

export const HandleWrapper = styled.button`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: row-resize;

  // &:focus {
  //   cursor: grabbing;
  // }

  @media (min-width: 720px) {
    display: none;
  }
`;

export const Handle = styled.span`
  width: 100px;
  height: 10px;
  border: none;
  border-radius: 8px;
  background: grey;
`;
