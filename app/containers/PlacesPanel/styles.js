import styled from 'styled-components';

export const Wrapper = styled.section`
  position: absolute;
  bottom: -400px;
  background: var(--panel-background-gradient);
  box-shadow: 0 -10px 10px var(--black-background-opaque);
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 15;

  @media (min-width: 720px) {
    position: relative;
    bottom: auto;
    flex-basis: 20%;
    display: block;
    box-shadow: -10 0px 10px var(--black-background-opaque);
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
  display: block;
  max-width: 90%;
  height: 100%;
  overflow: auto;
  margin: 0 auto;
  // Needs to be altered
  padding: 0 0 200px;

  @media (min-width: 720px) {
    max-width: none;
  }
`;

export const Item = styled.li`
  display: flex;
  flex-direction: column;
  background: var(--white);
  border-bottom: 1px solid var(--light);
  margin-bottom: var(--padding);
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

  &:focus {
    outline: 0;
    // cursor: grabbing;
  }

  @media (min-width: 720px) {
    display: none;
  }
`;

export const Handle = styled.span`
  width: 100px;
  height: 10px;
  border: none;
  border-radius: 8px;
  background: var(--white);
`;
