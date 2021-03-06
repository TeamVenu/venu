import styled from 'styled-components';
import { Link as A } from 'react-router';

// Components
import H2 from 'components/H2';
import Paragraph from 'components/P';

export const Wrapper = styled.section`
  display: block;
  width: 100%;
  height: 100%;
  background: ${(props) => (props.visited) ? 'var(--light-gray)' : 'var(--background-color)'};
  text-decoration: none;
  overflow: auto;

  &:not(.full) {
    border-radius: 4px;
    box-shadow: 0px 1px 2px var(--black-background-opaque);
  }
`;

export const Link = styled(A)`
  display: block;
  padding: var(--padding);
  text-decoration: none;
  color: var(--foreground-color);
`;

export const Title = styled(H2)`
  padding: 0;
  width: 100%;
  clear: both;
  overflow: hidden;
  white-space: nowrap;
  display: block;
  text-overflow: ellipsis;

  .slick-slide & {
    font-size: 1.2rem;
  }
`;

export const P = styled(Paragraph)`
  padding: 0;
  font-size: 0.9rem;
  font-weight: ${(props) => (props.zone) ? '400' : '300'};
  text-transform: ${(props) => (props.zone) ? 'uppercase' : 'initial'};
  color: ${(props) => (props.zone) ? 'var(--primary-accent-color)' : 'var(--gray)'};
  width: 100%;
  clear: both;
  overflow: hidden;
  white-space: nowrap;
  display: block;
  text-overflow: ellipsis;

  & + p {
    text-align: right;
  }
`;
