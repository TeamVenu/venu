import styled from 'styled-components';

const H3 = styled.h3`
  padding-top: var(--padding);
  padding-bottom: var(--padding);
  text-transform: uppercase;
  color: ${(props) => (props.gray) ? 'var(--grey)' : 'inherit'};
`;

export default H3;
