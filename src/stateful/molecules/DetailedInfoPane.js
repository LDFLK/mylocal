import React, {Component} from 'react';

import XButton from 'nonstate/atoms/XButton.js';
import CensusInfoGroupList from 'stateful/molecules/CensusInfoGroupList.js';

import './DetailedInfoPane.css';

export default class DetailedInfoPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
    };
    this.onClickShow = this.onClickShow.bind(this);
    this.onClickHide = this.onClickHide.bind(this);
  }

  onClickShow(e) {
    this.setState({showDetails: true});
  }

  onClickHide(e) {
    this.setState({showDetails: false});
  }

  render() {
    const {showDetails} = this.state;
    const {entityID} = this.props;

    if (!showDetails) {
      return (
        <div className="div-detailed-info">
          <div
            className="div-show-details"
            onClick={this.onClickShow.bind(this)}
          >
            Click to see Details about {entityID}
          </div>
        </div>
      )
    }

    const className = showDetails ? 'show' : 'hide';

    return (
      <div className={`div-detailed-info ${className}`}>
        <XButton onClick={this.onClickHide}/>
        <div className="div-summary-outer">
          <CensusInfoGroupList entityID={entityID} />
        </div>
      </div>
    )
  }
}
