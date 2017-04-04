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
  justify-content: center;
  flex-direction: column;
`;

export const Body = styled.section`
  flex: 1;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Footer = styled.ul`
  flex: 1;
  padding: 0;
  list-style-type: none;

  li {
    padding-bottom: calc(var(--padding) * 1.5);
  }
`;

export const Label = styled.label`
  display: block;
  text-align: left;
  margin-bottom: var(--padding);

  &.valid {
    color: var(--success-color-accent);
  }

  &.invalid {
    color: var(--error-color-accent);
  }
`;

export const Alert = styled.p`
  margin: 2em 0;
  display: none;
  padding: var(--padding);

  &.show {
    display: block;
  }

  &.error {
    background: var(--think-tank);
  }

  &.warning {
    background: var(--rit-central);
  }

  &.success {
    background: var(--business-district);
  }
`;

export const OptionList = styled.ul`
  margin-left: 0;
  padding-left: 0;
  list-style-type: none;
  margin-bottom: 1em;
`;

export const OptionItem = styled.li`
  padding-bottom: var(--padding);
`;

export const DescriptionList = styled.dl``;

export const DescriptionTitle = styled.dt`
  margin-bottom: var(--padding);
`;

export const DescriptionDefinition = styled.dd`
  margin-left: 0;
  margin-bottom: calc(var(--padding) * 2);
`;

export const NumberedList = styled.ol`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin-bottom: 1em;
`;

export const ButtonRow = styled.ul`
  padding: 0;
  list-style-type: none;
  width: 100%;
  display: flex;
  flex-flow: row no-wrap;
  justify-content: flex-end;
`;

export const ButtonItem = styled.li`
  flex-basis: 50%;
`;
