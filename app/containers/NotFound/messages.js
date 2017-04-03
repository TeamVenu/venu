/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  messages: {
    id: 'app.components.NotFoundPage.messages',
    title: {
      id: 'app.components.NotFoundPage.message.title',
      defaultMessage: 'VENU',
    },
    intro: {
      id: 'app.components.NotFoundPage.message.intro',
      defaultMessage: 'Page not found!',
    },
    desc: {
      id: 'app.components.NotFoundPage.message.desc',
      defaultMessage: 'We were unable to find the page you were looking for.',
    },
    action: {
      id: 'app.components.NotFoundPage.message.action',
      defaultMessage: 'Home',
    },
  },
});
