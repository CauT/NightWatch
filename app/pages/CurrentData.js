'use strict';

var React = require('react-native');

var {
  StyleSheet,
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
    id: PropTypes.string.isRequired,
  },

  render: function() {
    return (
      <View style={styles.monitor}>
        <Text style={styles.monitorName}>{this.props.name}</Text>
        <Text style={styles.monitorId}>{this.props.id}</Text>
        <Text style={styles.monitorValue}>{this.props.value}</Text>
      </View>
    );
  }
});

var CurrentData = React.createClass({
  propTypes: {
    devices_num: PropTypes.number.isRequired,
    devices_name: PropTypes.arrayOf(React.PropTypes.string),
    devices_id: PropTypes.arrayOf(React.PropTypes.string),
    devices_value: PropTypes.arrayOf(React.PropTypes.number),
  },

  render: function() {
    var rows = [];
    // ToDo: add num replacement of different screen size
    var rowNum = this.props.devices_num / 3;

    for (var i = 0; i < rowNum; i++) {
      var row = [];
      for (var j = 0; j < 3; j++) {
        var k = i * 3 + j;
        row.push(
          <MonitorView
            id={this.props.devices_id[k]}
            name={this.props.devices_name[k]}
            value={this.props.devices_value[k]}
          />
        );
      }
      rows.push(
        <View style={styles.row}>
          {row}
        </View>
      );
    }

    return (
      <View>
        {rows}
      </View>
    );
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
    // backgroundColor: 'rgba(0,0,0,0.01)',
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
  monitorValue: {
    fontSize: 30,
    paddingTop: 5,
    paddingLeft: 20,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
});

module.exports = CurrentData;
