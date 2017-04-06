/*
 * Header Messages
 *
 * This contains all the text for the Header component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'VENU.Main.Header.VENU',
    defaultMessage: 'VENU',
  },
  modes: [
    {
      id: 'VENU.Main.Header.mode.discover',
      defaultMessage: 'Discover',
    },
    {
      id: 'VENU.Main.Header.mode.itinerary',
      defaultMessage: 'Itinerary',
    },
    {
      id: 'VENU.Main.Header.mode.facilities',
      defaultMessage: 'Facilities',
    },
  ],
});
