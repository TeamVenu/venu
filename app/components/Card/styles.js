import styled from 'styled-components';
import { Link } from 'react-router';

// Components
import H2 from 'components/H2';
import Paragraph from 'components/P';
import FlexListView from 'components/FlexListView';

// Local
export const Wrapper = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
  background: var(--background-color);
  color: var(--foreground-color);
  text-decoration: none;

  &:not(.full) {
    border-radius: 4px;
  }
`;

export const Section = styled.section`
  padding: 1em;

  * {
    padding: 0;
  }
`;

export const TagSection = styled.section`
  padding: 1em 1em calc(1em - var(--padding));
  border-top: 1px solid var(--light-gray);
`;

export const Header = styled.section`
  display: flex;
  flex-flow: row no-wrap;
  align-items: center;
`;

export const Title = styled(H2)`
  padding: 0;
  width: 100%;
  clear: both;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  text-overflow: ellipsis;
`;

export const P = styled(Paragraph)`
  padding: 0;
  font-size: 0.9rem;
  font-weight: ${(props) => (props.zone) ? '700' : '300'};
  text-transform: ${(props) => (props.zone) ? 'uppercase' : 'initial'};
  color: ${(props) => (props.zone) ? 'var(--primary-accent-color)' : 'var(--gray)'};
  width: 100%;
  clear: both;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  text-overflow: ellipsis;

  & + p {
    text-align: right;
  }
`;

export const ListView = styled(FlexListView)`
  padding-top: 0;
`;
