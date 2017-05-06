import styled from 'styled-components';

const TabBarList = styled.ul`
  // Positioning
  position: relative;
  margin: 0;
  padding: 0;

  // Size
  width: 100%;
  height: 100%;

  // Flex
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  &:not(.header) {
    justify-content: center;
  }

  &.header {
    width: 90%;
    margin: 0 auto;
  }

  li {
    // Positioning
    position: relative;

    // Flex
    display: flex;
    justify-content: center;
    align-items: center;

    &.tab {
      justify-content: center;
    }

    // Size
    width: 100%;
    height: 100%;
    flex-basis: ${(props) => {
      if (props.two) {
        return '50%';
      } else if (props.three) {
        return '33.3%';
      } else if (props.four) {
        return '25%';
      } else if (props.five) {
        return '20%';
      }

      return 'auto';
    }};

    .bottom-bar & {
      flex-direction: column;
    }

    // Children
    * {
      margin: 0;
      padding: 0;
    }

    .title {
      margin: auto;
    }

    .icon {
      margin: 0;
    }

    // Shift buttons in first li to the left
    &:not(.tabs):first-of-type button.large {
      display: flex;
      width: 100%;
    }

    // Shift buttons in last li to the right
    &:not(.tabs):last-of-type button {
      margin-left: auto;
    }
  }
`;

export default TabBarList;
