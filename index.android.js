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
        icon: require('image!icon_dot'),
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
                                this.setState({
                                    homePageText: 'Long Live VIM!',
                                });
                                this.render();
                                this.drawer.closeDrawer();
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

var BasicItem = React.createClass({
    getInitialState: function() {
        return {
            isFolded: false,
        };
    },

    render: function() {
        return (
            <TouchableHighlight
                activeOpacity={0.3}
                underlayColor={'#01A971'}
                onPress={this.props.onPressFunc}
            >
                <View
                    style={this.props.isMajor ? styles.majorItem :
                    styles.childItem}>
                    <Image
                        style={this.props.isMajor ? styles.majorItemIcon :
                        styles.childItemIcon}
                        source={this.props.data.icon}/>
                    <Text style={this.props.isMajor ? styles.majorItemName :
                        styles.childItemName}>
                        {this.props.data.name}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    },
});

var FoldableListView = React.createClass({
    getInitialState: function() {
        return {
            isFolded: false,
        };
    },

    changeFolded: function() {
        this.setState({
            isFolded: !this.state.isFolded,
        });
    },

    render: function() {
        var majorItem = <BasicItem data={this.props.rd}
            isMajor={true}
            onPressFunc={this.changeFolded}
        />;
        // if (majorItem.state === undefined || majorItem.state.isFolded === false) {
        if (this.state.isFolded === false) {
            return majorItem;
        }
            // return (<Text style={styles.sideBarTitle}>{'Hello'}</Text>);
        else {
            return (
                <View>
                    {majorItem}
                    <ListView style={styles.listContainer}
                        dataSource={this.props.rd.childDataSource}
                        renderRow={(rowData) => {
                            return (
                                <BasicItem data={rowData}
                                    isMajor={false}
                                />
                            );
                        }}
                    />
                </View>
            );
        }
    },
});

var styles = StyleSheet.create({
    majorItem: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        backgroundColor:'#1A1921',
    },
    childItem: {
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
        marginTop: 6,
        marginBottom: 6,
        marginLeft: 8,
        color: '#FFFFFF',
    },
    majorItemIcon: {
        width: 20,
        height: 20,
        marginTop: 12,
        marginBottom: 12,
        marginLeft: 12,
    },
    childItemIcon: {
        width: 10,
        height: 10,
        marginTop: 12,
        marginBottom: 12,
        marginLeft: 24,
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
