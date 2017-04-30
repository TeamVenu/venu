import styled from 'styled-components';

const Img = styled.img`
  background: ${(props) => (props.padding) ? 'var(--background-color)' : 'none'};
  display: block;
  margin: 0 auto;
  padding: ${(props) => (props.padding) ? 'var(--padding)' : '0'};
  border-radius: 100%;
  width: 64px;
  height: 64px;
`;

export default Img;
