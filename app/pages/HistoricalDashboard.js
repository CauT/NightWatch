'use strict';

import React from 'react-native';
import {connect} from 'react-redux';
import {fetchHistoricalData} from '../actions/read';

const {
  ListView,
} = React;
import Dashboard from './Components/Dashboard';

function mapStateToProps(state) {
  var ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
  });
  const {tmp} = state;
  return {
    _loadData: function(dispatch) {
      dispatch(fetchHistoricalData(tmp.historicalStationSelector,
        tmp.historicalTypeSelector, 1443760000));
    },
    dataSource: tmp.soilHistoricalDevicesInfo !== undefined ?
      ds.cloneWithRows(tmp.soilHistoricalDevicesInfo) : undefined,
  };
}

export default connect(mapStateToProps)(Dashboard);
