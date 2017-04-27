/* Helper Methods */

import _ from 'lodash';

/**
 * getFacilitiesArray
 * Returns an array of all facilities based on facilities object
 * @param  {Object} facilities
 * @return {Array}
 */
export function getFacilitiesArray(facilities) {
  return facilities.entertainment.concat(facilities.entrance, facilities.food, facilities.information, facilities.medical, facilities.restroom, facilities.shuttle, facilities.transporter);
}

/**
 * getFacilitiesArray
 * Returns an array of all exhibits based on exhibits object
 * @param  {Object} exhibits
 * @return {Array}
 */
export function getExhibitsArray(exhibits) {
  return exhibits.artisticAlley.concat(
    exhibits.businessDistrict, exhibits.computerZone, exhibits.engineeringPark, exhibits.globalVillage,
    exhibits.greenPlace, exhibits.innovationCenter, exhibits.ntidArea, exhibits.recreationZone, exhibits.ritCentral,
    exhibits.scienceCenter, exhibits.technologyQuarter, exhibits.thinkTank
  );
}

/**
 * getPlacesArray
 * Returns an array of all exhibits and facilities based on exhibits and facilities objects
 * @param  {Object} exhibits
 * @param  {Object} facilities
 * @return {Array}
 */
export function getPlacesArray(exhibits, facilities) {
  const exhibitsArray = getExhibitsArray(exhibits);
  const facilitiesArray = getFacilitiesArray(facilities);

  return exhibitsArray.concat(facilitiesArray);
}

/**
 * filterExhibitsBy
 * Returns a filtered array of exhibits of length max depending on the value of its prop
 * @param  {Object} exhibits
 * @param  {String} prop
 * @param  {String} value
 * @param  {Number} max
 * @return {Array}
 */
export function filterExhibitsBy(exhibits, prop, value, max) {
  // Store the array of exhibits
  const exhibitArray = getExhibitsArray(exhibits).filter((exhibit, index) => {
    // If there is a max number
    // And the max number is greater than iteration
    // Don't return anything
    if (max && max > index) return null;

    // Otherwise return the exhibit
    return exhibit[prop] === value;
  });

  // Return filtered exhibits
  return exhibitArray;
}

/**
 * filterFacilitiesBy
 * Returns a filtered array of facilities of length max depending on the value of its prop
 * @param  {Object} facilities
 * @param  {String} prop
 * @param  {String} value
 * @param  {Number} max
 * @return {Array}
 */
export function filterFacilitiesBy(facilities, prop, value, max) {
  // Get the current iteration
  let iteration = 0;

  // Store the array of facilities
  const facilityArray = getExhibitsArray(facilities).filter((facility) => {
    // Increment iteration
    iteration += 1;

    // If there is a max number
    // And the max number is greater than iteration
    // Don't return anything
    if (max && max > iteration) return null;

    // Otherwise return the facility
    return facility[prop] === value;
  });

  // Return filtered facilities
  return facilityArray;
}

/**
 * getBroswer
 * Returns browser information
 */
export function getBroswer() {
  const patterns = {
    broswers: /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i,
    trident: /trident/i,
    ie: /\brv[ :]+(\d+)/g,
    opera: /\bOPR|Edge\/(\d+)/,
    version: /version\/(\d+)/i,
  };

  const userAgent = navigator.userAgent;
  let temp;
  let broswerArray = userAgent.match(patterns.broswers) || [];

  if (patterns.trident.test(broswerArray[1])) {
    temp = patterns.ie.exec(userAgent) || [];
    return {
      name: 'IE',
      version: (temp[1] || ''),
    };
  }

  if (broswerArray[1] === 'Chrome') {
    temp = userAgent.match(patterns.opera);

    if (temp !== null) {
      return {
        name: 'Opera',
        version: temp[1],
      };
    }
  }
  broswerArray = broswerArray[2] ? [broswerArray[1], broswerArray[2]] : [navigator.appName, navigator.appVersion, '-?'];

  const versionMatch = temp = userAgent.match(patterns.version);

  if (versionMatch !== null) {
    broswerArray.splice(1, 1, temp[1]);
  }

  return {
    name: broswerArray[0],
    version: broswerArray[1],
  };
}

export function isUserOnboardingComplete(user) {
  return (user.location.lat !== ''
    && user.location.lng !== ''
    && user.interests.length > 0
  );
}

export function cleanString(string) {
  let str = string;

  const shorthandsPattern = /\'(m|ve|s|ll|d) /gi; // eslint-disable-line
  const letterWithPeriodAtTheEndPattern = /( \w{0,1})?\. /gi;
  const forwardSlashPattern = /\//gi;
  const versionNumberPattern = / v?\.?[0-9]+(\.[0-9]+)+/gi;
  const timePattern = / [0-9]{1,2}(?: |\:[0-9]{2})? ?(?:a|p)\.?m\.? /gi; // eslint-disable-line
  const specialCharactersPattern = /[`~!@#$%^&*()\-_=+,<\.>/?\[\{\]\}\\|\;\:\'\"]+/g; // eslint-disable-line
  // const duplicateSpecialCharactersPattern = /([`~!@#$%^&*()\-_=+,<\.>/?\[\{\]\}\\|\;\:\'\"])\1+/g;
  str = str.replace(shorthandsPattern, ' ');
  str = str.replace(letterWithPeriodAtTheEndPattern, ' ');
  str = str.replace(forwardSlashPattern, ' ');

  // Delete versions
  str = str.replace(versionNumberPattern, ' ');

  // Delete time such as 10 am, 10:20pm, 1:30 a.m., 01:30p.m.
  str = str.replace(timePattern, ' '); // eslint-disable-line

  // Delete 2 or more consecutive symbols or spaces
  // str = str.replace(duplicateSpecialCharactersPattern, ' '); // eslint-disable-line

  str = str.replace(specialCharactersPattern, ' '); // eslint-disable-line

  return str;
}

export function removeDuplicates(string) {
  return string.split(' ').filter((item, i, allItems) => { // eslint-disable-line
    return i === allItems.indexOf(item);
  }).join(' ');
}

export function parseJSONObject(object, objectKey) {
  // Special props to be stored
  let placeKey = null;
  let type = '';
  let colorOrSub = '';

  //
  let result = '';

  _.forOwn(object, (key, val) => {
    const objectType = typeof value;
    let value = val;

    if (objectType !== 'string' && objectType !== 'number') {
      // Recursion for non string nor number objects (deep search)
      result += parseJSONObject(value, key);
    } else {
      // Store special keys
      if (key === 'key') {
        placeKey = value;
      } else if (key === 'type') {
        type = value;
      } else if (
        (type === 'exhibit' && key === 'colorZone')
        || (type === 'facility' && key === 'subType')
      ) {
        colorOrSub = value;
      }

      if (objectKey === 'tags') {
        value = value.toLowerCase();
        value = cleanString(value);
        value = removeDuplicates(value);

        // Add it if wasn't already added
        if (result.search(value) === -1) {
          result += `${value} `;
        }
      } else {
        // Using switch to avoid creating an array in each call nor a global array
        switch (key) {
          case 'name':
          case 'imagineRITArea':
          case 'building':
          case 'location':
          case 'description':
          case 'exhibitors':
          case 'exhibitCode':
            value = value.toLowerCase();
            value = cleanString(value);
            value = removeDuplicates(value);
            // Add it if wasn't already added
            if (result.search(value) === -1) {
              result += `${value} `;
            }
            break;
          default:
            break;
        }
      }
    }
  });

  const doubleSpacePattern = / +/g;
  result = result.replace(doubleSpacePattern, ' ');

  if (placeKey == null) {
    return result;
  }

  return `${result}~!@#k#@!~${placeKey}~!@#t#@!~${type}~!@#c#@!~${colorOrSub}\\n\\n\\n`;
}

export function search(query, data, asUnion) {
  const newLinePattern = /\\n/g;

  let terms = query.toLowerCase();
  const results = [];
  const formattedData = data.replace(newLinePattern, '\n');

  // Clean
  terms = cleanString(terms);
  terms = removeDuplicates(terms);

  //
  terms = (asUnion) ? [terms.trim()] : terms.trim().split(' ');

  terms.forEach((term) => {
    //
    const searchRegex = new RegExp(`(?:.*?(?:${term}).*?)(?!(?:#@!~))(?:~!@#k#@!~)(.*?)~!@#t#@!~(.*?)~!@#c#@!~(.*?)(?:\n\n\n)`, 'gi');
    let match;
    //
    while (match = searchRegex.exec(formattedData)) { // eslint-disable-line
      results.push({ key: match[1], type: match[2], subType: match[3] });
    }
  });

  // Return results array
  return results;
}
