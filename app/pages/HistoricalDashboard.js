'use strict';

import React from 'react-native';
import {connect} from 'react-redux';
import {fetchHistoricalData} from '../actions/soil';

const {
  ListView,
} = React;
import Dashboard from './components/Dashboard';

function mapStateToProps(state) {
  var ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
  });
  const {soil} = state;
  return {
    _loadData: function(dispatch) {
      dispatch(fetchHistoricalData(soil.historicalStationSelector,
        soil.historicalTypeSelector, 1443760000));
    },
    dataSource: soil.soilHistoricalDevicesInfo !== undefined ?
      ds.cloneWithRows(soil.soilHistoricalDevicesInfo) : undefined,
  };
}

export default connect(mapStateToProps)(Dashboard);
