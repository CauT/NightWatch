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
    Image,
    PixelRatio,
    TouchableHighlight,
} = React;

var DRAWER_WIDTH_LEFT = 42;

var majorItemInfos = [
    {
        name: '土壤墒情',
        icon: require('image!icon_sapling'),
    },
    {
        name: '气象信息',
        icon: require('image!icon_weather'),
    },
    {
        name: '生长过程监测',
        icon: require('image!icon_chart'),
    },
    {
        name: '可信溯源',
        icon: require('image!icon_certificate'),
    },
    {
        name: '病虫害监测',
        icon: require('image!icon_microscope'),
    },
];

var settingItemInfos = [
    {
        name: '账户信息',
        icon: require('image!icon_account'),
    },
    {
        name: '应用设置',
        icon: require('image!icon_settings')
    },
];

var appName = '农业监测终端';


var NightWatch = React.createClass({
    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                /* testing sticky
        for (var i=0; i<42; i++) {
            majorItemNames.push('Hello World!')
        }
                */
        return {
            majorDataSource: ds.cloneWithRows(majorItemInfos),
            settingDataSource: ds.cloneWithRows(settingItemInfos),
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
                        (rowData) => <TouchableHighlight>
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
                <View style={styles.whileLine}/>
                <ListView style={styles.listContainer}
                    dataSource={this.state.settingDataSource}
                    renderRow={
                        (rowData) => <TouchableHighlight>
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
    }
});

var styles = StyleSheet.create({
    majorItem: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
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
