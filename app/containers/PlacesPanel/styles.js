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
  border-bottom: 1px solid var(--light);
  margin-bottom: var(--padding);
  padding: var(--padding);
  text-decoration: none;
  cursor: pointer;
  color: var(--background-color);

  border-top: 5px solid transparent;
  
  &.recreation-zone {
    border-color: var(--recreation-zone);
  }

  &.rit-central {
    border-color: var(--rit-central);
  }

  &.ntid-area {
    border-color: var(--ntid-area);
  }

  &.information-station {
    border-color: var(--information-station);
  }

  &.think-tank {
    border-color: var(--think-tank);
  }

  &.artistic-alley {
    border-color: var(--artistic-alley);
  }

  &.engineering-park {
    border-color: var(--engineering-park);
  }

  &.science-center {
    border-color: var(--science-center);
  }

  &.business-district {
    border-color: var(--business-district);
  }

  &.innovation-center {
    border-color: var(--innovation-center);
  }

  &.global-village {
    border-color: var(--global-village);
  }

  &.green-place {
    border-color: var(--green-place);
  }

  &.technology-quarter {
    border-color: var(--technology-quarter);
  }

  &.computer-zone {
    border-color: var(--computer-zone);
  }

  &:last-of-type {
    border: none;
  }

  // Add these later to edit based on type
  &.exhibit {
    color: var(--background-color);
  }

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
  padding: var(--padding) var(--padding) 100vh;
  display: block;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  margin: 0 auto;
  background: var(--foreground-color);
  color: var(--background-color);
  border-top: 10px solid transparent;

  &.recreation-zone {
    border-color: var(--recreation-zone);
  }

  &.rit-central {
    border-color: var(--rit-central);
  }

  &.ntid-area {
    border-color: var(--ntid-area);
  }

  &.information-station {
    border-color: var(--information-station);
  }

  &.think-tank {
    border-color: var(--think-tank);
  }

  &.artistic-alley {
    border-color: var(--artistic-alley);
  }

  &.engineering-park {
    border-color: var(--engineering-park);
  }

  &.science-center {
    border-color: var(--science-center);
  }

  &.business-district {
    border-color: var(--business-district);
  }

  &.innovation-center {
    border-color: var(--innovation-center);
  }

  &.global-village {
    border-color: var(--global-village);
  }

  &.green-place {
    border-color: var(--green-place);
  }

  &.technology-quarter {
    border-color: var(--technology-quarter);
  }

  &.computer-zone {
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

export const DetailExitButton = styled.button`
  border: none;
  border-radius: 100%;
`;

export const DetailTitle = styled.h1`
  font-size: 2em;
  // margin-bottom: var(--padding);
`;

export const DetailSectionTitle = styled.h3`
  font-size: 1.1em;
  text-transform: uppercase;
  margin-top: var(--padding);
  margin-bottom: var(--padding);
`;

export const DetailInfo = styled.p`
  font-size: 1.1em;
  font-weight: 300;
  margin-bottom: var(--padding);
`;

export const TagListView = styled.ul`
  display: flex;
  flex-flow: row-wrap;
  list-style-type: none;
  padding-left: 0;
`;

export const TagListItem = styled.li`
  border-radius: 50px;
  padding: var(--padding) calc(var(--padding) * 1.5);
  background: var(--grey);
`;

export const DetailCTAButton = styled.button`
  position: fixed;
  display: block;
  width: 100%;
  align-self: flex-end;
  left: 0;
  bottom: 0;
  border: none;
  padding: var(--padding);
  text-align: center;
  text-decoration: none;
  color: var(--foreground-color);

  &:focus {
    outline: 0;
  }

  .recreation-zone & {
    background: var(--recreation-zone);
  }

  .rit-central & {
    background: var(--rit-central);
  }

  .ntid-area & {
    background: var(--ntid-area);
  }

  .information-station & {
    background: var(--information-station);
  }

  .think-tank & {
    background: var(--think-tank);
  }

  .artistic-alley & {
    background: var(--artistic-alley);
  }

  .engineering-park & {
    background: var(--engineering-park);
  }

  .science-center & {
    background: var(--science-center);
    color: var(--background-color);
  }

  .business-district & {
    background: var(--business-district);
  }

  .innovation-center & {
    background: var(--innovation-center);
  }

  .global-village & {
    background: var(--global-village);
  }

  .green-place & {
    background: var(--green-place);
  }

  .technology-quarter & {
    background: var(--technology-quarter);
  }

  .computer-zone & {
    background: var(--computer-zone);
  }
`;

