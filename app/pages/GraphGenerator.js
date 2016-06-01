'use strict';

import React from 'react-native';
import {
  fetchStationList,
  fetchTypeList,
} from '../actions/read';
import Selector from './components/Selector';
import {connect} from 'react-redux';
import DateSelectPad from './componentsIOS/GraphDateSelectPad';
import * as strings from '../constants/Strings';

const {
  StyleSheet,
  PropTypes,
  Text,
  View,
  Image,
  WebView,
  Dimensions,
  Component,
  TouchableHighlight,
} = React;

var window = Dimensions.get('window');
var WEBVIEW_REF = 'webview';

function mapStateToProps(state) {
  const {tmp} = state;
  return {
    graphUrl: tmp.graphUrl,
    soilTypeList: tmp.soilTypeList,
    soilStationList: tmp.soilStationList,
    historicalDate: tmp.historicalDate,
    needExtendHistoricalPad: tmp.needExtendHistoricalPad,
  };
}

class GenerateGraph extends Component {
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
      <View style={{flex: 1,}}>
        <View style={styles.selectBar}>
          <Selector upperText={'传感器\n种类'} valList={typeValList}
            defaultValue="所有" varName={'graphTypeSelector'} />
          <Selector upperText={'监测站\n编号'} valList={stationValList}
            defaultValue="所有" varName={'graphStationSelector'} />
        </View>
        <DateSelectPad />
        <WebView
          ref={WEBVIEW_REF}
          automaticallyAdjustContentInsets={false}
          style={styles.webView}
          url={this.props.graphUrl}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  selectBar: {
    padding: 6,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
   webView: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    height: 350,
  },
});

export default connect(mapStateToProps)(GenerateGraph);
