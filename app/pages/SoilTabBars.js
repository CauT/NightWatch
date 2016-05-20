'use strict';

var React = require('react-native');
import CurrentData from './CurrentData';
var {
  StyleSheet,
  Text,
  View,
  ScrollView,
  PullToRefreshViewAndroid,
  WebView,
} = React;
var {soilItemInfos} = require('../../string.json');
var ScrollableTabView = require('react-native-scrollable-tab-view');
var TabBar = require('./TabBar');

var SoilTabBars = React.createClass({
  getInitialState: function() {
    return {
      isRefreshing: false,
    };
  },

  render: function() {
    return (
      <View style={styles.container}>
        <ScrollableTabView initialPage={1} renderTabBar={() => <TabBar />}>
          <ScrollView tabLabel={soilItemInfos[0]} style={styles.tabView}>
            <Text>Friends</Text>
          </ScrollView>
          <ScrollView tabLabel={soilItemInfos[1]} style={styles.tabView}>
            <CurrentData />
          </ScrollView>
          <ScrollView tabLabel={soilItemInfos[2]} style={styles.tabView}>
            <View style={styles.card}>
              <Text>Messenger</Text>
            </View>
          </ScrollView>
        </ScrollableTabView>
      </View>
    );
  },

  _onRefresh: function() {
    console.log('refreshing');
    this.setState({isRefreshing: true});
    setTimeout(() => {
      console.log('refreshing');

      this.setState({
        isRefreshing: false,
      });
    }, 5000);
  },
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

module.exports = SoilTabBars;
