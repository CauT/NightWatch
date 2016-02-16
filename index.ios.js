/*
    "Night gathers, and now my watch begins.
    It shall not end until my death.
    I shall take no wife, hold no lands, father no children.
    I shall wear no crowns and win no glory.
    I shall live and die at my post.
    I am the sword in the darkness.
    I am the watcher on the walls.
    I am the shield that guards the realms of men.
    I pledge my life and honor to the Night's Watch, for this night and all the nights to come."
    ― The Night's Watch oath

    长夜将至，我从今开始守望，至死方休。
    我将不娶妻、不封地、不生子。
    我将不戴宝冠，不争荣宠。
    我将尽忠职守，生死于斯。
    我是黑暗中的利剑，长城上的守卫，
    抵御寒冷的烈焰，破晓时分的光线，
    唤醒眠者的号角，守护王国的坚盾。
    我将生命与荣耀献给守夜人，
    今夜如此，夜夜皆然。
    - 守夜人誓言
*/

'use strict';

var React = require('react-native');
var {
    StyleSheet,
    TabBarIOS,
    Text,
    View,
    AppRegistry,
} = React;

var SoilTabBars = require('./SoilTabBars');
var {
    iosMajorItemInfos: majorItemInfos
} = require('./string.json');

var NightWatch = React.createClass({

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
            <SoilTabBars />
        );
    },

    render: function() {
        return (
            <TabBarIOS>
                <TabBarIOS.Item
                    title={majorItemInfos[0].name}
                    icon={{uri: majorItemInfos[0].base64, scale: 4.5}}
                    selected={this.state.selectedTab === 'soilTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'soilTab',
                        });
                }}>
                    <SoilTabBars />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title={majorItemInfos[1].name}
                    icon={{uri: majorItemInfos[1].base64, scale: 4.5}}
                    selected={this.state.selectedTab === 'weatherTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'weatherTab',
                        });
                    }}>
                    <SoilTabBars />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title={majorItemInfos[2].name}
                    icon={{uri: majorItemInfos[2].base64, scale: 4.5}}
                    selected={this.state.selectedTab === 'videoTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'videoTab',
                            presses: this.state.presses + 1
                        });
                    }}>
                    {this._renderContent('#21551C', 'Green Tab', this.state.presses)}
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title={majorItemInfos[3].name}
                    icon={{uri: majorItemInfos[3].base64, scale: 4.5}}
                    selected={this.state.selectedTab === 'diseaseTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'diseaseTab',
                            presses: this.state.presses + 1
                        });
                    }}>
                    {this._renderContent('#21551C', 'Green Tab', this.state.presses)}
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title={majorItemInfos[4].name}
                    icon={{uri: majorItemInfos[4].base64, scale: 4.5}}
                    selected={this.state.selectedTab === 'settingTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'settingTab',
                            presses: this.state.presses + 1
                        });
                    }}>
                    {this._renderContent('#21551C', 'Green Tab', this.state.presses)}
                </TabBarIOS.Item>
            </TabBarIOS>
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

AppRegistry.registerComponent('NightWatch', () => NightWatch);
