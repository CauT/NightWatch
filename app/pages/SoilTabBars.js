'use strict';

import React from 'react-native';
import CurrentData from './CurrentData';
import HistoricalData from './HistoricalData';
const {
  StyleSheet,
  View,
  Component,
} = React;
import {soilItemInfos} from '../../string';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from './components/TabBar';
import GraphGenerator from './GraphGenerator';

class SoilTabBars extends Component {
  static initialState = {
    isRefreshing: false,
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollableTabView initialPage={1} renderTabBar={() => <TabBar />}>
          <HistoricalData tabLabel={soilItemInfos[0]} style={styles.tabView} />
          <CurrentData tabLabel={soilItemInfos[1]} style={styles.tabView}/>
          <GraphGenerator tabLabel={soilItemInfos[2]} style={styles.tabView}/>
        </ScrollableTabView>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  tabView: {
    padding: 10,
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 2,
  },
  pullToRefreshLayout: {
    flex: 1,
  }
});

export default SoilTabBars;
