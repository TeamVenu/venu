import styled from 'styled-components';

export const Topbar = styled.header`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  background: var(--primary-color);
  width: 100%;
  padding: 0 25px;
  height: var(--topbar-height);
  line-height: var(--topbar-height);
  color: var(--white);

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AppTitle = styled.a`
  flex: 1;
  color: var(--white);
  text-decoration: none;
  letter-spacing: 1px;
  font-size: 2em;
`;

// export const ModeWrapper = styled.nav`
//   flex: 2;
//   overflow: auto;
// `;

// export const ModeList = styled.ul`
//   margin-top: 0;
// `;

// export const ModeListItem = styled.li`
//   display: inline;
//   padding: var(--padding);
//   font-size: 1.5em;
// `;

export const PlaceHolder = styled.a`
  /* flex: 1; */
  color: var(--white);
  text-decoration: none;
  letter-spacing: 1px;
  font-size: 2em;
`;
