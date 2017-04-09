import styled from 'styled-components';
import { Link } from 'react-router';

const A = styled(Link)`
  color: var(--primary-color);
  text-decoration: none;

  &:hover {
    color var(--accent-color);
  }

  &.btn {
    padding: 1em;
    text-align: center;

    &.bordered {
      border: 3px solid currentColor;
    }

    &.rounded {
      border-radius: 2em;
    }

    &.special {
      background: var(--warm-gradient);
      color: var(--background-color);
      border-color: var(--red);;

      &.reversed {
        background: var(--background-color);
        color: var(--red);
        border-color: var(--background-color);
      }
    }

    &.full {
      display: block;
      width: 100%;
    }
  }
`;

export default A;
