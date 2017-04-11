import styled from 'styled-components';

export const Wrapper = styled.section`
  // Positioning
  position: relative;
  align-self: flex-end;
  // Sizing
  width: ${(props) => (props.full) ? '100%' : '90%'};
  margin: ${(props) => (props.full) ? '0' : '0 auto'};
  padding: calc(var(--padding) * 2) 0;
  z-index: 15;
`;
