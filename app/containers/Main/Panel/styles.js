import styled from 'styled-components';
import { Link } from 'react-router';

export const Wrapper = styled.section`
  height: 100%;
  left: 0;
  top: 55%;
  position: absolute;
  flex-direction: column;
  order: 2;
  flex: 1;
  background: var(--panel-background-gradient);
  box-shadow: 0 -10px 10px var(--black-background-opaque);
  z-index: 15;
  transition: top 0.2s;
  width: 100%;

  &.full {
    top: var(--topbar-height);
  }

  &.collapsed {
    top: 75%;
  }

  @media (min-width: 720px) {
    position: relative;
    display: block;
    flex-direction: row;
    flex: 1;
    flex-basis: 30%;
    box-shadow: -10 0px 10px var(--black-background-opaque);
    top: 0;

    &.full,
    &.collapsed {
      top: 0;
    }
`;

export const Title = styled.h5`
  position: relative;
  width: 90%;
  margin: 0 auto;
  font-size: 1em;
  color: var(--white);
  padding: var(--padding);
  font-weight: 400;

  @media (min-width: 720px) {
    width: 100%;
  }
`;

export const HandleWrapper = styled.button`
  position: relative;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: row-resize;
  z-index: 15;

  &:focus {
    outline: 0;
  }

  @media (min-width: 720px) {
    display: none;
  }
`;

export const Handle = styled.span`
 /* Center it lame way because Safari 😩 */
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 10px;
  border: none;
  border-radius: 8px;
  background: var(--white);
`;

// List View
export const ListView = styled.ul`
  display: flex;
  flex-direction: column;
  max-width: 90%;
  height: 100%;
  overflow-y: auto;
  margin: 0 auto;
  // Needs to be altered
  padding: 0 0 75vh;

  .full & {
    padding-bottom: 25vh;
  }

  .collapsed & {
    padding-bottom: 90vh;
  }

  @media (min-width: 720px) {
    max-width: none;
    padding-bottom: 200px;
  }
`;

export const Item = styled.li`
  margin-bottom: var(--padding);
`;

export const ItemTitle = styled.h2`
  flex: 2;
`;

export const ItemSubtitle = styled.h3``;

export const ItemCategory = styled.p``;

export const DetailSubHeader = styled.section`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-bottom: var(--padding);

  p:first-of-type {
    margin-right: calc(var(--padding) * 2);
  }
`;

export const ItemLink = styled(Link)`
  display: block;
  height: 100%;
  padding: var(--padding);
  background: var(--foreground-color);
  color: var(--background-color);
  text-decoration: none;

  border-top: 5px solid transparent;
  
  .recreationZone & {
    border-color: var(--recreation-zone);
  }

  .ritCentral & {
    border-color: var(--rit-central);
  }

  .ntidArea & {
    border-color: var(--ntid-area);
  }

  .informationStation & {
    border-color: var(--information-station);
  }

  .thinkTank & {
    border-color: var(--think-tank);
  }

  .artisticAlley & {
    border-color: var(--artistic-alley);
  }

  .engineeringPark & {
    border-color: var(--engineering-park);
  }

  .scienceCenter & {
    border-color: var(--science-center);
  }

  .businessDistrict & {
    border-color: var(--business-district);
  }

  .innovationCenter & {
    border-color: var(--innovation-center);
  }

  .globalVillage & {
    border-color: var(--global-village);
  }

  .greenPlace & {
    border-color: var(--green-place);
  }

  .technologyQuarter & {
    border-color: var(--technology-quarter);
  }

  .computerZone & {
    border-color: var(--computer-zone);
  }

  // Add these later to edit based on type
  // .exhibit & { }

  // .facility & { }
  // .restroom & { }
`;
