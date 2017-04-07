import styled from 'styled-components';
import NukaCarousel from 'nuka-carousel';

const Carousel = styled(NukaCarousel)`
  &:hover {
    cursor: grab;
  }

  .slider-slide {
    // box-shadow: 0 1px 5px var(--foreground-color);
  }
`;

export default Carousel;
