import styled from 'styled-components';

const SmallWrapper = styled.section`
  // position: relative;
  margin: 0 auto;
  width: 90%;
  max-width: 720px;
  padding-top: var(--topbar-height);

  &.centered {
    position: absolute;
    width: 90%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0;
  }
`;

export default SmallWrapper;