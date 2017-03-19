import styled from 'styled-components';
import { Link } from 'react-router';

const A = styled(Link)`
  color: var(--primary-color);
  text-decoration: none;

  &:hover {
    color var(--accent-color);
  }
`;

export default A;
