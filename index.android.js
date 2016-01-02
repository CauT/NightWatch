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
    ToastAndroid,
} = React;

var DRAWER_WIDTH_LEFT = 42;

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

var soilItemInfos = [
    {
        name: '当前数据',
        icon: require('image!icon_dian'),
    },
    {
        name: '历史数据',
        icon: require('image!icon_dot'),
    },
    {
        name: '图表检索',
        icon: require('image!icon_dot'),
    },
];

var majorItemInfos = [
    {
        name: '土壤墒情',
        icon: require('image!icon_sapling'),
        position: 0,
        childDataSource: ds.cloneWithRows(soilItemInfos),
    },
    {
        name: '气象信息',
        icon: require('image!icon_weather'),
        position: 1,
        childDataSource: ds.cloneWithRows(soilItemInfos),
    },
    {
        name: '视频监控',
        icon: require('image!icon_chart'),
        position: 2,
        childDataSource: ds.cloneWithRows(soilItemInfos),
    },
    {
        name: '可信溯源',
        icon: require('image!icon_certificate'),
        position: 3,
        childDataSource: ds.cloneWithRows(soilItemInfos),
    },
    {
        name: '病虫害监测',
        icon: require('image!icon_microscope'),
        position: 4,
        childDataSource: ds.cloneWithRows(soilItemInfos),
    },
];

var settingItemInfos = [
    {
        name: '账户信息',
        icon: require('image!icon_account'),
        position: 5,
    },
    {
        name: '应用设置',
        icon: require('image!icon_settings'),
        position: 6,
    },
];

var appName = '农业监测终端';

var NightWatch = React.createClass({
    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var arr = new Array(10).fill(0);
        arr[2] = 1;
        return {
            majorDataSource: ds.cloneWithRows(majorItemInfos),
            settingDataSource: ds.cloneWithRows(settingItemInfos),
            itemFolded: arr,
            homePageText: "Hello World",
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
                <Text>
                    {this.state.homePageText}
                </Text>
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
                        (rowData) => <FoldableListView rd={rowData}/>
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

var FoldableListView = React.createClass({
    getInitialState: function() {
        return {
            isFolded: false,
        };
    },

    _renderBasicItem: function(rd) {
        return (
            <TouchableHighlight
                activeOpacity={0.3}
                underlayColor={'#01A971'}
                onPress={() => {
                    this.setState({
                        isFolded: !this.state.isFolded,
                    });
                }}
            >
                <View style={styles.majorItem}>
                    <Image
                        style={this.state.isFolded ? styles.childItemIcon:
                        styles.majorItemIcon}
                        source={rd.icon}/>
                    <Text style={this.state.isFolded ? styles.childItemName :
                        styles.majorItemName}>
                        {rd.name}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    },

    render: function() {
        if (this.state.isFolded === false)
            return this._renderBasicItem(this.props.rd);
            // return (<Text style={styles.sideBarTitle}>{'Hello'}</Text>);
        else
            return (
                <View>
                    {this._renderBasicItem(this.props.rd)}
                    <ListView style={styles.listContainer}
                        dataSource={this.props.rd.childDataSource}
                        renderRow={this._renderBasicItem}
                    />
                </View>
            );
    },
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
    childItemName: {
        fontSize: 16,
        marginTop: 4,
        marginBottom: 4,
        marginLeft: 16,
        color: '#FFFFFF',
    },
    majorItemIcon: {
        width: 20,
        height: 20,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 12,
    },
    childItemIcon: {
        width: 10,
        height: 10,
        marginTop: 6,
        marginBottom: 6,
        marginLeft: 16,
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
        flex: 1,
    },
    listRest: {
        flex: 0,
    }
});

AppRegistry.registerComponent('NightWatch', () => NightWatch);
