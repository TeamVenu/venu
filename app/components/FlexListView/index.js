import styled from 'styled-components';

const FlexListView = styled.ul`
  display: flex;
  flex-flow: ${(props) => (props.nowrap) ? 'nowrap' : 'wrap'};
  list-style-type: none;
  width: 100%;
  padding: 0;
  padding-top: var(--padding);
  align-items: baseline;
  // justify-content: space-between;

  li {
    // flex: auto;
    flex-grow: 1;
    flex-basis: auto;
    margin-bottom: var(--padding);

    span {
      display: block;
      width: 90%;
      margin: 0 auto;
    }
  }
`;

export default FlexListView;
