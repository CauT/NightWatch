'use strict';

var React = require('react-native');
var {
    StyleSheet,
    TabBarIOS,
    Text,
    View,
    AppRegistry,
} = React;

var NWTabBars = require('./NWTabBars');
var {majorItemInfos} = require('./string.json');
var WebViewExample = require('./WebViewExample').examples;

var TabBarExample = React.createClass({
    statics: {
        title: '<TabBarIOS>',
        description: 'Tab-based navigation.',
    },

    displayName: 'TabBarExample',

    getInitialState: function() {
        return {
            selectedTab: 'soilTab',
            notifCount: 0,
            presses: 0,
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
            <NWTabBars />
        );
    },

    render: function() {
        // return (
        //     <TabBarIOS>
        //         <TabBarIOS.Item
        //             title={majorItemInfos[0].name}
        //             icon={{uri: majorItemInfos[0].base64, scale: 4.5}}
        //             selected={this.state.selectedTab === 'soilTab'}
        //             onPress={() => {
        //                 this.setState({
        //                     selectedTab: 'soilTab',
        //                 });
        //         }}>
        //             <NWTabBars />
        //         </TabBarIOS.Item>
        //         <TabBarIOS.Item
        //             title={majorItemInfos[1].name}
        //             icon={{uri: majorItemInfos[1].base64, scale: 4.5}}
        //             selected={this.state.selectedTab === 'weatherTab'}
        //             onPress={() => {
        //                 this.setState({
        //                     selectedTab: 'weatherTab',
        //                 });
        //             }}>
        //             <NWTabBars />
        //         </TabBarIOS.Item>
        //         <TabBarIOS.Item
        //             title={majorItemInfos[2].name}
        //             icon={{uri: majorItemInfos[2].base64, scale: 4.5}}
        //             selected={this.state.selectedTab === 'videoTab'}
        //             onPress={() => {
        //                 this.setState({
        //                     selectedTab: 'videoTab',
        //                     presses: this.state.presses + 1
        //                 });
        //             }}>
        //             {this._renderContent('#21551C', 'Green Tab', this.state.presses)}
        //         </TabBarIOS.Item>
        //         <TabBarIOS.Item
        //             title={majorItemInfos[3].name}
        //             icon={{uri: majorItemInfos[3].base64, scale: 4.5}}
        //             selected={this.state.selectedTab === 'diseaseTab'}
        //             onPress={() => {
        //                 this.setState({
        //                     selectedTab: 'diseaseTab',
        //                     presses: this.state.presses + 1
        //                 });
        //             }}>
        //             {this._renderContent('#21551C', 'Green Tab', this.state.presses)}
        //         </TabBarIOS.Item>
        //         <TabBarIOS.Item
        //             title={majorItemInfos[4].name}
        //             icon={{uri: majorItemInfos[4].base64, scale: 4.5}}
        //             selected={this.state.selectedTab === 'settingTab'}
        //             onPress={() => {
        //                 this.setState({
        //                     selectedTab: 'settingTab',
        //                     presses: this.state.presses + 1
        //                 });
        //             }}>
        //             {this._renderContent('#21551C', 'Green Tab', this.state.presses)}
        //         </TabBarIOS.Item>
        //     </TabBarIOS>
        // );
        return (
            <WebViewExample />
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
