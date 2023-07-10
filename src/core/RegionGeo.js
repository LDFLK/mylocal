import Server from './Server.js';
import {getBoundsForGeoData} from 'base/LatLng.js';

export async function getRegionBBox(regionID) {
  const geo = await Server.getGeo(regionID);
  const [[minLat, minLng], [maxLat, maxLng]] = getBoundsForGeoData(geo);
  return [[minLat, minLng], [maxLat, maxLng]];
}
