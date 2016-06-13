'use strict';

import React from 'react-native';
import CurrentData from './CurrentData';
import HistoricalData from './HistoricalData';
const {
  StyleSheet,
  Text,
  View,
  ScrollView,
  PullToRefreshViewAndroid,
  WebView,
  Component,
} = React;
import {soilItemInfos} from '../../string';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from './components/TabBar';
import GraphGenerator from './GraphGenerator';
import GraphDateSelectPad from './componentsIOS/GraphDateSelectPad';
import SignInButton from './components/SignInButton';
import SignIn from './SignIn';

class SoilTabBars extends Component {
  static initialState = {
    isRefreshing: false,
  };

          // <CurrentData tabLabel={soilItemInfos[1]} style={styles.tabView}/>
  render() {
    return (
      <View style={styles.container}>
        <ScrollableTabView initialPage={1} renderTabBar={() => <TabBar />}>
          <HistoricalData tabLabel={soilItemInfos[0]} style={styles.tabView} />
          <View tabLabel={soilItemInfos[1]} style={styles.tabView}>
            <SignIn />
          </View>
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
    // flex: 1,
    padding: 10,
    // backgroundColor: 'rgba(0,0,0,0.01)',
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
  },
  pullToRefreshLayout: {
    flex: 1,
  }
});

export default SoilTabBars;
