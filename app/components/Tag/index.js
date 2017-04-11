import styled from 'styled-components';

const Tag = styled.li`
  border-radius: 50px;
  padding: calc(var(--padding) / 4) calc(var(--padding) * 2);
  background: var(--primary-accent-color);
  color: var(--background-color);
  font-size: 0.85em;
`;

export default Tag;
