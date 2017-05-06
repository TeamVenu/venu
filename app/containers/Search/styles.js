import styled from 'styled-components';

export const Wrapper = styled.section`
  margin: 0 auto;
  width: 100%;
  max-width: 1170px;
`;

export const VerticalListView = styled.ul`
  margin: var(--topbar-height) 0;
  padding: 0;
  list-style-type: none;
`;

export const VerticalListSection = styled.li`
  margin-bottom: var(--padding);

  &:last-child {
    position: relative;
    padding-bottom: calc(var(--topbar-height) * 1.5);
  }

  h4, ul:not(.slider-list) {
    padding-left: var(--padding);
  }
`;

export const HorizontalListView = styled.ul`
  // background: green;
  margin: 0;
  padding: var(--padding);
  padding-left: 0;
  display: flex;
  flex-flow: row no-wrap;
  list-style-type: none;
  overflow-x: auto;
  align-items: center;
`;

export const HorizontalListItem = styled.li`
  margin-right: var(--padding);
  
  &:last-child {
    position: relative;
    padding-right: calc(var(--topbar-height) * 0.5);
  }
`;

export const TagButton = styled.button`
  padding: calc(var(--padding) * 0.5) calc(var(--padding) * 2);
  background: var(--primary-accent-color);
  color: var(--background-color);
  border-radius: 50px;
  white-space: nowrap;
`;

export const FacilityButton = styled.button`
  background: var(--foreground-color);
  color: var(--background-color);
  padding: var(--padding);
  border-radius: 4px;
    white-space: nowrap;

`;

export const FacilityIcon = styled.img`
  display: block;
  margin: 0 auto;
  height: 24px;
  margin-bottom: calc(var(--padding) / 2);
`;

export const SearchContainer = styled.section`
  position: relative;
  margin: auto;
  width: 90%;
  max-width: 1170px;
  // background: red;
  display: flex;
  // align-items: baseline;
`;

export const SearchLabel = styled.label`
  background: var(--light-gray);
  padding: calc(var(--padding) / 2);
  border-radius: 4px 0 0 4px;
`;

export const SearchBox = styled.input`
  background: var(--light-gray);
  display: block;
  flex: 2;
  padding: calc(var(--padding) / 2);
  font-size: 16px;
  border-radius: 0 4px 4px 0;

  &:focus {
    outline: 0;
  }
`;

export const List = styled.ul`
  margin: var(--topbar-height) 0 calc(var(--topbar-height) * 1.5) 0;
  padding: 0;
  list-style-type: 0;
`;

export const Item = styled.li`
  border-bottom: 1px solid var(--light-gray);
`;

export const SlideList = styled.section`
  padding: var(--padding);
`;
