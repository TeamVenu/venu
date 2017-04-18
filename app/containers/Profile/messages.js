/*
 * Profile Messages
 *
 * This contains all the text for the Profile component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'venu.components.Profile.header',
    profile: {
      id: 'venu.components.Profile.header.profile',
      defaultMessage: 'VENU',
    },
    settings: {
      id: 'venu.components.Profile.header.settings',
      defaultMessage: 'Settings',
    },
    about: {
      id: 'venu.components.Profile.header.about',
      defaultMessage: 'About',
    },
    help: {
      id: 'venu.components.Profile.header.help',
      defaultMessage: 'Help',
    },
  },
  actions: {
    id: 'venu.components.Profile.actions',
    editProfile: {
      id: 'venu.components.Profile.actions.editProfile',
      defaultMessage: 'Edit Profile',
    },
    signOut: {
      id: 'venu.components.Profile.actions.signOut',
      defaultMessage: 'Sign Out',
    },
  },
  links: {
    id: 'venu.components.Profile.links',
    profile: {
      id: 'venu.components.Profile.links.profile',
      settings: {
        id: 'venu.components.Profile.links.profile.settings',
        defaultMessage: 'Settings',
      },
      about: {
        id: 'venu.components.Profile.links.profile.about',
        defaultMessage: 'About',
      },
      help: {
        id: 'venu.components.Profile.links.profile.help',
        defaultMessage: 'Help',
      },
    },
    settings: {
      id: 'venu.components.Profile.links.settings',
      email: {
        id: 'venu.components.Profile.links.settings.email',
        defaultMessage: 'Change Email Address',
      },
      password: {
        id: 'venu.components.Profile.links.settings.password',
        defaultMessage: 'Change Password',
      },
      interests: {
        id: 'venu.components.Profile.links.settings.interests',
        defaultMessage: 'Change Interests',
      },
      parking: {
        id: 'venu.components.Profile.links.settings.parking',
        defaultMessage: 'Change Parking Location',
      },
    },
    about: {
      id: 'venu.components.Profile.links.about',
      imagineRIT: {
        id: 'venu.components.Profile.links.about.imagineRIT',
        defaultMessage: 'About Imagine RIT',
      },
      venu: {
        id: 'venu.components.Profile.links.about.venu',
        defaultMessage: 'About VENU',
      },
    },
    help: {
      id: 'venu.components.Profile.links.help',
    },
  },
  editProfile: {
    id: 'venu.components.Profile.editProfile',
    header: {
      id: 'venu.components.Profile.editProfile.header',
      defaultMessage: 'Edit Profile',
    },
    nameLabel: {
      id: 'venu.components.Profile.editProfile.nameLabel',
      defaultMessage: 'Enter your name:',
    },
    ageLabel: {
      id: 'venu.components.Profile.editProfile.ageLabel',
      defaultMessage: 'Enter your age:',
    },
    uploadPicture: {
      id: 'venu.components.Profile.editProfile.uploadPicture',
      defaultMessage: 'Upload  a profile image',
    },
    updateProfile: {
      id: 'venu.components.Profile.editProfile.updateProfile',
      defaultMessage: 'Save Changes',
    },
  },
  settings: {
    id: 'venu.components.Profile.settings',
    changeEmail: {
      id: 'venu.components.Profile.settings.changeEmail',
      header: {
        id: 'venu.components.Profile.settings.changeEmail.header',
        defaultMessage: 'Email',
      },
      emailLabel: {
        id: 'venu.components.Profile.settings.changeEmail.emailLabel',
        defaultMessage: 'Enter your email:',
      },
      button: {
        id: 'venu.components.Profile.settings.changeEmail.button',
        defaultMessage: 'Update Email',
      },
    },
    changePassword: {
      id: 'venu.components.Profile.settings.changePassword',
      header: {
        id: 'venu.components.Profile.settings.changePassword.header',
        defaultMessage: 'Password',
      },
      passwordLabel: {
        id: 'venu.components.Profile.settings.changePassword.passwordLabel',
        defaultMessage: 'Enter password:',
      },
      passwordCheckLabel: {
        id: 'venu.components.Profile.settings.changePassword.passwordCheckLabel',
        defaultMessage: 'Confirm password:',
      },
      button: {
        id: 'venu.components.Profile.settings.changePassword.button',
        defaultMessage: 'Update Password',
      },
    },
    chooseInterests: {
      id: 'venu.components.Profile.settings.chooseInterests',
      header: {
        id: 'venu.components.Profile.settings.chooseInterests.header',
        defaultMessage: 'Interests',
      },
      interestList: [
        {
          id: 'venu.components.Profile.settings.chooseInterests.interests.art',
          defaultMessage: 'Art',
          name: 'art',
        },
        {
          id: 'venu.components.Profile.settings.chooseInterests.interests.business',
          defaultMessage: 'Business',
          name: 'business',
        },
        {
          id: 'venu.components.Profile.settings.chooseInterests.interests.communication',
          defaultMessage: 'Communication',
          name: 'communication',
        },
        {
          id: 'venu.components.Profile.settings.chooseInterests.interests.community',
          defaultMessage: 'Community',
          name: 'community',
        },
        {
          id: 'venu.components.Profile.settings.chooseInterests.interests.dance',
          defaultMessage: 'Dance',
          name: 'dance',
        },
        {
          id: 'venu.components.Profile.settings.chooseInterests.interests.design',
          defaultMessage: 'Design',
          name: 'design',
        },
        {
          id: 'venu.components.Profile.settings.chooseInterests.interests.energy',
          defaultMessage: 'Energy',
          name: 'energy',
        },
        {
          id: 'venu.components.Profile.settings.chooseInterests.interests.engineering',
          defaultMessage: 'Engineering',
          name: 'engineering',
        },
        {
          id: 'venu.components.Profile.settings.chooseInterests.interests.entrepreneurship',
          defaultMessage: 'Entrepreneurship',
          name: 'entrepreneurship',
        },
        {
          id: 'venu.components.Profile.settings.chooseInterests.interests.environment',
          defaultMessage: 'Environment',
          name: 'environment',
        },
        {
          id: 'venu.components.Profile.settings.chooseInterests.interests.gaming',
          defaultMessage: 'Gaming',
          name: 'gaming',
        },
        {
          id: 'venu.components.Profile.settings.chooseInterests.interests.global',
          defaultMessage: 'Global',
          name: 'global',
        },
        {
          id: 'venu.components.Profile.settings.chooseInterests.interests.health',
          defaultMessage: 'Health',
          name: 'health',
        },
        {
          id: 'venu.components.Profile.settings.chooseInterests.interests.math',
          defaultMessage: 'Math',
          name: 'math',
        },
        {
          id: 'venu.components.Profile.settings.chooseInterests.interests.multidisciplinary',
          defaultMessage: 'Multidisciplinary',
          name: 'multidisciplinary',
        },
        {
          id: 'venu.components.Profile.settings.chooseInterests.interests.music',
          defaultMessage: 'Music',
          name: 'music',
        },
        {
          id: 'venu.components.Profile.settings.chooseInterests.interests.ntid',
          defaultMessage: 'NTID',
          name: 'ntid',
        },
        {
          id: 'venu.components.Profile.settings.chooseInterests.interests.photography',
          defaultMessage: 'Photography',
          name: 'photography',
        },
        {
          id: 'venu.components.Profile.settings.chooseInterests.interests.science',
          defaultMessage: 'Science',
          name: 'science',
        },
        {
          id: 'venu.components.Profile.settings.chooseInterests.interests.seniorProjects',
          defaultMessage: 'Senior Projects',
          name: 'seniorProjects',
        },
        {
          id: 'venu.components.Profile.settings.chooseInterests.interests.sports',
          defaultMessage: 'Sports',
          name: 'sports',
        },
        {
          id: 'venu.components.Profile.settings.chooseInterests.interests.software',
          defaultMessage: 'Software',
          name: 'software',
        },
        {
          id: 'venu.components.Profile.settings.chooseInterests.interests.stem',
          defaultMessage: 'STEM',
          name: 'stem',
        },
        {
          id: 'venu.components.Profile.settings.chooseInterests.interests.studentOrganization',
          defaultMessage: 'Student Organization',
          name: 'studentOrganization',
        },
        {
          id: 'venu.components.Profile.settings.chooseInterests.interests.sustainability',
          defaultMessage: 'Sustainability',
          name: 'sustainability',
        },
        {
          id: 'venu.components.Profile.settings.chooseInterests.interests.technology',
          defaultMessage: 'Technology',
          name: 'technology',
        },
      ],
      button: {
        id: 'venu.components.Profile.settings.chooseInterests.button',
        defaultMessage: 'Save Interests',
      },
    },
    changeParking: {
      id: 'venu.components.Profile.settings.changeParking',
      header: {
        id: 'venu.components.Profile.settings.changeParking.header',
        defaultMessage: 'Parking',
      },
      lot: {
        id: 'venu.components.Profile.settings.changeParking.parking.lot',
        lots: [
          {
            id: 'venu.components.Profile.settings.changeParking.parking.lot.a',
            name: 'lotA',
            value: 0,
            defaultMessage: 'Lot A',
            location: {
              lat: 43.083631,
              lng: -77.662081,
            },
          },
          {
            id: 'venu.components.Profile.settings.changeParking.parking.lot.b',
            name: 'lotB',
            value: 1,
            defaultMessage: 'Lot B',
            location: {
              lat: 43.083611,
              lng: -77.663345,
            },
          },
          {
            id: 'venu.components.Profile.settings.changeParking.parking.lot.c',
            name: 'lotC',
            value: 2,
            defaultMessage: 'Lot C',
            location: {
              lat: 43.083403,
              lng: -77.667142,
            },
          },
          {
            id: 'venu.components.Profile.settings.changeParking.parking.lot.f',
            name: 'lotF',
            value: 3,
            defaultMessage: 'Lot F',
            location: {
              lat: 43.086850,
              lng: -77.677825,
            },
          },
          {
            id: 'venu.components.Profile.settings.changeParking.parking.lot.l',
            name: 'lotL',
            value: 4,
            defaultMessage: 'Lot L',
            location: {
              lat: 43.086958,
              lng: -77.666903,
            },
          },
          {
            id: 'venu.components.Profile.settings.changeParking.parking.lot.k',
            name: 'lotK',
            value: 5,
            defaultMessage: 'Lot K',
            location: {
              lat: 43.085822,
              lng: -77.664929,
            },
          },
          {
            id: 'venu.components.Profile.settings.changeParking.parking.lot.n',
            name: 'lotN',
            value: 6,
            defaultMessage: 'Lot N',
            location: {
              lat: 43.088119,
              lng: -77.672884,
            },
          },
          {
            id: 'venu.components.Profile.settings.changeParking.parking.lot.r',
            name: 'lotR',
            value: 7,
            defaultMessage: 'Lot R',
            location: {
              lat: 43.081420,
              lng: -77.678126,
            },
          },
          {
            id: 'venu.components.Profile.settings.changeParking.parking.lot.s',
            name: 'lotS',
            value: 8,
            defaultMessage: 'Lot S',
            location: {
              lat: 43.081710,
              lng: -77.680046,
            },
          },
          {
            id: 'venu.components.Profile.settings.changeParking.parking.lot.u',
            name: 'lotU',
            value: 9,
            defaultMessage: 'Lot U',
            location: {
              lat: 43.081804,
              lng: -77.673952,
            },
          },
          {
            id: 'venu.components.Profile.settings.changeParking.parking.lot.globalVillage',
            name: 'lotGlobalVillage',
            value: 10,
            defaultMessage: 'Global Village Lot',
            location: {
              lat: 43.084053,
              lng: -77.683286,
            },
          },
          {
            id: 'venu.components.Profile.settings.changeParking.parking.lot.universityCommons',
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
      button: {
        id: 'venu.components.Profile.settings.changeParking.button',
        defaultMessage: 'Update Parking Spot',
      },
    },
  },
  about: {
    id: 'venu.components.Profile.about',
    aboutImagineRIT: {
      id: 'venu.components.Profile.about.aboutImagineRIT',
    },
    aboutVenu: {
      id: 'venu.components.Profile.about.aboutVenu',
    },
  },
  help: {
    id: 'venu.components.Profile.help',
  },
});
