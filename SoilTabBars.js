'use strict';

var React = require('react-native');
var RisingNumber = require('./RisingNumber');
var {
    StyleSheet,
    Text,
    View,
    ScrollView,
    PullToRefreshViewAndroid,
    WebView,
} = React;
var {soilItemInfos} = require('./string.json');
var ScrollableTabView = require('react-native-scrollable-tab-view');
var TabBar = require('./TabBar');

var SoilTabBars = React.createClass({
    getInitialState: function() {
        return {
            isRefreshing: false,
        };
    },

    render() {
        // var DEFAULT_URL = 'http://localhost:3000/v1/utils/generate_graph?start_time=1443700260&end_time=1443800000&device_id=172&platform=Android&width=300&height=200';
        var DEFAULT_URL = 'http://172.17.240.113:3000/v1/utils/generate_graph?start_time=1443700260&end_time=1443800000&device_id=172&platform=iOS&width=300&height=200';
        // var DEFAULT_URL = 'http://localhost:3000/v1/device/info/type_list';
        // var DEFAULT_URL = 'http://www.sharejs.com/code/game/pintu/index.html';
        // var DEFAULT_URL = 'http://res.xiaomaiketang.com/school_major/6237c5011312585aadf43c5e4ef2611e.html';
        fetch(DEFAULT_URL)
        .then((response) => response.text())
        .then((responseText) => {
          console.log(responseText);
        })
        .catch((error) => {
          console.warn(error);
        });
        return (
            <View style={styles.container}>
                <ScrollableTabView initialPage={1} renderTabBar={() => <TabBar />}>
                    <ScrollView tabLabel={soilItemInfos[0]} style={styles.tabView}>
                            <Text>Friends</Text>
                    </ScrollView>
                    <View tabLabel={soilItemInfos[1]} style={styles.tabView}>
                  <WebView style={styles.webView}
                    source={{uri: DEFAULT_URL}}
                    startInLoadingState={true}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                    />
                    </View>
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
        flex: 1,
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
