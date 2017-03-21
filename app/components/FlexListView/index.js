import styled from 'styled-components';

const FlexListView = styled.ul`
  display: flex;
  flex-flow: row wrap;
  list-style-type: none;
  padding: 0;

  li {
    margin: 0 var(--padding) var(--padding) 0;
  }
`;

export default FlexListView;
