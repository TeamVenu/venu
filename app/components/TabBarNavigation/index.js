import styled from 'styled-components';
import { Link } from 'react-router';

const TabBarLink = styled(Link)`
  // Size
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  // Styling
  color: var(--gray);
  text-decoration: none;

  h4, p {
    margin: 0;
    padding: 0;
  }

  &.active {
    color: var(--primary-accent-color);
  }
`;

export default TabBarLink;
