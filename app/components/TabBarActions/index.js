import styled from 'styled-components';

const TabBarActions = styled.button`
  // Size
  display: block;
  width: 100%;
  height: 100%;
  padding: 1em;

  // Styling
  color: var(--gray);
  border-bottom: 3px solid transparent;

  &.selected {
    color: var(--primary-accent-color);
    border-bottom: 3px solid currentColor;
  }
`;

export default TabBarActions;
