import styled from 'styled-components';

export const PinWrapper = styled.section`
  width: 0;
  height: 0;
  display: flex;
  justify-content: center;
  align-items: 0;
`;

export const Pin = styled.section`
  width: 20px;
  min-width: 20px;
  height: 20px;
  border: 2px solid var(--primary-color);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: var(--primary-color);
  }
`;
