# State Management
 
 Venu manages state and props utilizing redux. With Redux we store our data in a centralized ```store``` which then other components can access if they need data.

 ## Setup

For a container to access the ```store``` there we need to get our data and connect it. We'll need to add several files or edit them.

* Selector
* Constants
* Actions
* Reducer
* Dispatch
* Container

### Selector

Each state can be accessed using a selector. Selectors that are global exist in the ```containers/App/selectors``` file. Local ones can be found in the ```./selectors``` file.

* Here is the code for creating a local selector for a container.

``` js
import { createSelector } from 'reselect';

const selectMyContainer = (state) => state.get('MyContainer');

const makeSelectMyContainer_PROP = () => createSelector(
  selectMyContainer,
  (MyContainerState) => MyContainerState.get('prop')
);

export {
  selectMyContainer,
  makeSelectMyContainer_PROP,
}
```

* For adding to the global simply create the new ```makeSelect``` function and remember to export it

### Contants

* To change our state we call actions. Each action should have a unique ```type``` property. The properties are stored in the ```constants.js``` file.

* Follow this format:

``` js
 export const YOUR_ACTION_CONSTANT = 'venu/MyContainer/MY_ACTION_CONSTANT';
```

### Actions

To change our state we call actions. Actions should have a ```type``` property serves as an id of sorts. They should also have the value they are changing. Make sure you import the constants in the actions file.

* Follow this format:

``` js
import { CHANGE_USER_EMAIL } from './actions';

/**
 * changeEmail
 * Returns the new user email validated
 * @param  {String} email
 */
export function changeUserEmail(email, valid) {
  return {
    type: CHANGE_USER_EMAIL,
    value: email,
  };
}
```

### Reducer

Reducers update our data. Using actions, we can change our application state. Each reducer will need an initial state.

* Follow this format:

``` js
import { fromJS } from 'immutable';
import { CHANGE_USER_NAME, CHANGE_LOCATION } from './constants';

// Initial State of the App
const initialState = fromJS({
  // Props
  name: '',
  location: {
    distance: 0, 
  },
});

/**
 * myContainerReducer
 * Changes application state based on action taken
 * @param {Object} state
 * @param {Object} action
 */
function myContainerReducer(state = initialState, action) {
  switch (action.type) {
    // For a direct child of state follow this format
    case CHANGE_USER_NAME:
      return state
          .set('name', action.value);
    // For a property of a child object use
    // Make sure the you return a NEW object
    // Redux won't detect a change otherwise 
    // and the components won't reload
    case CHANGE_DISTANCE:
      return state
          .setIn(['location', 'distance'], action.value);
    default:
      return state;
  }

export default myContainerReducer;
```

### Dispatch

We call dispatch to send actions to our app. We save these in the ```./dispatches``` file. Here you may also want to do any validation on the data or make sure it is a *new* object and not the same one as the app won't automatically update.

* Follow this format: 

``` js
import { changeUserName } from './actions';

/**
 * dispatchChangeDisplayName
 * Validates the name input and dispatches action
 * @param {Function} dispatch
 * @param {Object} event
 */
export function dispatchChangeDisplayName(dispatch, event) {
  // Cache the name
  const name = event.target.value;

  // If name is not empty string set to true
  const valid = (name.length > 0) ? true : null;

  if (valid) {
    // Set local storage so we don't have to repeat these steps on reload
    localStorage.setItem('venuUserName', name);
    localStorage.setItem('venuAccountValidationName', valid);
  }

  // Dispatch our action
  dispatch(changeUserName(name, valid));
}
```
### Container

Now that we have data management set up we can integrate it to our containers.

* Follow this format

``` js
import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// Global Selectors
import {
  makeSelectUser,
} from 'containers/App/selectors';

import {
  dispatchChangeDisplayName
} from 'containers/App/dispatches';

export class MyContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
      const { user, onDispatchUserName } = this.props;

      // user location may be an immutable or an object so make a check
      // If it is an object we can use it
      // Otherwise turn it into a JS object using .JS()
      const name = (user.get('name') !== '') ? user.get('name') : 'User';
      const location = Object.assign({}, { lat: user.getIn(['location', 'lat']), lng: user.getIn(['location', 'lng']) });

      return (
        <input type='text' value = {'name'} onChange = {(e) => { onDispatchUserName(e); }} />
      );
  }
}

MyContainer.propTypes = {
  user: T.object,
  onDispatchUserName: T.func,
};

// Map our selectors to props
const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

// Map dispatches to props
export function mapDispatchToProps(dispatch) {
  return {
    onDispatchUserName: (e) => dispatchChangeDisplayName(dispatch, e),
  };
}

// Connect the props we created from selectors
// And our dispatch function props to MyContainer
export default connect(mapStateToProps, mapDispatchToProps)(MyContainer);
```
