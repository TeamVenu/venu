/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  appName: {
    id: 'app.Main.Header.appName',
    defaultMessage: 'venu',
  },
  modes: [
    {
      id: 'app.Main.Header.mode.discover',
      defaultMessage: 'Discover',
    },
    {
      id: 'app.Main.Header.mode.itinerary',
      defaultMessage: 'Itinerary',
    },
    {
      id: 'app.Main.Header.mode.facilities',
      defaultMessage: 'Facilities',
    },
  ],
});
