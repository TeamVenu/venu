/*
 * Directions Messages
 *
 * This contains all the text for the Directions component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  buttons: {
    id: 'venu.components.Directions.buttons',
    back: {
      id: 'venu.components.Directions.buttons.back',
      defaultMessage: 'Back',
    },
    cancel: {
      id: 'venu.components.Directions.buttons.cancel',
      defaultMessage: 'Cancel',
    },
    navigate: {
      id: 'venu.components.Directions.buttons.navigate',
      defaultMessage: 'Begin Trip',
    },
    reachedDestination: {
      id: 'venu.components.Directions.buttons.reachedDestination',
      defaultMessage: 'I\'ve Arrived!',
    },
  },
  emptyState: {
    id: 'venu.components.Directions.emptyState',
    defaultMessage: 'No destination found!',
  },
});
