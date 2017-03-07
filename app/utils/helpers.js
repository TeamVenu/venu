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
