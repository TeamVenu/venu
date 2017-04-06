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

import React from 'react';

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
    children: React.PropTypes.node,
  };

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

  render() {
    return (
      <article>
        {React.Children.toArray(this.props.children)}
        <TabBar className={'bottom-bar'}>
          <TabBarList four>
            { this.renderNavigation() }
          </TabBarList>
        </TabBar>
      </article>
    );
  }
}
