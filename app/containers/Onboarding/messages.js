/*
 * Onboarding Messages
 *
 * This contains all the text for the Onboarding component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'venu.components.Onboarding.header',
    defaultMessage: 'VENU',
  },
  buttons: {
    id: 'venu.components.Onboarding.buttons',
    previous: {
      id: 'venu.components.Onboarding.buttons.previous',
      defaultMessage: 'Back',
    },
    next: {
      id: 'venu.components.Onboarding.buttons.next',
      defaultMessage: 'Continue',
    },
    finish: {
      id: 'venu.components.Onboarding.buttons.finish',
      defaultMessage: 'Launch',
    },
    retryGeolocation: {
      id: 'venu.components.Onboarding.buttons.retryGeolocation',
      defaultMessage: 'Retry Enabling Location',
    },
  },
  accountCreation: {
    id: 'venu.components.Onboarding.accountCreation',
    title: {
      id: 'venu.components.Onboarding.accountCreation.title',
      defaultMessage: 'Welcome to VENU!',
    },
    subtitle: {
      id: 'venu.components.Onboarding.accountCreation.subtitle',
      defaultMessage: 'Create Account',
    },
    nameLabel: {
      id: 'venu.components.Onboarding.accountCreation.nameLabel',
      defaultMessage: 'Enter your name:',
    },
    emailLabel: {
      id: 'venu.components.Onboarding.accountCreation.emailLabel',
      defaultMessage: 'Enter your email:',
    },
    passwordLabel: {
      id: 'venu.components.Onboarding.accountCreation.passwordLabel',
      defaultMessage: 'Enter password:',
    },
    passwordCheckLabel: {
      id: 'venu.components.Onboarding.accountCreation.passwordCheckLabel',
      defaultMessage: 'Confirm password:',
    },
    ageLabel: {
      id: 'venu.components.Onboarding.accountCreation.ageLabel',
      defaultMessage: 'Enter your age:',
    },
  },
  geolocationSetup: {
    id: 'venu.components.Onboarding.geolocationSetup',
    title: {
      id: 'venu.components.Onboarding.geolocationSetup.title',
      defaultMessage: 'Enable Location',
    },
    intro: {
      id: 'venu.components.Onboarding.geolocationSetup.intro',
      defaultMessage: ' For a better experience VENU will need access to your location.',
    },
    location: {
      id: 'venu.components.Onboarding.geolocationSetup.location',
      retrieving: {
        id: 'venu.components.Onboarding.geolocationSetup.location.retrieving',
        defaultMessage: ' For a better experience VENU will need access to your location. This might take a few seconds.',
      },
      succeeded: {
        id: 'venu.components.Onboarding.geolocationSetup.location.succeeded',
        defaultMessage: 'We have successfully retrieved your location! You may now continue the setup process.',
      },
      failed: {
        id: 'venu.components.Onboarding.geolocationSetup.location.failed',
        defaultMessage: 'You have denied access to access your location. You may retry enabling your location. Otherwise you may proceed to the next step if you wish geolocation to remain turned off. Some features will be unavailable.',
      },
      unavailable: {
        id: 'venu.components.Onboarding.geolocationSetup.location.unavailable',
        defaultMessage: 'It appears that your device has location tracking services disabled. You may proceed to the next step if you wish geolocation to remain turned off. Some features will be unavailable.',
      },
    },
    device: {
      id: 'venu.components.Onboarding.geolocationSetup.device',
      android: {
        id: 'venu.components.Onboarding.geolocationSetup.device.android',
        chrome: {
          id: 'venu.components.Onboarding.geolocationSetup.device.android.chrome',
          defaultMessages: [
            'ANDROID',
            'CHROME',
            'INSTRUCTIONS ON HOW TO ENABLE GEOLOCATION',
          ],
        },
        firefox: {
          id: 'venu.components.Onboarding.geolocationSetup.device.android.firefox',
          defaultMessages: [
            'ANDROID',
            'FIREFOX',
            'INSTRUCTIONS ON HOW TO ENABLE GEOLOCATION',
          ],
        },
      },
      ios: {
        id: 'venu.components.Onboarding.geolocationSetup.device.ios',
        chrome: {
          id: 'venu.components.Onboarding.geolocationSetup.device.ios.chrome',
          defaultMessages: [
            'iOS',
            'CHROME',
            'INSTRUCTIONS ON HOW TO ENABLE GEOLOCATION',
          ],
        },
        firefox: {
          id: 'venu.components.Onboarding.geolocationSetup.device.ios.firefox',
          defaultMessages: [
            'iOS',
            'FIREFOX',
            'INSTRUCTIONS ON HOW TO ENABLE GEOLOCATION',
          ],
        },
        safari: {
          id: 'venu.components.Onboarding.geolocationSetup.device.ios.safari',
          defaultMessages: [
            'iOS',
            'SAFARI',
            'INSTRUCTIONS ON HOW TO ENABLE GEOLOCATION',
          ],
        },
      },
      web: {
        id: 'venu.components.Onboarding.geolocationSetup.device.web',
        chrome: {
          id: 'venu.components.Onboarding.geolocationSetup.device.web.chrome',
          defaultMessages: [
            'WEB',
            'CHROME',
            'INSTRUCTIONS ON HOW TO ENABLE GEOLOCATION',
          ],
        },
        edge: {
          id: 'venu.components.Onboarding.geolocationSetup.device.web.edge',
          defaultMessages: [
            'WEB',
            'MICROSOFT EDGE',
            'INSTRUCTIONS ON HOW TO ENABLE GEOLOCATION',
          ],
        },
        firefox: {
          id: 'venu.components.Onboarding.geolocationSetup.device.web.firefox',
          defaultMessages: [
            'WEB',
            'FIREFOX',
            'INSTRUCTIONS ON HOW TO ENABLE GEOLOCATION',
          ],
        },
        ie: {
          id: 'venu.components.Onboarding.geolocationSetup.device.web.ie',
          defaultMessages: [
            'WEB',
            'INTERNET EXPLODER (why?)',
            'INSTRUCTIONS ON HOW TO ENABLE GEOLOCATION',
          ],
        },
        safari: {
          id: 'venu.components.Onboarding.geolocationSetup.device.web.safari',
          defaultMessages: [
            'WEB',
            'SAFARI',
            'INSTRUCTIONS ON HOW TO ENABLE GEOLOCATION',
          ],
        },
      },
    },
    parking: {
      id: 'venu.components.Onboarding.geolocationSetup.parking',
      title: {
        id: 'venu.components.Onboarding.geolocationSetup.parking.title',
        defaultMessage: 'Set a parking spot reminder',
      },
      description: {
        id: 'venu.components.Onboarding.geolocationSetup.parking.description',
        defaultMessage: 'You can set your current location as a parking spot so you can return to your vehicle with ease. Alternatively, if you are not currently parked here you can select the lot in which you parked.',
      },
      lot: {
        id: 'venu.components.Onboarding.geolocationSetup.parking.lot',
        lots: [
          {
            id: 'venu.components.Onboarding.geolocationSetup.parking.lot.a',
            name: 'lotA',
            value: 0,
            defaultMessage: 'Lot A',
            location: {
              lat: 43.083631,
              lng: -77.662081,
            },
          },
          {
            id: 'venu.components.Onboarding.geolocationSetup.parking.lot.b',
            name: 'lotB',
            value: 1,
            defaultMessage: 'Lot B',
            location: {
              lat: 43.083611,
              lng: -77.663345,
            },
          },
          {
            id: 'venu.components.Onboarding.geolocationSetup.parking.lot.c',
            name: 'lotC',
            value: 2,
            defaultMessage: 'Lot C',
            location: {
              lat: 43.083403,
              lng: -77.667142,
            },
          },
          {
            id: 'venu.components.Onboarding.geolocationSetup.parking.lot.f',
            name: 'lotF',
            value: 3,
            defaultMessage: 'Lot F',
            location: {
              lat: 43.086850,
              lng: -77.677825,
            },
          },
          {
            id: 'venu.components.Onboarding.geolocationSetup.parking.lot.l',
            name: 'lotL',
            value: 4,
            defaultMessage: 'Lot L',
            location: {
              lat: 43.086958,
              lng: -77.666903,
            },
          },
          {
            id: 'venu.components.Onboarding.geolocationSetup.parking.lot.k',
            name: 'lotK',
            value: 5,
            defaultMessage: 'Lot K',
            location: {
              lat: 43.085822,
              lng: -77.664929,
            },
          },
          {
            id: 'venu.components.Onboarding.geolocationSetup.parking.lot.n',
            name: 'lotN',
            value: 6,
            defaultMessage: 'Lot N',
            location: {
              lat: 43.088119,
              lng: -77.672884,
            },
          },
          {
            id: 'venu.components.Onboarding.geolocationSetup.parking.lot.r',
            name: 'lotR',
            value: 7,
            defaultMessage: 'Lot R',
            location: {
              lat: 43.081420,
              lng: -77.678126,
            },
          },
          {
            id: 'venu.components.Onboarding.geolocationSetup.parking.lot.s',
            name: 'lotS',
            value: 8,
            defaultMessage: 'Lot S',
            location: {
              lat: 43.081710,
              lng: -77.680046,
            },
          },
          {
            id: 'venu.components.Onboarding.geolocationSetup.parking.lot.u',
            name: 'lotU',
            value: 9,
            defaultMessage: 'Lot U',
            location: {
              lat: 43.081804,
              lng: -77.673952,
            },
          },
          {
            id: 'venu.components.Onboarding.geolocationSetup.parking.lot.globalVillage',
            name: 'lotGlobalVillage',
            value: 10,
            defaultMessage: 'Global Village Lot',
            location: {
              lat: 43.084053,
              lng: -77.683286,
            },
          },
          {
            id: 'venu.components.Onboarding.geolocationSetup.parking.lot.universityCommons',
            name: 'lotRITCommons',
            value: 11,
            defaultMessage: 'RIT University Commons Lot',
            location: {
              lat: 43.079830,
              lng: -77.678009,
            },
          },
        ],
      },
    },
  },
  interestSelection: {
    id: 'venu.components.Onboarding.interestSelection',
    title: {
      id: 'venu.components.Onboarding.interestSelection.title',
      defaultMessage: 'Personalize',
    },
    intro: {
      id: 'venu.components.Onboarding.interestSelection.intro',
      defaultMessage: 'Select your interests so we can recommend events you may like.',
    },
    subtitle: {
      id: 'venu.components.Onboarding.interestSelection.title',
      defaultMessage: 'Choose your interests',
    },
    interests: [
      {
        id: 'venu.components.Onboarding.interestSelection.interests.art',
        defaultMessage: 'Art',
        name: 'art',
      },
      {
        id: 'venu.components.Onboarding.interestSelection.interests.business',
        defaultMessage: 'Business',
        name: 'business',
      },
      {
        id: 'venu.components.Onboarding.interestSelection.interests.communication',
        defaultMessage: 'Communication',
        name: 'communication',
      },
      {
        id: 'venu.components.Onboarding.interestSelection.interests.community',
        defaultMessage: 'Community',
        name: 'community',
      },
      {
        id: 'venu.components.Onboarding.interestSelection.interests.dance',
        defaultMessage: 'Dance',
        name: 'dance',
      },
      {
        id: 'venu.components.Onboarding.interestSelection.interests.design',
        defaultMessage: 'Design',
        name: 'design',
      },
      {
        id: 'venu.components.Onboarding.interestSelection.interests.energy',
        defaultMessage: 'Energy',
        name: 'energy',
      },
      {
        id: 'venu.components.Onboarding.interestSelection.interests.engineering',
        defaultMessage: 'Engineering',
        name: 'engineering',
      },
      {
        id: 'venu.components.Onboarding.interestSelection.interests.entrepreneurship',
        defaultMessage: 'Entrepreneurship',
        name: 'entrepreneurship',
      },
      {
        id: 'venu.components.Onboarding.interestSelection.interests.environment',
        defaultMessage: 'Environment',
        name: 'environment',
      },
      {
        id: 'venu.components.Onboarding.interestSelection.interests.gaming',
        defaultMessage: 'Gaming',
        name: 'gaming',
      },
      {
        id: 'venu.components.Onboarding.interestSelection.interests.global',
        defaultMessage: 'Global',
        name: 'global',
      },
      {
        id: 'venu.components.Onboarding.interestSelection.interests.health',
        defaultMessage: 'Health',
        name: 'health',
      },
      {
        id: 'venu.components.Onboarding.interestSelection.interests.math',
        defaultMessage: 'Math',
        name: 'math',
      },
      {
        id: 'venu.components.Onboarding.interestSelection.interests.multidisciplinary',
        defaultMessage: 'Multidisciplinary',
        name: 'multidisciplinary',
      },
      {
        id: 'venu.components.Onboarding.interestSelection.interests.music',
        defaultMessage: 'Music',
        name: 'music',
      },
      {
        id: 'venu.components.Onboarding.interestSelection.interests.ntid',
        defaultMessage: 'NTID',
        name: 'ntid',
      },
      {
        id: 'venu.components.Onboarding.interestSelection.interests.photography',
        defaultMessage: 'Photography',
        name: 'photography',
      },
      {
        id: 'venu.components.Onboarding.interestSelection.interests.science',
        defaultMessage: 'Science',
        name: 'science',
      },
      {
        id: 'venu.components.Onboarding.interestSelection.interests.seniorProjects',
        defaultMessage: 'Senior Projects',
        name: 'seniorProjects',
      },
      {
        id: 'venu.components.Onboarding.interestSelection.interests.sports',
        defaultMessage: 'Sports',
        name: 'sports',
      },
      {
        id: 'venu.components.Onboarding.interestSelection.interests.software',
        defaultMessage: 'Software',
        name: 'software',
      },
      {
        id: 'venu.components.Onboarding.interestSelection.interests.stem',
        defaultMessage: 'STEM',
        name: 'stem',
      },
      {
        id: 'venu.components.Onboarding.interestSelection.interests.studentOrganization',
        defaultMessage: 'Student Organization',
        name: 'studentOrganization',
      },
      {
        id: 'venu.components.Onboarding.interestSelection.interests.sustainability',
        defaultMessage: 'Sustainability',
        name: 'sustainability',
      },
      {
        id: 'venu.components.Onboarding.interestSelection.interests.technology',
        defaultMessage: 'Technology',
        name: 'technology',
      },
    ],
  },
});
