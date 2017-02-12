import styled from 'styled-components';

export const ListView = styled.ul`
  height: 100%;
  overflow: auto;
  padding-bottom: 60px;
  margin: 0;
  padding: 0;
`;

export const ItemContainer = styled.li`
  display: flex;
  flex: direction: row;
  border-bottom: 1px solid var(--dark);
  padding: var(--padding);
  text-decoration: none;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }
`;
