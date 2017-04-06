import styled from 'styled-components';

const P = styled.p`
  padding-top: var(--padding);
  padding-bottom: var(--padding);

  &.small {
    font-weight: 300;
    font-size: 0.9em;
  }

  &.smallest {
    font-weight: 300;
    font-size: 0.75em;
  }
`;

export default P;
