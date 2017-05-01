import styled from 'styled-components';

const P = styled.p`
  &.large {
    font-size: 1.5em;
  }

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
