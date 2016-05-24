'use strict';

import React from 'react-native';
import RefreshableListview from 'react-native-refreshable-listview';
import {
  fetchCurrentData,
  fetchStationList,
  fetchTypeList,
} from '../actions/read';
import MonitorView from './MonitorView';
import {connect} from 'react-redux';

const {
  StyleSheet,
  ListView,
  PropTypes,
  Text,
  View,
  PixelRatio,
  Component,
  Dimensions,
} = React;

var window = Dimensions.get('window');

function mapStateToProps(state) {
  var ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
  });
  const {tmp} = state;
  return {
    typeSelector: tmp.typeSelector,
    stationSelector: tmp.stationSelector,
    currentDataSource: tmp.soilDevicesInfo !== undefined ?
      ds.cloneWithRows(tmp.soilDevicesInfo) : undefined,
  };
}

function _formatNumber(num) {
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

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
  }

  componentDidMount() {
    const {dispatch} = this.props;
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
          value={_formatNumber(rowInfo[i].VALUE)}
        />
      );
    }
    return (
      <View style={styles.row}>
        {row}
      </View>
    );
  }

  _loadData() {
    const {dispatch} = this.props;
    dispatch(fetchCurrentData(this.props.stationSelector,
      this.props.typeSelector));
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
          loadData={this._loadData.bind(this)}
        />
      );
    }
  }

  render() {
    return (
      <View style={{flex:1}}>
        <View style={styles.greyLine}/>
        {this._getMajor()}
        <View style={styles.blank} />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  greyLine: {
    backgroundColor: '#000000',
    margin: 3,
    height: 2 / PixelRatio.get(),
    shadowColor: '#ccc',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
  },
  blank: {
    height: window.height / 12,
  }
});

export default connect(mapStateToProps)(Dashboard);
