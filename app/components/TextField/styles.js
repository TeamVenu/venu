import styled from 'styled-components';

export const Wrapper = styled.section`
  position: relative;
  padding-top: var(--padding);
  margin-bottom: var(--padding);

  .icon {
    display: none;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  &.valid {
    .icon {
      display: block;
    }
  }
`;

export const Label = styled.label`
  position: absolute;
  top: var(--padding);
  left: var(--padding);
  transition: all 0.2s;
`;

export const List = styled.ul`
  padding-left: 0;
  list-style-type: none;
  font-size: 0.9rem;
`;

export const Item = styled.li`
  padding: var(--padding);
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  padding: var(--padding);
  background: none;
  border: none;
  border-bottom: 3px solid currentColor;
  font-size: 16px;

  &:focus {
    outline: 0;
  }
  
  &:focus + label,
  &:valid + label {
    top: calc(var(--padding) * -1.5);
  }
`;
