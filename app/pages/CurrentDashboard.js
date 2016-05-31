'use strict';

import React from 'react-native';
import {connect} from 'react-redux';
import {fetchCurrentData} from '../actions/read';

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
      // const {dispatch} = this.props;
      dispatch(fetchCurrentData(tmp.currentStationSelector,
        tmp.currentTypeSelector));
    },
    dataSource: tmp.soilCurrentDevicesInfo !== undefined ?
      ds.cloneWithRows(tmp.soilCurrentDevicesInfo) : undefined,
  };
}

export default connect(mapStateToProps)(Dashboard);
