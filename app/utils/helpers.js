/* Helper Methods */

/**
 * getFacilitiesArray
 * Returns an array of all facilities based on facilities object
 * @param  {Object} facilities
 * @return {Array}
 */
export function getFacilitiesArray(facilities) {
  return facilities.food.concat(facilities.information, facilities.medical, facilities.restroom);
}

/**
 * getFacilitiesArray
 * Returns an array of all exhibits based on exhibits object
 * @param  {Object} exhibits
 * @return {Array}
 */
export function getExhibitsArray(exhibits) {
  return exhibits.recreationZone.concat(
    exhibits.ritCentral, exhibits.ntidArea, exhibits.informationStation, exhibits.thinkTank, exhibits.artisticAlley,
    exhibits.engineeringPark, exhibits.scienceCenter, exhibits.businessDistrict, exhibits.innovationCenter, exhibits.globalVillage,
    exhibits.greenPlace, exhibits.technologyQuarter, exhibits.computerZone
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
  // Get the current iteration
  let iteration = 0;

  // Store the array of exhibits
  const exhibitArray = getExhibitsArray(exhibits).filter((exhibit) => {
    // Increment iteration
    iteration += 1;

    // If there is a max number
    // And the max number is greater than iteration
    // Don't return anything
    if (max && max > iteration) return null;

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
  return (user.name.length > 0
    && user.age.length > 0
    && user.location.lat !== ''
    && user.location.lng !== ''
    && user.interests.length > 0
  );
}
