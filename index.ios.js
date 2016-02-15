'use strict';

var React = require('react-native');
var {
    StyleSheet,
    TabBarIOS,
    Text,
    View,
    AppRegistry,
    ListView,
} = React;

var RefreshableListview = require('react-native-refreshable-listview');
var FacebookTabsExample = require('./FacebookTabsExample');
var {majorItemInfos} = require('./string.json');

var majorItemInfos = [
    {
        name: '土壤墒情',
        icon: require('image!icon_sapling'),
        position: 0,
    },
    {
        name: '气象信息',
        icon: require('image!icon_weather'),
        position: 1,
    },
    {
        name: '视频监控',
        icon: require('image!icon_chart'),
        position: 2,
    },
    {
        name: '可信溯源',
        icon: require('image!icon_certificate'),
        position: 3,
    },
    {
        name: '病虫害监测',
        icon: require('image!icon_microscope'),
        position: 4,
    },
];

var TabBarExample = React.createClass({
    statics: {
        title: '<TabBarIOS>',
        description: 'Tab-based navigation.',
    },

    displayName: 'TabBarExample',

    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            majorDataSource: ds.cloneWithRows(majorItemInfos),
        };
    },

    _renderContent: function(color: string, pageText: string, num?: number) {
        return (
            <View style={[styles.tabContent, {backgroundColor: color}]}>
            <Text style={styles.tabText}>{pageText}</Text>
            <Text style={styles.tabText}>{num} re-renders of the {pageText}</Text>
            </View>
        );
    },

    _renderMajor: function() {
        return (
            <FacebookTabsExample />
        );
    },

    _renderRow: function(obj) {
        return (
            <Text>{obj.name}</Text>
        );
    },

    _loadData: function() {
        console.log('load data');
    },

    render: function() {
        return (
            <RefreshableListview
                dataSource={this.state.majorDataSource}
                renderRow={this._renderRow}
                loadData={this._loadData}
                refreshDescription="NightWatch"
            />
        );
    },

});

var styles = StyleSheet.create({
    logo: {
        width: 10,
        height: 10,
    },
    tabContent: {
        flex: 1,
        alignItems: 'center',
    },
    tabText: {
        color: 'white',
        margin: 50,
    },
});

AppRegistry.registerComponent('NightWatch', () => TabBarExample);
