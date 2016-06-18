'use strict';

import React from 'react-native';
import RefreshableListview from 'react-native-refreshable-listview';
import MonitorView from './MonitorView';

const {
  StyleSheet,
  PropTypes,
  Text,
  View,
  PixelRatio,
  Component,
  Dimensions,
  Platform,
} = React;

var window = Dimensions.get('window');

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
    this.props._loadData(dispatch);
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

  _getMajor() {

    if (this.props.dataSource === undefined) {
      return (
        <View />
      );
    } else {
      return (
        <RefreshableListview
          dataSource={this.props.dataSource}
          renderRow={this._genRow}
          loadData={this.props._loadData.bind(this)}
        />
      );
    }
  }

  render() {
    return (
      <View style={{flex:1}}>
        <View style={styles.greenLine}/>
        {this._getMajor()}
        {() => {
          return Platform.OS === 'ios' ?
          <View style={styles.blank} /> : <View />;}
        }
      </View>
    );
  }
}

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  greenLine: {
    backgroundColor: '#01a971',
    margin: 3,
    height: 4 / PixelRatio.get(),
    shadowColor: '#ccc',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    elevation: 1,
  },
  blank: {
    height: window.height / 12,
  }
});

export default Dashboard;
