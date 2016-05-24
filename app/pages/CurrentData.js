'use strict';

import React from 'react-native';
import RefreshableListview from 'react-native-refreshable-listview';
import {
  fetchCurrentData,
  fetchStationList,
  fetchTypeList,
} from '../actions/read';
import Selector from './Selector';
import Dashboard from './Dashboard';
import {connect} from 'react-redux';

const {
  StyleSheet,
  PropTypes,
  Text,
  View,
  Component,
} = React;

function mapStateToProps(state) {
  const {tmp} = state;
  return {
    soilTypeList: tmp.soilTypeList,
    soilStationList: tmp.soilStationList,
  };
}

class CurrentData extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchTypeList());
    dispatch(fetchStationList());
  }

  render() {
    var typeValList = [];
    var stl = this.props.soilTypeList;
    if (stl !== undefined) {
      stl.forEach(function(type) {
        typeValList.push(type.DEVICENAME);
      });
    }

    var stationValList = [];
    var ssl = this.props.soilStationList;
    if (ssl !== undefined) {
      ssl.forEach(function(station) {
        stationValList.push(station.NAME);
      });
    }

    return (
      <View style={{flex:1,}}>
        <View style={styles.selectBar}>
          <Selector upperText={'传感器种类'} valList={typeValList}
            defaultValue="所有" name={'typeSelector'}/>
          <Selector upperText={'监测站编号'} valList={stationValList}
            defaultValue="所有" name={'stationSelector'}/>
        </View>
        <Dashboard />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  selectBar: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    height: 120,
  },
});

export default connect(mapStateToProps)(CurrentData);
