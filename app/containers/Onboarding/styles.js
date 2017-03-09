import styled from 'styled-components';

export const Container = styled.section`
  position: relative;
  margin: 0 auto;
  width: 90%;
  height: 100vh;
  max-width: 480px;
  color: var(--foreground-color);
  // text-align: center;
  padding-top: 4em;
`;

export const FieldContainer = styled.section`
  display: block;
  margin: 2em auto;
  width: 100%;
`;
export const Label = styled.label`
  display: block;
  text-align: left;
  margin-bottom: var(--padding);
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  padding: var(--padding);
  background: none;
  border: 3px solid var(--foreground-color);
  color: var(--foreground-color);

  &.invalid {
    border-color: var(--think-tank);
  }
`;

export const PrimaryButton = styled.button`
  position: absolute;
  bottom: 0;
  display: block;
  background: var(--foreground-color);
  color: var(--background-color);
  padding: 1em;
  border: none;
  text-transform: uppercase;
  width: 100%;
`;

export const Notification = styled.p`
  margin-top: 2em;
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
`;

export const OptionItem = styled.li`
  border-bottom: 1px solid var(--foreground-color);
`;

export const OptionButton = styled.button`
  position: relative;
  text-align: left;
  width: 100%;
  padding: 1em;
  display: block;

  & .icon {
    position: absolute;
    right: 0;
    display: none;
  }

  &.selected {

    background: var(--foreground-color);
    color: var(--background-color);
    
    .icon {
      display: inline-block;
    }
  }
`;
