# State Management
 
 Venu manages state and props utilizing redux. With Redux we store our data in a centralized ```store``` which then other components can access if they need data.

 ## Setup

For a container to access the ```store``` there we need to get our data and connect it. We'll need to add several files or edit them.

- [Selector](#selector)
- [Constants](#constants)
- [Actions](#actions)
- [Reducer](#reducer)
- [Dispatch](#dispatch)
- [MyContainer](#mycontainer)
- [Combining reducers](#combining-reducers)
- [Tutorial](#tutorial)

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

### Constants

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
### MyContainer

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

### Adding all reducers
```

### Combining reducers

One final step takes place in ```app/reducers.js```. Here we want to import our reducer.

* Example

``` js
import myContainerReducer from 'containers/MyContainer';
```

Then we want to add it to the ```createReducer``` function.

* Example:

``` js
export default function createReducer(asyncReducers) {
  return combineReducers({
    ...
    myContainer: myContainerReducer,
    ...
  });
}
```
## Tutorial

For our example we are going to add a property to our global state which will contain the coordinates for the destination of the place user wants to navigate to.

We're going to store our destination in our global state in case we want other containers to access it. Most of these steps take place in the ```containers/App``` folder.

- [Adding Property to our state](#adding-property-to-our-state)
- [Accessing props](#accessing-props)
- [Giving our actions a type](#giving-our-actions-a-type)
- [Creating an action](#creating-an-action)
- [Dispatching an action](#dispatching-an-action)
- [Updating the state](#updating-the-state)
- [Interacting with Component](#interacting-with-component)
- [Making sure it all works](#making-sure-it-all-works)

### Adding Property to our state
In our global ```reducer.js``` file we specify the initial state of our App. We declare a variable and create an immutable Map node using ```immutable```. This immutable variable takes an object as a parameter. We need this to be immutable so we never change the value.

* Example:

``` js
const immutable = fromJS({
  ready: false,
});
```

In our reducer file we call have the ```initialState``` variable declared. We want to add a new property for ```destination```, which will be an object.

Go ahead and add the destination prop at the end of the object.

``` js
  // Holds our destination place
  destination: {},
```

### Accessing props
Now that we have the property we want to be able to access it. To do this we go to our ```selectors.js``` file in ```App```.

In the selectors we get the props we want. We can either get the entire state (which in the global case is the ```selectGlobal``` variable).

But we want to get just the destination not the entire state so lets create a closure function to access it.

* Right before we export the functions add a the following:

``` js
// Access the state's destination property
const makeSelectDestination = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('destination')
);
```

We're creating a selector which uses the ```selectGlobal``` var which contains the entire state. Then it pases that variable as ```globalState``` and using the ```immutable``` function we can get the prop. In this case we use ```globalState.get('destination')``` since the ```destination prop``` is a direct child of our state.

If instead we wanted to get the name of the destination we would use the ```getIn``` function. We must remember that immutable vars are not objects as such we can't call ```destination.name```. Instead ```immutable``` provides a function for accessing children props which is ```getIn``` and it takes an array of strings which correspond to prop names from top to bottom as a parameter. Such as ```globalState.getIn(['destination', 'name'])```.

Finally we need to export this variable we just created

* The end of export should look like this:

``` js
  ...
  makeSelectDestination,
};
```

### Giving our actions a type

Each action (when we want to update the state) we take requires a unique type. To tidy things up we store this in the ```constants.js``` file. With this type the reducer will know what to update. We prefix the type with the name of the app followed by the container it is located in, and finally the name of the type

* For this example the constant has already been done for you but it looks like this:

``` js
export const NAVIGATE_TO_PLACE = 'venu/App/NAVIGATE_TO_PLACE';
```

### Creating an action

Now that we have the prop in place, we have a way of accessing it, and have a type we can create the action. In the ```actions.js``` file we first import the constant.

* This has already been done for you and it looks like this:

``` js
import { NAVIGATE_TO_PLACE } from './constants'
```

Then we create the function which will return an object that holds the type and the updated value the prop.

* The function has already been created for you and it looks like this:

``` js
/**
 * navigateToPlace
 * Returns the place to navigate to
 * @param  {Object} place
 */
export function navigateToPlace(place) {
  return {
    type: NAVIGATE_TO_PLACE,
    value: place,
  };
}
```

In some cases you may want additional values if you want to change more than one thing with a single action.

That is fine you can simply add the parameter and create a new property. The property of the value doesn't have to be ```value``` it can be anything. *However*, each action *needs* a type. So there should always be a type (which we set to the imported constant) and it should be unique.

### Dispatching an action

Now that we have our action set up we want to dispatch it. We create a dispatch function in ```dispatches.js```. First we import the action we want to dispatch and then we create a function to dispatch that action. Before we dispatch we might want to do validation to make sure our prop is correct.

* The function has already been created and it looks like this:

``` js
import {  navigateToPlace } from 'containers/App/actions';

/**
 * dispatchNavigateToPlace
 * Dispatches action to navigate to place
 * @param {Function} dispatch
 * @param {Object} place
 */
export function dispatchNavigateToPlace(dispatch, place) {
  dispatch(navigateToPlace(place));
}
```

### Updating the state

Alright, now we can update our state. But first we need to finish the reducer so that it actualed changes the destination. Go back to ```reducer.js```.

* First we import the constant which holds the type of the action. This has already been done for you but it looks like this:

``` js
import { NAVIGATE_TO_PLACE } from './constants';
```

Now we add it to our switch statement and return the new state.

* We already added the case to the switch but we are returning the default state so nothing changes. Make it look like this:

``` js
    ...
    case NAVIGATE_TO_PLACE:
      return state
              .set('destination', action.value);
    case LIKE_PLACE:
    ...
```

We call ```set``` on the immutable state to update the value of destination. We then give it the value of the action. If we wanted to update multiple props we could do chaining ```return state.set().set();```. If we wanted to just change the destination name we would use ```setIn``` instead for example ```state.setIn(['destination', 'name'], action.value)```.

### Interacting with Component

Now that we have our redux setup we want to go to the component that dispatches the action. First we want to go to the ```containers/DetailView/Detail.js``` file. This is were we are going to call the action.

* In order to call the action we need the dispatch. To do that we get the dispatch function. Since the file is not in our current folder we can't user ```./``` and instead go to the folder with ```containers/App/```. This has already been done and it looks like this:

``` js
import { dispatchNavigateToPlace } from 'containers/App/dispatches';
```

Then we want map the dispatch to the props so we can access it through ```this.props```. 

* In ```mapDispatchToProps(dispatch)``` this has already been done and it looks like this:

``` js
  return {
    ...
    onDispatchNavigateToPlace: (location) => {
      // Update navigate
      dispatchNavigateToPlace(dispatch, location);

      // Set current place to empty
      dispatchChangeCurrentPlace(dispatch, {});

      // Redirect to main
      browserHistory.push({ pathname: '/' });
    }, 
  };
```

* We also want to add the newly created prop function to our ```propTypes``` for validation. This has already been done and looks like:

``` js
Detail.propTypes = {
  onDispatchNavigateToPlace: T.func,
}
```

* Finally we want to call that props function when the button is tapped. This has already been done for you but it looks like this:

``` js
  <Button
    name={'Navigate'}
    icon={'ion-navigate'}
    onClickEvent={() => { onDispatchNavigateToPlace(place); }}
  />
```

### Making sure it all works

Go to the ```VenuMap``` class file in ```containers/Main/Map.js```. This is where we'll get the destination. 

* First we want to get the destination using our selector. Add the following where we are importing the global selectors

``` js
import {
  ...
  makeSelectDestination,
  ...
} from 'container/App/selectors'
```

* Now we want to create a property with the value returned from above. In the ```mapStateToProps``` variable near the end of the file add the following line:

``` js
const mapStateToProps = createStructuredSelector({
  ...
  destination: makeSelectDestination(),
  ...
});
```

* Validate that prop in ```Venu.propTypes```

``` js
VenuMap.propTypes = {
  ...
  destination: T.object,
  ...
};
```

* Now in the ```render``` function add the change the following and console log it.

``` js
    const { venuMap, destination } = this.props;
    console.log('Destination:');
    console.log(destination);
```

When we have a destination we should get a MapNode back with size of 0. This means we are getting an immutable object but it has no value inside. When we first select a destination we get the object itself.

Now you have a better understanding of the *lengthy* but organized process of updating our state and getting the state back.
