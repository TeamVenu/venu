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
    flex-basis: 30%;
    display: block;
    box-shadow: -10 0px 10px var(--black-background-opaque);
  }
`;

export const Title = styled.h5`
  position: relative;
  margin: 0;
  font-size: 1em;
  color: var(--white);
  padding: var(--padding);
  font-weight: 400;
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

// List View
export const ListView = styled.ul`
  display: block;
  max-width: 90%;
  height: 100%;
  overflow-y: auto;
  margin: 0 auto;
  // Needs to be altered
  padding: 0 0 75vh;

  @media (min-width: 720px) {
    max-width: none;
  }
`;

export const Item = styled.li`
  display: flex;
  flex-direction: column;
  background: var(--foreground-color);
  margin-bottom: var(--padding);
  padding: var(--padding);
  text-decoration: none;
  cursor: pointer;
  color: var(--background-color);

  border-top: 5px solid transparent;
  
  &.recreationZone {
    border-color: var(--recreation-zone);
  }

  &.ritCentral {
    border-color: var(--rit-central);
  }

  &.ntidArea {
    border-color: var(--ntid-area);
  }

  &.informationStation {
    border-color: var(--information-station);
  }

  &.thinkTank {
    border-color: var(--think-tank);
  }

  &.artisticAlley {
    border-color: var(--artistic-alley);
  }

  &.engineeringPark {
    border-color: var(--engineering-park);
  }

  &.scienceCenter {
    border-color: var(--science-center);
  }

  &.businessDistrict {
    border-color: var(--business-district);
  }

  &.innovationCenter {
    border-color: var(--innovation-center);
  }

  &.globalVillage {
    border-color: var(--global-village);
  }

  &.greenPlace {
    border-color: var(--green-place);
  }

  &.technologyQuarter {
    border-color: var(--technology-quarter);
  }

  &.computerZone {
    border-color: var(--computer-zone);
  }

  // Add these later to edit based on type
  &.exhibit { }

  // &.facility { }
  // &.restroom { }
`;

export const ItemTitle = styled.h2`
  flex: 2;
`;

export const ItemSubtitle = styled.h3``;

export const ItemCategory = styled.p``;

// Detail View
export const DetailWrapper = styled.section`
  padding: var(--padding) var(--padding) 75vh;
  display: block;
  max-width: 100%;
  height: 100vh;
  overflow-y: auto;
  margin: 0 auto;
  background: var(--foreground-color);
  color: var(--background-color);
  border-top: 10px solid transparent;

  &.recreationZone {
    border-color: var(--recreation-zone);
  }

  &.ritCentral {
    border-color: var(--rit-central);
  }

  &.ntidArea {
    border-color: var(--ntid-area);
  }

  &.informationStation {
    border-color: var(--information-station);
  }

  &.thinkTank {
    border-color: var(--think-tank);
  }

  &.artisticAlley {
    border-color: var(--artistic-alley);
  }

  &.engineeringPark {
    border-color: var(--engineering-park);
  }

  &.scienceCenter {
    border-color: var(--science-center);
  }

  &.businessDistrict {
    border-color: var(--business-district);
  }

  &.innovationCenter {
    border-color: var(--innovation-center);
  }

  &.globalVillage {
    border-color: var(--global-village);
  }

  &.greenPlace {
    border-color: var(--green-place);
  }

  &.technologyQuarter {
    border-color: var(--technology-quarter);
  }

  &.computerZone {
    border-color: var(--computer-zone);
  }

  @media (min-width: 720px) {
    // padding: 4.5em 2.5em;
  }

  @media (min-width: 1200px) {
    // padding: 6em 0em 4em;
  }
`;

export const DetailHeader = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: var(--padding);
`;

export const DetailSubHeader = styled.section`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-bottom: var(--padding);

  p:first-of-type {
    margin-right: calc(var(--padding) * 2);
  }
`;

export const DetailExitButton = styled.button`
  padding-right: 0;
  font-size: 1.2em;
  align-item: flex-end;
  padding: var(--padding);

  &:focus {
    outline: 0;
  }
`;

export const DetailTitle = styled.h1`
  font-size: 2em;
`;

export const DetailSectionTitle = styled.h3`
  font-size: 1.1em;
  text-transform: uppercase;
  margin-top: var(--padding);
`;

export const DetailInfo = styled.p`
  font-size: 0.9em;
  font-weight: 300;
`;

export const FlexListView = styled.ul`
  display: flex;
  flex-flow: row wrap;
  list-style-type: none;
  margin-left: 0;
  padding-left: 0;

  li {
    margin: 0 var(--padding) var(--padding) 0;
  }
`;

export const TagListItem = styled.li`
  border-radius: 50px;
  margin-right: var(--padding);
  padding: calc(var(--padding) / 2) calc(var(--padding) * 1.5);
  background: var(--dark);
  color: var(--foreground-color);

  &:hover {
    // background: var(--grey);
  }
`;

export const DetailCTAButton = styled.button`
  // position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  align-self: flex-end;
  left: 0;
  bottom: 0;
  border: none;
  padding: calc(var(--padding) * 2);
  text-align: center;
  text-decoration: none;
  color: var(--foreground-color);


  &:focus {
    outline: 0;
  }

  @media (min-width: 720px) {
      // right: 50%;
      // bottom: 50%;
      // transform: translateX(50%);
      // right: 0;
      // left: auto;
      // width: 55vh;
  }

  .recreationZone & {
    background: var(--recreation-zone);

    &:hover {
      // background: var(--grey);
      // color: var(--recreation-zone);
    }
  }

  .ritCentral & {
    background: var(--rit-central);

    &:hover {
      // background: var(--grey);
      // color: var(--rit-central);
    }
  }

  .ntidArea & {
    background: var(--ntid-area);

    &:hover {
      // background: var(--grey);
      // color: var(--ntid-area);
    }
  }

  .informationStation & {
    background: var(--information-station);

    &:hover {
      // background: var(--grey);
      // color: var(--information-station);
    }
  }

  .thinkTank & {
    background: var(--think-tank);

    &:hover {
      // background: var(--grey);
      // color: var(--think-tank);
    }
  }

  .artisticAlley & {
    background: var(--artistic-alley);

    &:hover {
      // background: var(--grey);
      // color: var(--artistic-alley);
    }
  }

  .engineeringPark & {
    background: var(--engineering-park);

    &:hover {
      // background: var(--grey);
      // color: var(--engineering-park);
    }
  }

  .scienceCenter & {
    background: var(--science-center);
    color: var(--background-color);

    &:hover {
      // background: var(--grey);
      // color: var(--science-center);
    }
  }

  .businessDistrict & {
    background: var(--business-district);

    &:hover {
      // background: var(--grey);
      // color: var(--business-district);
    }
  }

  .innovationCenter & {
    background: var(--innovation-center);

    &:hover {
      // background: var(--grey);
      // color: var(--innovation-center);
    }
  }

  .globalVillage & {
    background: var(--global-village);

    &:hover {
      // background: var(--grey);
      // color: var(--global-village);
    }
  }

  .greenPlace & {
    background: var(--green-place);

    &:hover {
      // background: var(--grey);
      // color: var(--green-place);
    }
  }

  .technologyQuarter & {
    background: var(--technology-quarter);
    
    &:hover {
      // background: var(--grey);
      // color: var(--technology-quarter);
    }
  }

  .computerZone & {
    background: var(--computer-zone);

    &:hover {
      // background: var(--grey);
      // color: var(--computer-zone);
    }
  }
`;
