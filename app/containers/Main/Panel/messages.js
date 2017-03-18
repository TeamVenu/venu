/*
 * Panel Messages
 *
 * This contains all the text for the Panel component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  appName: {
    id: 'app.Main.Panel.appName',
    defaultMessage: 'venu',
  },
  mode: {
    id: 'app.Main.Panel.mode',
    discover: {
      id: 'app.Main.Panel.mode.discover',
      defaultMessage: 'Recommended For You',
    },
    itinerary: {
      id: 'app.Main.Panel.mode.itinerary',
      defaultMessage: 'In Your Itinerary',
    },
    facilities: {
      id: 'app.Main.Panel.mode.facilities',
      defaultMessage: 'Facilities Near You',
    },
  },
});
