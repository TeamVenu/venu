import styled from 'styled-components';

const FlexListView = styled.ul`
  display: flex;
  flex-flow: ${(props) => (props.nowrap) ? 'nowrap' : 'wrap'};
  list-style-type: none;
  width: 100%;
  padding: 0;
  padding-top: var(--padding);

  li {
    margin-bottom: var(--padding);
  }

  li:not(:last-of-type) {
    margin-right: var(--padding);
  }

  &.spaced {
    li {
      margin: 0 calc(var(--padding) * 1.5) calc(var(--padding) * 1.5) 0;
    }
  }
`;

export default FlexListView;
