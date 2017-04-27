/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { PropTypes as T } from 'react';

import Ionicon from 'react-ionicons';

// Components
import H4 from 'components/H4';
import P from 'components/P';
import TabBar from 'components/TabBar';
import TabBarList from 'components/TabBarList';
import TabBarNavigation from 'components/TabBarNavigation';

// Messages
import messages from './messages';
export default class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: T.node,
    location: T.object,
  };

  constructor(props) {
    super(props);

    this.renderTabBar = this.renderTabBar.bind(this);
    this.renderNavigation = this.renderNavigation.bind(this);
  }

  renderNavigation() {
    const { nav } = messages;
    return nav.map((navigation) => { // eslint-disable-line
      return (
        <li key={navigation.id} className={'tab'}>
          <TabBarNavigation to={navigation.link} activeClassName={'active'}>
            <H4><Ionicon icon={navigation.icon} /></H4>
            <P className={'smallest'}>{ navigation.defaultMessage }</P>
          </TabBarNavigation>
        </li>
      );
    });
  }

  renderTabBar() {
    const { location } = this.props;
    // If our main routes change this needs to be updated
    const regexPattern = /(^\/$)|(search)|(itinerary)|(profile)$/g;

    // If current path does not match then don't show tab bar
    if (!regexPattern.test(location.pathname)) return null;

    return (
      <TabBar className={'bottom-bar'}>
        <TabBarList four>
          { this.renderNavigation() }
        </TabBarList>
      </TabBar>
    );
  }

  render() {
    return (
      <article>
        {React.Children.toArray(this.props.children)}
        {this.renderTabBar()}
      </article>
    );
  }
}
