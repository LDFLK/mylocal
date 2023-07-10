import {Component} from 'react';

import Server from 'core/Server.js';
import {CENSUS_TABLE_SPAN_INFO} from 'constants/CensusConstants.js';
import {getCensusLabel} from 'core/Census.js';
import CensusDescription from 'nonstate/atoms/CensusDescription.js';
import Loader from 'nonstate/atoms/Loader.js';
import Reference from 'nonstate/atoms/Reference.js';
import PieChart from 'nonstate/molecules/PieChart.js';
import Pyramid from 'nonstate/molecules/Pyramid.js';

import './CensusInfo.css';


export default class CensusInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {dataMap: undefined};
  }

  async componentDidMount() {
    const {tableName, entityID} = this.props;
    try {
      const dataMap = await Server.getCensus(tableName, entityID);
      this.setState({dataMap});
    } catch (err) {}
  }

  render() {
    if (!this.state?.dataMap) {
      return <Loader />;
    }
    return this.renderWithData();
  }

  renderWithData() {
    const {tableName, iTable} = this.props;
    const {dataMap} = this.state;

    let ChartComponent;
    if (CENSUS_TABLE_SPAN_INFO[tableName]) {
        ChartComponent = Pyramid;
    } else {
        ChartComponent = PieChart;
    }

    const valueIsPercent =
      (tableName === 'communication_items_owned_by_household');

    return (
      <div
        key={`div-census-info-${iTable}-${tableName}`}
        className="div-census-info"
      >
        <h4 className="h4-census-label">{getCensusLabel(tableName)}</h4>
        <Reference
          title="Data Source"
          label="Department of Census and Statistics, Sri Lanka"
          link="http://www.statistics.gov.lk/"
        />
        {valueIsPercent ? null : <CensusDescription dataMap={dataMap} />}
        <div className="div-census-chart-component">
          <ChartComponent
            dataMap={dataMap}
            tableName={tableName}
            ageKeys={CENSUS_TABLE_SPAN_INFO[tableName]}
            valueIsPercent={valueIsPercent}
          />
        </div>
      </div>
    );
  }
}
