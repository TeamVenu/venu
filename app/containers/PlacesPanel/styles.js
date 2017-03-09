import styled, { keyframes } from 'styled-components';

const scaleUp = keyframes`
  0% {
    transform: scale(0.5);
  }

  100% {
    transform: scale(1);
  }
`;

export const Wrapper = styled.section`
  height: 100%;
  left: 0;
  top: 50%;
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
  padding: var(--padding) var(--padding) 60vh;
  display: block;
  max-width: 100%;
  height: 100vh;
  overflow-y: auto;
  margin: 0 auto;
  background: var(--foreground-color);
  color: var(--background-color);
  border-top: 10px solid transparent;
  animation: ${scaleUp} 0.2s;

  .full & {
    padding-bottom: 25vh;
  }

  .collapsed & {
    padding-bottom: 85vh;
  }

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
    padding-bottom: 200px;
  }

  @media (min-width: 1200px) {
    // padding: 6em 0em 4em;
  }
`;

export const DetailHeader = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
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
  margin-bottom: var(--padding);
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
  font-size: 0.85em;

  &:hover {
    // background: var(--grey);
  }
`;

export const DetailCTAButton = styled.button`
  // position: fixed;
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
    position: relative;
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
