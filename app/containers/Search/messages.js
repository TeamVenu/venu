/*
 * Search Messages
 *
 * This contains all the text for the Profile component.
 */
import { defineMessages } from 'react-intl';
import Dining from 'media/icons/facilities/food.png';
import Entertainment from 'media/icons/facilities/entertainment.png';
import Entrance from 'media/icons/facilities/entrance.png';
import Information from 'media/icons/facilities/information.png';
import Man from 'media/icons/facilities/man.png';
import Medical from 'media/icons/facilities/medical.png';
import Shuttle from 'media/icons/facilities/shuttle.png';
import Transport from 'media/icons/facilities/transport.png';
import Unisex from 'media/icons/facilities/genderneutral.png';
import Woman from 'media/icons/facilities/woman.png';

export default defineMessages({
  header: {
    id: 'venu.components.Search.header',
    defaultMessage: 'Search',
  },
  tagsHeader: {
    id: 'venu.components.Search.tagsHeader',
    defaultMessage: 'Your favorite tags',
  },
  facilitiesHeader: {
    id: 'venu.components.Search.facilitiesHeader',
    defaultMessage: 'Find facilities',
  },
  facilities: [
    {
      id: 'venu.components.Search.facilities.dining',
      name: 'Dining Areas',
      term: 'food',
      src: Dining,
    },
    {
      id: 'venu.components.Search.facilities.womenRestroom',
      name: 'Women\'s Restroom',
      term: 'women\'s restroom',
      src: Woman,
    },
    {
      id: 'venu.components.Search.facilities.menRestroom',
      name: 'Men\'s Restroom',
      term: 'men\'s restroom',
      src: Man,
    },
    {
      id: 'venu.components.Search.facilities.unisexRestroom',
      name: 'Gender Neutral Restroom',
      term: 'gender neutral restroom',
      src: Unisex,
    },
    {
      id: 'venu.components.Search.facilities.entertainment',
      name: 'Live Entertainment',
      term: 'entertainment',
      src: Entertainment,
    },
    {
      id: 'venu.components.Search.facilities.medical',
      name: 'Medical',
      term: 'emergency station',
      src: Medical,
    },
    {
      id: 'venu.components.Search.facilities.information',
      name: 'Information',
      term: 'information station',
      src: Information,
    },
    {
      id: 'venu.components.Search.facilities.transporter',
      name: 'People Mover Stopper',
      term: 'transporter',
      src: Transport,
    },
    {
      id: 'venu.components.Search.facilities.shuttle',
      name: 'Bus Stop',
      term: 'shuttle',
      src: Shuttle,
    },
    {
      id: 'venu.components.Search.facilities.entrance',
      name: 'Welcome Center',
      term: 'entrance',
      src: Entrance,
    },
  ],
  recommended: {
    artisticAlley: {
      id: 'venu.components.Search.recommended.artisticAlley',
      defaultMessage: 'Recommended in Artistic Alley',
    },
    businessDistrict: {
      id: 'venu.components.Search.recommended.businessDistrict',
      defaultMessage: 'Recommended in Business District',
    },
    computerZone: {
      id: 'venu.components.Search.recommended.computerZone',
      defaultMessage: 'Recommended in Computer Zone',
    },
    engineeringPark: {
      id: 'venu.components.Search.recommended.engineeringPark',
      defaultMessage: 'Recommended in Engineering Park',
    },
    globalVillage: {
      id: 'venu.components.Search.recommended.globalVillage',
      defaultMessage: 'Recommended in Global Village',
    },
    greenPlace: {
      id: 'venu.components.Search.recommended.greenPlace',
      defaultMessage: 'Recommended in Green Place',
    },
    innovationCenter: {
      id: 'venu.components.Search.recommended.innovationCenter',
      defaultMessage: 'Recommended in Innovation Center',
    },
    ntidArea: {
      id: 'venu.components.Search.recommended.ntidArea',
      defaultMessage: 'Recommended in NTID Area',
    },
    recreationZone: {
      id: 'venu.components.Search.recommended.recreationZone',
      defaultMessage: 'Recommended in Recreation Zone',
    },
    ritCentral: {
      id: 'venu.components.Search.recommended.ritCentral',
      defaultMessage: 'Recommended in RIT Central',
    },
    scienceCenter: {
      id: 'venu.components.Search.recommended.scienceCenter',
      defaultMessage: 'Recommended in Science Center',
    },
    technologyQuarter: {
      id: 'venu.components.Search.recommended.technologyQuarter',
      defaultMessage: 'Recommended in Technology Quarter',
    },
    thinkTank: {
      id: 'venu.components.Search.recommended.thinkTank',
      defaultMessage: 'Recommended in The Think Tank',
    },
  },
  recommendedArray: [
    {
      id: 'venu.components.Search.recommended.artisticAlley',
      defaultMessage: 'Recommended in Artistic Alley',
      name: 'artisticAlley',
    },
    {
      id: 'venu.components.Search.recommended.businessDistrict',
      defaultMessage: 'Recommended in Business District',
      name: 'businessDistrict',
    },
    {
      id: 'venu.components.Search.recommended.computerZone',
      defaultMessage: 'Recommended in Computer Zone',
      name: 'computerZone',
    },
    {
      id: 'venu.components.Search.recommended.engineeringPark',
      defaultMessage: 'Recommended in Engineering Park',
      name: 'engineeringPark',
    },
    {
      id: 'venu.components.Search.recommended.globalVillage',
      defaultMessage: 'Recommended in Global Village',
      name: 'globalVillage',
    },
    {
      id: 'venu.components.Search.recommended.greenPlace',
      defaultMessage: 'Recommended in Green Place',
      name: 'greenPlace',
    },
    {
      id: 'venu.components.Search.recommended.innovationCenter',
      defaultMessage: 'Recommended in Innovation Center',
      name: 'innovationCenter',
    },
    {
      id: 'venu.components.Search.recommended.ntidArea',
      defaultMessage: 'Recommended in NTID Area',
      name: 'ntidArea',
    },
    {
      id: 'venu.components.Search.recommended.recreationZone',
      defaultMessage: 'Recommended in Recreation Zone',
      name: 'recreationZone',
    },
    {
      id: 'venu.components.Search.recommended.ritCentral',
      defaultMessage: 'Recommended in RIT Central',
      name: 'ritCentral',
    },
    {
      id: 'venu.components.Search.recommended.scienceCenter',
      defaultMessage: 'Recommended in Science Center',
      name: 'scienceCenter',
    },
    {
      id: 'venu.components.Search.recommended.technologyQuarter',
      defaultMessage: 'Recommended in Technology Quarter',
      name: 'technologyQuarter',
    },
    {
      id: 'venu.components.Search.recommended.thinkTank',
      defaultMessage: 'Recommended in The Think Tank',
      name: 'thinkTank',
    },
  ],
});
