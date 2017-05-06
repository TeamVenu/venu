import styled from 'styled-components';

const H4 = styled.h4`
  padding-top: var(--padding);
  padding-bottom: var(--padding);
  text-transform: uppercase;
  color: var(--grey);
  font-weight: 700;

  &.small {
    font-weight: 400;
    font-size: 0.85em;
  }
`;

export default H4;
