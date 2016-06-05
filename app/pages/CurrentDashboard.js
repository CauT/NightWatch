'use strict';

import React from 'react-native';
import {connect} from 'react-redux';
import {fetchCurrentData} from '../actions/soil';

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
      // const {dispatch} = this.props;
      dispatch(fetchCurrentData(soil.currentStationSelector,
        soil.currentTypeSelector));
    },
    dataSource: soil.soilCurrentDevicesInfo !== undefined ?
      ds.cloneWithRows(soil.soilCurrentDevicesInfo) : undefined,
  };
}

export default connect(mapStateToProps)(Dashboard);
