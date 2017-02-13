import styled from 'styled-components';

export const ListView = styled.ul`
  height: 100%;
  /*overflow: auto;*/
  margin-top:0;
  padding: top: 0;
  padding-bottom: 60px;
  margin: 0;
  padding: 0;
`;

export const ItemContainer = styled.li`
  display: flex;
  flex: direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--dark);
  padding: var(--padding);
  text-decoration: none;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }
`;

export const ItemInfoContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

export const ItemActionContainer = styled.section`

`;

export const ItemTitle = styled.p`
  margin: 0;
  margin-bottom: var(--padding);
`;
export const ItemSubtitle = styled.p`
  margin: 0;
  color: gray;
`;
