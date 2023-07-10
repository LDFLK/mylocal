import React, {Component} from 'react';
import {arrayFlatten} from 'base/DataStructures.js';
import Server from 'core/Server.js';
import {Polyline} from 'react-leaflet';

import './RegionMap.css';

export default class RegionMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geoDataForRegion: undefined,
    };
  }

  async componentDidMount() {
    const {regionID} = this.props;
    try {
      this.setState({
        geo: await Server.getGeo(regionID),
      })
    } catch (err) {}
  }

  render() {
    const {geo} = this.state;
    if (!geo) {
      return null;
    }

    let multiPolygon;
    if (geo.type === 'Polygon') {
      multiPolygon = geo.coordinates;
    } else {
      multiPolygon = arrayFlatten(geo.coordinates);
    }

    multiPolygon = multiPolygon.map(
      (polygon) => polygon.map(
        ([lng, lat]) => [lat, lng],
      )
    );

    return (
      <Polyline
        className="polyline-region-map"
        positions={multiPolygon}
      />
    )
  }
}
