/*
 * App Messages
 *
 * This contains all the text for the App component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'venu.components.App.title',
    defaultMessage: 'VENU',
  },
  nav: [
    {
      id: 'venu.components.App.nav.map',
      link: '',
      icon: 'ion-map',
      defaultMessage: 'Map',
    },
    {
      id: 'venu.components.App.nav.intinerary',
      link: 'itinerary',
      icon: 'ion-clipboard',
      defaultMessage: 'Itinerary',
    },
    {
      id: 'venu.components.App.nav.search',
      link: 'search',
      icon: 'ion-android-search',
      defaultMessage: 'Search',
    },
    {
      id: 'venu.components.App.nav.profile',
      link: 'profile',
      icon: 'ion-android-person',
      defaultMessage: 'Profile',
    },
  ],
});
