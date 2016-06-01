'use strict';

import React from 'react-native';
import {
  fetchStationList,
  fetchTypeList,
} from '../actions/read';
import Selector from './components/Selector';
import Dashboard from './HistoricalDashboard';
import {connect} from 'react-redux';
import DateSelectPad from './componentsIOS/HistoricalDateSelectPad';
import * as strings from '../constants/Strings';

const {
  StyleSheet,
  PropTypes,
  Text,
  View,
  Image,
  Dimensions,
  Component,
  TouchableHighlight,
} = React;

var window = Dimensions.get('window');

function mapStateToProps(state) {
  const {tmp} = state;
  return {
    minYear: tmp.minYear,
    soilTypeList: tmp.soilTypeList,
    soilStationList: tmp.soilStationList,
    historicalDate: tmp.historicalDate,
    needExtendHistoricalPad: tmp.needExtendHistoricalPad,
  };
}

class HistoricalData extends Component {

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

    var yearValList = [];
    var minYear = this.props.minYear;
    var maxYear = (new Date()).getFullYear();
    if (minYear !== undefined) {
      for (var i = minYear; i <= maxYear; i++) {
        yearValList.push(i.toString());
      }
    }

    return (
      <View style={{flex:1,}}>
        <View style={[
          styles.selectBar,
          {height: this.props.needExtendHistoricalPad ?
            window.height * 3 / 5 : window.height / 4}
        ]}>
          <View style={styles.normalSelectBar}>
            <Selector upperText={'传感器\n种类'} valList={typeValList}
              defaultValue="所有" varName={'historicalTypeSelector'} />
            <Selector upperText={'监测站\n编号'} valList={stationValList}
              defaultValue="所有" varName={'historicalStationSelector'} />
          </View>
          <DateSelectPad />
        </View>
        <Dashboard />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  selectBar: {
    justifyContent: 'space-around',
  },
  normalSelectBar: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
});

export default connect(mapStateToProps)(HistoricalData);
