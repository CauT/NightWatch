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

    『长夜将至，我从今开始守望，至死方休。
    我将不娶妻、不封地、不生子。
    我将不戴宝冠，不争荣宠。
    我将尽忠职守，生死于斯。
    我是黑暗中的利剑，长城上的守卫，
    抵御寒冷的烈焰，破晓时分的光线，
    唤醒眠者的号角，守护王国的坚盾。
    我将生命与荣耀献给守夜人，
    今夜如此，夜夜皆然。』
    - 守夜人誓言
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
    Image,
    PixelRatio,
    TouchableHighlight,
    ToastAndroid,
} = React;
var SoilTabBars = require('./SoilTabBars');
var {
    androidMajorItemInfos: majorItemInfos,
    settingItemInfos,
} = require('./string.json');

var DRAWER_WIDTH_LEFT = 42;
var appName = '农业监测终端';

var NightWatch = React.createClass({
    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            majorDataSource: ds.cloneWithRows(majorItemInfos),
            settingDataSource: ds.cloneWithRows(settingItemInfos),
            homePageText: 'Hello World',
        };
    },

    render: function() {
        return (
            <DrawerLayoutAndroid
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                drawerWidth={Dimensions.get('window').width
                    - DRAWER_WIDTH_LEFT * PixelRatio.get()}
                keyboardDismissMode="on-drag"
                renderNavigationView = {this._renderNavigationView}
                ref={(drawer) => { this.drawer = drawer; }}
                style={styles.sideBar}
            >
                <SoilTabBars />
            </DrawerLayoutAndroid>
        );
    },

    _renderNavigationView: function() {
        return (
            <View style={styles.sideBar}>
                <View>
                    <Text style={styles.sideBarTitle}>
                        {appName}
                    </Text>
                </View>
                <View style={styles.whileLine}/>
                <ListView style={styles.listContainer}
                    dataSource={this.state.majorDataSource}
                    renderRow={
                        (rowData) => <TouchableHighlight
                            activeOpacity={0.3}
                            underlayColor={'#01A971'}>
                            <View style={styles.majorItem}>
                                <Image
                                    style={styles.majorItemIcon}
                                    source={{uri: rowData.base64, scale: 4.5}}/>
                                <Text style={styles.majorItemName}>
                                    {rowData.name}
                                </Text>
                            </View>
                        </TouchableHighlight>
                    }
                />
                <View style={styles.whileLine}/>
                <ListView style={styles.listContainer}
                    dataSource={this.state.settingDataSource}
                    renderRow={
                        (rowData) => <TouchableHighlight
                            activeOpacity={0.3}
                            underlayColor={'#01A971'}
                            onPress={() => {
                                // ToastAndroid.show(homePageText, ToastAndroid.LONG);
                                this.setState({
                                    homePageText: 'Long Live VIM!',
                                });
                                // ToastAndroid.show(rowData.name, ToastAndroid.LONG);
                                this.render();
                                this.drawer.closeDrawer();
                                // ToastAndroid.show(this.state.majorDataSource.toString(), ToastAndroid.LONG);
                                console.log(this.state.majorDataSource);
                            }}
                        >
                            <View style={styles.majorItem}>
                                <Image
                                    style={styles.majorItemIcon}
                                    source={rowData.icon}/>
                                <Text style={styles.majorItemName}>
                                    {rowData.name}
                                </Text>
                            </View>
                        </TouchableHighlight>
                    }
                />
                <View style={styles.listRest}/>
            </View>
        );
    },

    _renderSectionHeader: function() {
        return (
                <View>
                <Text style={styles.sideBarTitle}>{appName}</Text>
                </View>
        );
    },

    _onPressButton: function(rowData) {
        this.homePageText = rowData.name;
        this.drawer.closeDrawer();
    }
});

var styles = StyleSheet.create({
    majorItem: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        backgroundColor:'#1A1921',
    },
    majorItemName: {
        fontSize: 20,
        marginTop: 8,
        marginBottom: 8,
        marginLeft: 12,
        color: '#FFFFFF',
    },
    majorItemIcon: {
        width: 20,
        height: 20,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 12,
    },
    sideBar: {
        flex: 1,
        backgroundColor: '#1A1921',
    },
    sideBarTitle: {
        fontSize: 30,
        marginLeft: 12,
        marginTop: 20,
        color: '#FFFFFF',
    },
    whileLine: {
        backgroundColor: '#FFFFFF',
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 5,
        height: 1 / PixelRatio.get(),
    },
    listContainer: {
        flex: 0,
    },
    listRest: {
        flex: 1,
    }
});

AppRegistry.registerComponent('NightWatch', () => NightWatch);
