var polyline = require('polyline');

// Function to decode a polyline string into an array of coordinates
function decodePolyline(polylineString) {
  return polyline.decode(polylineString);
}

// Function to encode an array of coordinates into a polyline string
function encodePolyline(coordinates) {
  return polyline.encode(coordinates);
}

// Function to convert GeoJSON LineString to a string-encoded polyline
function fromGeoJSONLineString(geoJSON) {
  if (geoJSON.type === 'Feature' && geoJSON.geometry.type === 'LineString') {
    return polyline.encode(geoJSON.geometry.coordinates);
  } else {
    return null;
  }
}

module.exports = { decodePolyline, encodePolyline, fromGeoJSONLineString };
