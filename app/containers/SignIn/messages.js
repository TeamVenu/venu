/*
 * Sign In Messages
 *
 * This contains all the text for the SignIn component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'venu.components.SignIn.header',
    defaultMessage: 'VENU',
  },
  intro: {
    id: 'venu.components.SignIn.intro',
    defaultMessage: 'A wayfinding app that assists you in finding nearby activities that you might be interested in.',
  },
  buttons: {
    id: 'venu.components.SignIn.buttons',
    createAccount: {
      id: 'venu.components.SignIn.buttons.createAccount',
      defaultMessage: 'Create An Account',
    },
    hasAccount: {
      id: 'venu.components.SignIn.buttons.hasAccount',
      defaultMessage: 'I already have an account',
    },
    signIn: {
      id: 'venu.components.SignIn.buttons.signIn',
      defaultMessage: 'Sign In',
    },
  },
  signIn: {
    id: 'venu.components.SignIn.signIn',
    emailLabel: {
      id: 'venu.components.SignIn.signIn.emailLabel',
      defaultMessage: 'Email',
    },
    passwordLabel: {
      id: 'venu.components.SignIn.signIn.passwordLabel',
      defaultMessage: 'Password',
    },
    forgotPassword: {
      id: 'venu.components.SignIn.signIn.forgotPassword',
      defaultMessage: 'Forgot password?',
    },
  },
});
