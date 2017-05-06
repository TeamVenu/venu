import styled from 'styled-components';
import Slider from 'react-slick';

const Carousel = styled(Slider)`
  &:hover {
    cursor: grab;
  }
`;

export default Carousel;
