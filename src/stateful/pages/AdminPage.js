import React, {Component} from 'react';
import {MapContainer, TileLayer} from 'react-leaflet';

import Entity from 'core/Entity.js';
import {
  ENTITY_LABEL_MAP,
  DEFAULT_ENTITY_ID
} from 'constants/EntityConstants.js';
import {LAT_LNG} from 'constants/LatLngConstants.js';

import {getRegionBBox} from 'core/RegionGeo.js';
import {getZoom} from 'base/OSM.js';
import {ENTITY} from 'constants/EntityConstants.js';
import Server from 'core/Server.js';

import DetailedInfoPane from 'stateful/molecules/DetailedInfoPane.js';
import EntityInfoPane from 'stateful/molecules/EntityInfoPane.js';
import Infobox from 'nonstate/molecules/Infobox.js';
import RegionMap from 'stateful/molecules/RegionMap.js';
import LocationButton from 'stateful/molecules/LocationButton.js';

import Loader from 'nonstate/atoms/Loader.js';
import MapLocationMarker from 'stateful/atoms/MapLocationMarker.js';

import './AdminPage.css';

export const DEFAULT_ZOOM = 8;

export default class AdminPage extends Component {
  static getDefaultLatLngAndZoom() {
    return {latLng: LAT_LNG.CENTROID, zoom: DEFAULT_ZOOM};
  }

  constructor(props) {
    super(props);
    this.state = Object.assign(
      AdminPage.getDefaultLatLngAndZoom(),
      {regionID: this.props.match?.params?.regionID || DEFAULT_ENTITY_ID},
    );
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.getUserLocation = this.getUserLocation.bind(this);
    console.log = console.warn = console.error = () => {};
  }

  async componentDidMount() {
    const {zoom, latLng} = await this.getLatLngAndZoom();
    try {
      this.setState({latLng: latLng, zoom: zoom });
    } catch (err) {}
  }

  getRegionID() {
    return this.state.regionID;
  }

  async onChangeLocation([lat, lng]) {
    const {regionID} = this.state;
    const regionType = Entity.getEntityType(regionID);
    try {
      const region = await Server.getRegionInfo([lat, lng]);
      const gndID = region[regionType] ?? region[ENTITY.DISTRICT];
      this.setState({regionID: gndID});
    } catch(err) {}
  }

  async getLatLngAndZoom() {
    const regionID = this.getRegionID()
    try {
      const [[minLat, minLng], [maxLat, maxLng]] =
        await getRegionBBox(regionID);
      const latLng = [(minLat + maxLat) / 2, (minLng + maxLng) / 2];
      const zoom = getZoom(maxLat - minLat);
      return {latLng, zoom};
    } catch {
      return {latLng: LAT_LNG.COLOMBO, zoom: DEFAULT_ZOOM};
    }
  }

  renderInner() {
    const regionID = this.getRegionID()
    const regionType = Entity.getEntityType(regionID);

    return (
      <div key={`div-admin-inner-${regionID}`}>
        <Infobox
          subTitle={ENTITY_LABEL_MAP[regionType]}
          title={regionID}
        >
          <EntityInfoPane entityID={regionID}/>
        </Infobox>
        <DetailedInfoPane entityID={regionID}/>
      </div>
    );
  }

  renderInnerMapLayer() {
    const regionID = this.getRegionID()
    return (
      <RegionMap
        key={`RegionMap-${regionID}`}
        regionID={regionID}
      />
    );
  }

  async getUserLocation() {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      const {zoom} = await this.getLatLngAndZoom();
      
      await this.onChangeLocation([latitude, longitude]);
      this.setState({
        latLng: [latitude, longitude],
        zoom: zoom,
      });

    } catch (error) {
      console.error('Error getting user location:', error);
    }
  }

  render() {
    if (!this?.state?.latLng) {
      return <Loader />;
    }
    const {zoom, latLng} = this.state;
    const [lat, lng] = latLng;

    return (
      <div key={`page-${lat}-${lng}-${zoom}`}>
        <LocationButton onClick={this.getUserLocation} />
        <MapContainer center={[lat, lng]} zoom={zoom}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {this.renderInnerMapLayer()}
          <MapLocationMarker
            onChangeLocation={this.onChangeLocation}
          />
        </MapContainer>
        {this.renderInner()}
      </div>
    )
  }
}
