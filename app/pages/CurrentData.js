'use strict';

import React from 'react-native';
import RefreshableListview from 'react-native-refreshable-listview';
import {
  setSelectorState,
  fetchCurrentData,
  fetchStationList,
  fetchTypeList,
} from '../actions/read';
import Selector from './Selector';
import {connect} from 'react-redux';

import {
  Select,
  Option,
  OptionList,
} from 'react-native-selectme';

const {
  StyleSheet,
  ListView,
  PropTypes,
  Text,
  View,
  ScrollView,
  PullToRefreshViewAndroid,
  WebView,
  Component,
  Dimensions,
} = React;

const window = Dimensions.get('window');

class MonitorView extends Component {
  static PropTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }

  render() {
    return (
      <View style={styles.monitor}>
        <Text style={styles.monitorName}>{this.props.name}</Text>
        <Text style={styles.monitorId}>{this.props.id}</Text>
        <Text style={styles.monitorValue}>{this.props.value}</Text>
        <Text style={styles.monitorUnit}>{this.props.unit}</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  var ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
  });
  const {tmp} = state;
  return {
    ...tmp,
    currentDataSource: tmp.soilDevicesInfo !== undefined ?
      ds.cloneWithRows(tmp.soilDevicesInfo) : undefined,
  };
}

function formatNumber(num) {
  var res;
  if (num === undefined) {
    return undefined;
  } else if (num === 0) {
    return '0.000';
  } else if (num > 9999) {
    res = num.toPrecision(3);
  } else {
    res = num.toString().substring(0, 5);
  }

  return res;
}

class CurrentData extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchTypeList());
    dispatch(fetchStationList());
    dispatch(fetchCurrentData(undefined, undefined));
  }

  _loadData() {
    const {dispatch} = this.props;
    console.log('refreshing');

    // dispatch(fetchTypeList());
    // dispatch(fetchStationList());
    dispatch(fetchCurrentData(undefined, undefined));
  }

  _genRow(rowInfo) {
    var row = [];
    for (var i = 0; i < 3; i++) {
      if (rowInfo[i] === undefined) {
        break;
      }
      row.push(
        <MonitorView
          key={rowInfo[i].DEVICECODE}
          id={rowInfo[i].DEVICECODE}
          unit={rowInfo[i].UNIT}
          name={rowInfo[i].DEVICENAME}
          value={formatNumber(rowInfo[i].VALUE)}
        />
      );
    }
    return (
      <View style={styles.row}>
        {row}
      </View>
    );
  }

  _getMajor() {
    if (this.props.currentDataSource === undefined) {
      return (
        <View />
      );
    } else {
      return (
        <RefreshableListview
          dataSource={this.props.currentDataSource}
          renderRow={this._genRow}
          loadData={this._loadData}
        />
      );
    }
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

        {this._getMajor()}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  webView: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: 30,
  },
  tabView: {
    flex: 1,
    padding: 10,
  },
  monitor: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 100,
    width: 95,
    padding: 5,
    shadowColor: '#ccc',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    flex: 1,
  },
  pullToRefreshLayout: {
    flex: 1,
  },
  monitorName: {
    padding: 5,
    fontSize: 15,
    color: '#01A971',
  },
  monitorId: {
    padding: 2,
    paddingLeft: 5,
    fontSize: 10,
    color: '#01A971',
  },
  monitorNumber: {
    flex: 1,
  },
  monitorValue: {
    fontSize: 20,
    paddingRight: 5,
    alignSelf: 'flex-end',
  },
  monitorUnit: {
    fontSize: 12,
    padding: 5,
    alignSelf: 'flex-end'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  selectBar: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    height: 100,
  },
  selector: {
    justifyContent: 'center',
  },
});

export default connect(mapStateToProps)(CurrentData);
