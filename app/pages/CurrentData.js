'use strict';

var React = require('react-native');
import RefreshableListview from 'react-native-refreshable-listview';
import {fetchCurrentData} from '../actions/read';
import {connect} from 'react-redux';

var {
  StyleSheet,
  ListView,
  PropTypes,
  Text,
  View,
  ScrollView,
  PullToRefreshViewAndroid,
  WebView,
} = React;

var MonitorView = React.createClass({
  PropTypes: {
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  },

  render: function() {
    return (
      <View style={styles.monitor}>
        <Text style={styles.monitorName}>{this.props.name}</Text>
        <Text style={styles.monitorId}>{this.props.id}</Text>
        <Text style={styles.monitorValue}>{this.props.value}</Text>
        <Text style={styles.monitorUnit}>{this.props.unit}</Text>
      </View>
    );
  }
});

function mapStateToProps(state) {
  var ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
  });
  const {tmp} = state;
  return {
    ...tmp.soilCurrentData,
    currentDataSource: tmp.soilCurrentData !== undefined ?
      ds.cloneWithRows(tmp.soilCurrentData.devicesInfo) : undefined,
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

var CurrentData = React.createClass({

  componentDidMount: function() {
    const {dispatch} = this.props;
    dispatch(fetchCurrentData(undefined, undefined));
  },

  _loadData: function() {
    const {dispatch} = this.props;
    console.log('refreshing');
    dispatch(fetchCurrentData(undefined, undefined));
  },

  _genRow: function(rowInfo) {
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
  },

  _onRefresh: function() {
    console.log('refreshing');
  },

  render: function() {
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
});

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
});

// console.log(connect(mapStateToProps)(CurrentData));
// module.exports = CurrentData;
export default connect(mapStateToProps)(CurrentData);
