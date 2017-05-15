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
    defaultMessage: 'A wayfinding app for Imagine RIT.',
  },
  subtitle: {
    id: 'venu.components.SignIn.subtitle',
    defaultMessage: 'A New Media Capstone Project',
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
    anonymous: {
      id: 'venu.components.SignIn.signIn.anonymous',
      defaultMessage: 'Continue As Guest',
    },
    loading: {
      id: 'venu.components.SignIn.signIn.loading',
      defaultMessage: 'Signing you in. Please wait...',
    },
    facebook: {
      id: 'venu.components.SignIn.signIn.facebook',
      defaultMessage: 'Continue With Facebook',
    },
    google: {
      id: 'venu.components.SignIn.signIn.google',
      defaultMessage: 'Continue With Google',
    },
    cancel: {
      id: 'venu.components.SignIn.signIn.cancel',
      defaultMessage: 'Sign in with another service',
    },
  },
});
