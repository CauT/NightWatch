'use strict';

import React from 'react-native';

const {
  StyleSheet,
  PropTypes,
  Text,
  View,
  Component,
} = React;

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

var styles = StyleSheet.create({
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
});

export default MonitorView;
