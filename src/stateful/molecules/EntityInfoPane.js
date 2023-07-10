import React, {Component} from 'react';
import Server from 'core/Server.js';

import Loader from 'nonstate/atoms/Loader.js';
import InfoTable from 'nonstate/molecules/InfoTable.js';
import {
  getBaseInfo,
  getParentEntityInfo,
  getCustomInfo,
  getRelatedEntityInfo,
} from 'stateful/molecules/EntityInfo.js';

import './EntityInfoPane.css';

export default class EntityInfoPane extends Component {
  async componentDidMount() {
    const {entityID} = this.props;
    try {
      const entityData = await Server.getEntity(entityID);
      this.setState({
        baseInfo: getBaseInfo(entityData),
        parentEntityInfo: getParentEntityInfo(entityData),
        customInfo: getCustomInfo(entityData),
        relatedEntityInfo: getRelatedEntityInfo(entityData),
      });
    } catch(err) {}
  }


  render() {
    if (!this.state) {
      return <Loader />;
    }

    const {
      baseInfo,
      parentEntityInfo,
      customInfo,
      relatedEntityInfo,
    } = this.state;


    return (
      <div className="div-entity-info-pane">
        <InfoTable title="Basic Info" dataMap={baseInfo} />
        <InfoTable title="Parent Regions" dataMap={parentEntityInfo} />
        <InfoTable title="Alternative Region Codes" dataMap={customInfo} />
        <InfoTable title="Related Regions" dataMap={relatedEntityInfo} />
      </div>
    )
  }
}
