import React, {Component} from 'react';

import Entity from 'core/Entity.js';
import Server from 'core/Server.js';

import './EntityLink.css';

export default class EntityLink extends Component {
  constructor(props) {
    super(props);
    this.state = {entity: undefined};
  }
  async componentDidMount() {
    try {
      const entity = await Server.getEntity(this.props.entityID);
      this.setState({entity});
    } catch (err) {}
  }

  render() {
    const {entityID, iEntityID} = this.props;
    const entityType = Entity.getEntityType(entityID)

    const {entity} = this.state;

    let label = entityID;
    let className = 'entity-link ';
    if (entity) {
        label = `${entity.name} ${Entity.getEntityLabelShort(entityType)}`;
        className += 'link-name';
    } else {
      className += 'link-id';
    }

    let pageName = 'admin';
    const key = `a-${iEntityID}-${entityID}`;

    return (
      <a
        key={key}
        className={className}
        href={`/mylocal/${pageName}/${entityID}`}
        >
        {label}
      </a>
    )
  }
}
