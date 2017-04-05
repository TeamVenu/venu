import styled from 'styled-components';
import { Link } from 'react-router';

export const ViewWrapper = styled.section`
  // background: var(--foreground-color);
  // color: var(--background-color);
`;

export const Topbar = styled.header`
  position: absolute;
  width: 100%;
  height: var(--topbar-height);
  background: var(--background-color);
  display: flex;
  // justify-content: center;
  z-index: 10;
`;

export const NavBar = styled.ul`
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 720px;
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
`;

export const NavItem = styled.li`
  display: flex;
  justify-content: center;
  flex-basis: 20%;
  padding: var(--padding);

  &:nth-of-type(2) {
    flex-basis: 60%;
    white-space: nowrap;
    overflow: hidden;

    h3 {
      padding: 0;
    }
  }
`;

export const BackButton = styled(Link)`
  color: var(--foreground-color);
  text-decoration: none;
`;

export const MapWrapper = styled.section`
  position: relative;
  top: 0;
  width: 100%;
  height: 250px;
  cursor: auto;

  @media (min-width: 1170px) {
    height: 300px;
  }
`;

export const DetailWrapper = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
  border-top: 10px solid transparent;

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
`;

export const DetailInfoList = styled.ul`
  padding: 0;
  margin-bottom: var(--padding);
  list-style-type: none;
`;

export const DetailInfoItem = styled.li`
  display: flex;
  flex-flow: row no-wrap;
  align-items: baseline;
`;

export const PrimaryButton = styled.button`
  display: block;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 1em;
  color: var(--foreground-color);
  text-transform: uppercase;
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
