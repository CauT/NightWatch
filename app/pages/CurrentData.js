'use strict';

import React from 'react-native';
import {
  fetchStationList,
  fetchTypeList,
  fetchCurrentData,
} from '../actions/Soil';
import Selector from './components/Selector';
import CurrentDashboard from './CurrentDashboard';
import {connect} from 'react-redux';
import * as strings from '../constants/Strings'
import Button from './components/Button';
import {logos} from '../../string';

const {
  StyleSheet,
  PropTypes,
  Text,
  View,
  Dimensions,
  Component,
} = React;

var window = Dimensions.get('window');

function mapStateToProps(state) {
  const {soil} = state;
  return {
    soilTypeList: soil.soilTypeList,
    soilStationList: soil.soilStationList,
  };
}

class CurrentData extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchTypeList());
    dispatch(fetchStationList());
  }

  _onPressSearch() {
    const {dispatch} = this.props;
    dispatch(fetchCurrentData());
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
          <Selector upperText={'传感器\n种类'} valList={typeValList}
            defaultValue="所有" varName={'currentTypeSelector'} />
          <Selector upperText={'监测站\n编号'} valList={stationValList}
            defaultValue="所有" varName={'currentStationSelector'} />
        </View>
        <Button buttonText={'查找'} logoSource={logos.search}
          onPress={this._onPressSearch.bind(this)}/>
        <CurrentDashboard />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  selectBar: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    padding: 8,
  },
});

export default connect(mapStateToProps)(CurrentData);
