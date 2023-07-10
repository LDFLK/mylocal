import WWW from 'base/WWW.js';

export const TEST_GIG_SERVER_DISABLED = false;
export const TEST_GEO_SERVER_DISABLED = false;

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ServerError';
  }
}

function gerServerHost() {
  const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;
  return SERVER_HOST;
}

export default class Server {
  static getURL(cmd, paramsList) {
    const host = gerServerHost();
    return `${host}/${cmd}/${paramsList.join('/')}`
  }

  static async run(cmd, paramsList) {

    const url = Server.getURL(cmd, paramsList);
    const data = await WWW.getJSON(url);
    return data;
  }

  static async getGeo(regionID) {
    const geo = await Server.run(
      'entity/coordinates',
      [`${regionID}`],
    );
    if (!geo) {
      throw new ServerError('Failed to get geo data');
    }
    return geo;
  }

  static async getRegionInfo([lat, lng]) {
    const regions = await Server.run(
      'regions',
      [`${lat},${lng}`],
    );
    if (!regions) {
      throw new ServerError('Failed to get region info');
    }
    return regions;
  }

  static async getEntity(entityID) {
    const entities = await Server.run(
      'entities',
      [entityID],
    );
    if (!entities) {
      throw new ServerError('Failed to get entity data');
    }
    return entities[entityID];
  }

  static async getCensus(tableName, entityID) {
    const census = await Server.run(
      'census',
      [tableName, entityID],
    );
    if (!census) {
      throw new ServerError('Failed to get census data');
    }
    for (let key in census[entityID]) {
      try {
        census[entityID][key] = parseInt(census[entityID][key])
      } catch {
      }
      
    }
    return census;
  }

}
