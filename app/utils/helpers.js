/* Helper Methods */
/**
 * getFacilitiesArray
 * Returns an array of all facilities based on facilities object
 * @param  {Object} facilities
 * @return {Array}
 */
export function getFacilitiesArray(facilities) {
  return facilities.food.concat(facilities.information, facilities.medical, facilities.restrooms);
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
