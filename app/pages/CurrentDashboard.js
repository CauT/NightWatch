'use strict';

import React from 'react-native';
import {connect} from 'react-redux';
import {fetchCurrentData} from '../actions/read';

const {
  ListView,
} = React;
import Dashboard from './Dashboard';

function mapStateToProps(state) {
  var ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
  });
  const {tmp} = state;
  return {
    loadArgs: [tmp.stationSelector, tmp.typeSelector],
    dataSource: tmp.soilDevicesInfo !== undefined ?
      ds.cloneWithRows(tmp.soilDevicesInfo) : undefined,
  };
}

export default connect(mapStateToProps)(Dashboard);
