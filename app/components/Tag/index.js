import styled from 'styled-components';

const Tag = styled.li`
  border-radius: 50px;
  margin-right: var(--padding);
  padding: calc(var(--padding) / 2) calc(var(--padding) * 1.5);
  background: var(--dark);
  color: var(--foreground-color);
  font-size: 0.85em;

  &:hover {
    // background: var(--grey);
  }
`;

export default Tag;
