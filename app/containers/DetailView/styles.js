import styled from 'styled-components';
import H4 from 'components/H4';

export const MapWrapper = styled.section`
  background: var(--background-color);
  position: relative;
  top: 0;
  width: 100%;
  height: 100px;

  @media screen and (min-height: 600px) {
    height: 200px;
  }

  @media screen and (min-height: 760px) {
    height: 300px;
  }
`;

export const DetailWrapper = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
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
`;

export const DetailContainer = styled.section`
  width: 90%;
  max-width: 720px;
  padding: 2em 0;
  margin-bottom: 60px;

  // Override Card styles
  section:first-of-type {
    background: none;
    height: auto;

    a {
      padding: 0;
      h2, p {
        white-space: normal;
        overflow: auto;
      }
    }
  }
`;

export const DetailInfoList = styled.ul`
  padding: 0;
  display: flex;
  flex-flow: row no-wrap;
  align-items: flex-start;
  list-style-type: none;
  margin-bottom: var(--padding);
`;

export const DetailInfoItem = styled.li`
  flex-basis: 50%;
`;

export const ButtonRow = styled.ul`
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

export const ButtonItem = styled.li`
  flex-grow: 1;

  &:not(:last-of-type) {
    margin-right: calc(var(--padding) / 1.5);
  }
`;

export const DetailInfoWrapper = styled.section`
  border-top: 1px solid var(--light-gray);
`;

export const Subtitle = styled(H4)`
  color: var(--grey);
  font-weight: 700;
`;

export const TagsContainer = styled.ul`
  padding: 0;
  margin-top: 0;
  display: flex;
  flex-flow: row wrap;
  list-style-type: none;
`;
