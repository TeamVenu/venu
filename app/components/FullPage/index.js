import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  flex-wrap: no-wrap;
  justify-content: space-between;
  margin: 0 auto;
  width: 90%;
  max-width: 720px;
  min-height: 100vh;
  padding-top: var(--topbar-height);
  text-align: center;
`;

export const Header = styled.section`
  flex: 2;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: flex-end;
`;

export const Body = styled.section`
  flex: 1;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

export const Footer = styled.ul`
  margin: 0;
  flex: 1;
  padding: 0;
  list-style-type: none;
  display: flex;
  align-items: ${(props) => (props.centered) ? 'flex-start' : 'flex-end'};

  li {
    padding-bottom: calc(var(--padding) * 1.5);
  }
`;

export const ButtonRow = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  width: 100%;
  display: flex;
  flex-flow: row no-wrap;
  justify-content: flex-end;
`;

export const ButtonItem = styled.li`
  flex-basis: 50%;
  display: flex;
  flex-flow: row no-wrap;
  justify-content: flex-start;

  &:last-of-type {
    justify-content: flex-end;
  }
`;

export const OptionList = styled.ul`
  margin-left: 0;
  padding-left: 0;
  list-style-type: none;
`;

export const OptionItem = styled.li``;
