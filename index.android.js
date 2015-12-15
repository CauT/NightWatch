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
} = React;

var DRAWER_WIDTH_LEFT = 56;

var NightWatch = React.createClass({
    render: function() {
        /*
        return (
                <View style={styles.container}>
                <Text style={styles.welcome}>
                Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                To get started, edit index.android.js
                </Text>
                <Text style={styles.instructions}>
                Shake or press menu button for dev menu
                </Text>
                </View>
               );
               */
        return (
            <DrawerLayoutAndroid
            drawerPosition={DrawerLayoutAndroid.positions.Left}
            drawerWidth={Dimensions.get('window').width - DRAWER_WIDTH_LEFT}
            keyboardDismissMode="on-drag"
            ref={(drawer) => { this.drawer = drawer; }}
            renderNavigationView={this._renderNavigationView}
            >
            </DrawerLayoutAndroid>
        );
    },

    _renderNavigationView: function() {
        return (
                <View style={styles.container}>
                <Text style={styles.welcome}>
                Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                To get started, edit index.android.js
                </Text>
                <Text style={styles.instructions}>
                Shake or press menu button for dev menu
                </Text>
                </View>
               );
    },
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
});

AppRegistry.registerComponent('NightWatch', () => NightWatch);
