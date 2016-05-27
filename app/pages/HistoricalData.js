'use strict';

import React from 'react-native';
import {
  switchDateSelectPad,
  fetchStationList,
  fetchTypeList,
} from '../actions/read';
import Selector from './Selector';
import HistoricalDashboard from './HistoricalDashboard';
import {connect} from 'react-redux';
import {logos} from '../../string';
import DateSelectPad from './iOS/DateSelector';

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
    soilTypeList: tmp.soilTypeList,
    soilStationList: tmp.soilStationList,
    isHistoricalDatePadHidden: tmp.isHistoricalDatePadHidden,
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

  _onPressArrow() {
    console.log('pressed');
    const {dispatch} = this.props;
    dispatch(switchDateSelectPad());
  }

  _renderDatePad() {
    return (this.props.isHistoricalDatePadHidden ? <View /> : <DateSelectPad />);
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
        <View style={[
          styles.selectBar,
          {
            height: this.props.isHistoricalDatePadHidden ?
              window.height / 8 : window.height * 4 / 5 - 10
          }
        ]}>
          <View style={styles.normalSelectBar}>
            <Selector upperText={'传感器\n种类'} valList={typeValList}
              defaultValue="所有" name={'historicalTypeSelector'} isCurrent={false}/>
            <Selector upperText={'监测站\n编号'} valList={stationValList}
              defaultValue="所有" name={'historicalStationSelector'} isCurrent={false}/>
          </View>
          {this._renderDatePad()}
        </View>
        <TouchableHighlight
          onPress={this._onPressArrow.bind(this)}
          activeOpacity={0.3}
          underlayColor={'#ccc'}
        >
          <Image
            style={styles.arrowIcon}
            source={{
              uri: this.props.isHistoricalDatePadHidden ?
                logos.downArrow : logos.upArrow,
              scale: 4.5
            }}
          />
        </TouchableHighlight>
        <HistoricalDashboard />
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
  arrowIcon: {
    width: 14,
    height: 14,
    alignSelf: 'center',
  },
});

export default connect(mapStateToProps)(HistoricalData);
