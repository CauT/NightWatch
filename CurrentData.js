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
  },

  render: function() {
    return (
      <View style={styles.monitor}>
        <Text style={styles.monitorName}>{this.props.name}</Text>
        <Text style={styles.monitorValue}>{this.props.value}</Text>
      </View>
    );
  }
});

var CurrentData = React.createClass({
  propTypes: {
    devices_num: PropTypes.number.isRequired,
    devices_name: PropTypes.arrayOf(React.PropTypes.string),
    devices_value: PropTypes.arrayOf(React.PropTypes.number),
  },

  render: function() {
    var monitorViews = [];
    var rowNum = this.props.devices_num / 3;

    for (var i = 0; i < rowNum; i++) {
      monitorViews.push(
        <MonitorView
          name={this.props.devices_name[i]}
          value={this.props.devices_value[i]}
        />
      );
    }

    return (
      <View>
        {monitorViews}
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
    height: 75,
    width: 90,
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
  monitorValue: {
    fontSize: 30,
    marginLeft: 15,
  },
});

module.exports = MonitorView;
