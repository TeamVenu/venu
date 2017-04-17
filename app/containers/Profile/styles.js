import styled from 'styled-components';
import { Link } from 'react-router';

export const Header = styled.section`
  width: 100%;
  height: 200px;
  padding: var(--padding);
  background: var(--warm-gradient);
  color: var(--background-color);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  header {
    flex-basis: auto;
  }
`;

export const ImageContainer = styled.section`
  background: var(--background-color);
  border-radius: 100%;
  padding: var(--padding);
`;

export const ProfileImage = styled.img`
  display: block;
  margin: 0 auto;
  width: 40px;
  height: 40px;
`;

export const StatisticsBarList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  background: var(--light-gray);
  box-shadow: inset 0 -7px 1px -7px var(--foreground-color);
`;

export const StatisticsBarListItem = styled.li`
  padding: var(--padding);
  display: flex;
  flex-basis: 50%;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  p {
    padding: 0;
  }
`;

export const SettingsList = styled.ul`
  margin: 0;
  padding: 0;
  width: 100%;
`;

export const SettingsItem = styled.li`
  width: 100%;
  border-bottom: 1px solid var(--grey);

  &:first-of-type {
    border-top: 1px solid var(--grey);
  }

  &:hover {
    background: var(--light-gray);
  }
`;

export const SettingsLink = styled(Link)`
  display: block;
  width: 90%;
  margin: 0 auto;
  padding: 1.5em 0;
  color: var(--foreground-color);
  text-decoration: none;
`;
