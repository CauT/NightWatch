/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Dimensions,
    DrawerLayoutAndroid,
    Text,
    View,
    ListView,
} = React;

var DRAWER_WIDTH_LEFT = 280;
var majorFuncNames = ['土壤墒情', '气象信息', '生长过程监测', '可信溯源', '病虫害监测']
var appName = '农业监测终端';

var NightWatch = React.createClass({
    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        /* testing sticky
        for (var i=0; i<20; i++) {
            majorFuncNames.push('Hello World!')
        }
        */
        return {
            dataSource: ds.cloneWithRows(majorFuncNames),
        };
    },
    render: function() {
        return (
                   <DrawerLayoutAndroid
                   drawerPosition={DrawerLayoutAndroid.positions.Left}
                   drawerWidth={Dimensions.get('window').width - DRAWER_WIDTH_LEFT}
                   keyboardDismissMode="on-drag"
                   ref={(drawer) => { this.drawer = drawer; }}
                   renderNavigationView={this._renderNavigationView}
                   style={styles.sideBar}
                   >
                   </DrawerLayoutAndroid>
               );
    },

    _renderNavigationView: function() {
        return (
                <ListView
                style={styles.sideBar}
                dataSource={this.state.dataSource}
                renderSectionHeader={this._renderSectionHeader}
                renderRow={
                    (rowData) => <Text style={styles.majorFunc}>
                        {rowData}
                    </Text>
                }
                />
               );
    },

    _renderSectionHeader: function() {
        return (
                <Text style={styles.sideBarTitle}>{appName}</Text>
                );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    majorFunc: {
        fontSize: 20,
        marginBottom: 10,
        color: '#000000',
    },
    sideBar: {
        backgroundColor: '#F5FCFF',
    },
    sideBarTitle: {
        fontSize: 30,
        marginBottom: 10,
        color: '#000000',
    }
});

AppRegistry.registerComponent('NightWatch', () => NightWatch);
