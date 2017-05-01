import styled from 'styled-components';

const Tag = styled.li`
  border-radius: 50px;
  color: var(--primary-accent-color);
  font-size: 0.95em;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;

  &:not(:last-of-type) {
    &::after {
      margin: 0 2px;
      content: '\\00b7';
    }
  }
`;

export default Tag;
