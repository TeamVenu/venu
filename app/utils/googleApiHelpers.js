export function getPlaceDetails(google, map, placeId) {
  return new Promise((resolve, reject) => {
    const service = new google.maps.places.PlaceService(map);
    const request = { placeId };

    service.getDetails(request, (place, status) => { //eslint-disable-line
      if (status !== google.maps.places.PlaceServiceStatus.OK) {
        return reject(status);
      } else { //eslint-disable-line
        resolve(place);
      }
    });
  });
}
