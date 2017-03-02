import styled from 'styled-components';

export const Wrapper = styled.section`
  position: relative;
  margin: 0;
  height: 100vh;
  -webkit-box-orient: horizontal;
  -o-box-orient: horizontal;
`;

export const MapWrapper = styled.section`
  width: 100%;
  height: 100%;
  max-height: 200px;
  background: #1f1f1f;
  border-bottom: 5px solid transparent;

  .mustard & {
    border-color: #CB9929;
  }

  .orange & {
    border-color: #E47D42;
  }

  .purple & {
    border-color: #8D6EA6;
  }

  .aqua & {
    border-color: #2EA6A0;
  }

  .yellow & {
    border-color: #E5BC31;
  }
`;

export const Container = styled.section`
  margin: 0 auto;
  width: 90%;
  max-width: 1200px;
  padding: 3.25em 1.5em 1.25em 1.5em;
  border-bottom: 5px solid transparent;

  @media (min-width: 720px) {
    padding: 4.5em 2.5em;
  }

  @media (min-width: 1200px) {
    padding: 6em 0em 4em;
  }
`;

export const PrimaryButton = styled.a`
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  text-decoration: none;
  text-transform: uppercase;
  text-align: center;
  padding: var(--padding);
  border: none;
  color: var(--white);

  .mustard & {
    background: #CB9929;
  }

  .orange & {
    background: #E47D42;
  }

  .purple & {
    background: #8D6EA6;
  }

  .aqua & {
    background: #2EA6A0;
  }

  .yellow & {
    background: #E5BC31;
  }
`;

export const Button = styled.a`
  margin-top: var(--padding);
  display: block;
  padding: var(--padding);
  border: 3px solid var(--white);
  color: var(--white);
  text-decoration: none;
  text-transform: uppercase;
  text-align: center;

  .mustard & {
    color: #CB9929;
    border-color: #CB9929;
  }

  .orange & {
    color: #E47D42;
    border-color: #E47D42;
  }

  .purple & {
    color: #8D6EA6;
    border-color: #8D6EA6;
  }

  .aqua & {
    color: #2EA6A0;
    border-color: #2EA6A0;
  }

  .yellow & {
    color: #E5BC31;
    border-color: #E5BC31;
  }
`;
