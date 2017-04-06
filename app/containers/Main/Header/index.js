import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// Components
import H2 from 'components/H2';
import Button from 'components/Button';
import TabBar from 'components/TabBar';
import Container from 'components/Header';
import TabBarList from 'components/TabBarList';
import TabBarActions from 'components/TabBarActions';

// Global Selectors
import {
  makeSelectMapMode,
} from 'containers/App/selectors';

// Global Helpers
import {
  dispatchChangeMapMode,
} from 'containers/App/dispatches';

// Messages
import messages from './messages';

export class Header extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    onChangeMapMode: T.func,
    mapMode: T.string,
  }

  renderModeItems() {
    const { mapMode, onChangeMapMode } = this.props;
    const { modes } = messages;
    return modes.map((mode) => { //eslint-disable-line
      const currentModeClass = (mapMode === mode.defaultMessage) ? 'selected' : null;

      return (
        <li key={mode.id} className={'tab'}>
          <TabBarActions
            className={currentModeClass}
            onClick={(e) => {
              const newMode = e.target.textContent;
              onChangeMapMode(newMode);
            }}
          >
            {mode.defaultMessage}
          </TabBarActions>
        </li>
      );
    });
  }

  render() {
    return (
      <Container>
        <TabBar borderless>
          <TabBarList className={'header'}>
            <li>
              <Button
                btnClasses={'large'}
                icon={'ion-navicon'}
                onClickEvent={null}
              />
            </li>
            <li>
              <H2 className={'title'}>{ messages.title.defaultMessage }</H2>
            </li>
            <li />
          </TabBarList>
        </TabBar>
        <TabBar>
          <TabBarList three>
            {this.renderModeItems()}
          </TabBarList>
        </TabBar>
      </Container>
    );
  }
}

// Define propTypes
Header.propTypes = {
  mapMode: T.string.isRequired,
  onChangeMapMode: T.func.isRequired,
};

// Map state to props
const mapStateToProps = createStructuredSelector({
  mapMode: makeSelectMapMode(),
});

// Map dispatches to props
export function mapDispatchToProps(dispatch) {
  return {
    onChangeMapMode: (mode) => dispatchChangeMapMode(dispatch, mode),
  };
}

// Connect our Header
export default connect(mapStateToProps, mapDispatchToProps)(Header);
