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
              window.height / 6 : window.height * 3 / 6
          }
        ]}>
          <Selector upperText={'传感器种类'} valList={typeValList}
            defaultValue="所有" name={'historicalTypeSelector'} isCurrent={false}/>
          <Selector upperText={'监测站编号'} valList={stationValList}
            defaultValue="所有" name={'historicalStationSelector'} isCurrent={false}/>
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
    flexDirection: 'row',
    height: window.height / 6,
  },
  arrowIcon: {
    width: 14,
    height: 14,
    alignSelf: 'center',
  },
});

export default connect(mapStateToProps)(HistoricalData);
