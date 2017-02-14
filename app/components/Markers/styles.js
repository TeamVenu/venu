import styled from 'styled-components';

export const PinWrapper = styled.section`
  width: 0;
  height: 0;
  display: flex;
  justify-content: center;
  align-items: 0;
  transform: rotate(45deg);
`;

export const Pin = styled.section`
  width: 20px;
  min-width: 20px;
  height: 20px;
  border: 2px solid ${(props) => props.event ? 'var(--accent-color)' : 'palevioletred'};
  border-radius: 100% 100% 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(-100%);

  &:hover {
    background: ${(props) => props.event ? 'var(--accent-color)' : 'palevioletred'};
  }
`;
