import GeoServer from 'model/GeoServer.js';
import GIGServer from 'model/GIGServer.js';
import AbstractInfoTable from './AbstractInfoTable.js';
import EntityLink from 'view/components/EntityLink.js';

export default class ElectionInfoTable extends AbstractInfoTable {
  getTitle() {
    return 'Election';
  }
  async getDataList() {
    const {latLng} = this.props;

    const {
      gnd: gndID,
    } = await GeoServer.getRegionInfo(latLng);

    const gndData = await GIGServer.getEntity(gndID);
    const pdID = gndData['pd_id'];
    const edID = pdID.substring(0, 5);

    return [
      {
        label: 'Electoral District',
        content: <EntityLink entityID={edID} />,
      },
      {
        label: 'Polling Division',
        content: <EntityLink entityID={pdID} />,
    },
    ];
  }
}
