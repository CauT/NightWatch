'use strict';

import React from 'react-native';
const {
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
import SoilTabBars from './pages/SoilTabBars';
// import {androidMajorItemInfos, settingItemInfos} from '../string';
import * as string from '../string';

var DRAWER_WIDTH_LEFT = 42;
var appName = '农业监测终端';

class AndroidRoot extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
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
  }

  _renderNavigationView() {
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    var majorDataSource = ds.cloneWithRows(string.androidMajorItemInfos);
    var settingDataSource = ds.cloneWithRows(string.settingItemInfos);
    return (
      <View style={styles.sideBar}>
        <View>
          <Text style={styles.sideBarTitle}>
            {appName}
          </Text>
        </View>
        <View style={styles.whileLine}/>
        <ListView style={styles.listContainer}
          dataSource={majorDataSource}
          renderRow={(rowData) =>
              <TouchableHighlight
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
          dataSource={settingDataSource}
          renderRow={
            (rowData) =>
              <TouchableHighlight
                activeOpacity={0.3}
                underlayColor={'#01A971'}
                onPress={() => {
                  // ToastAndroid.show(homePageText, ToastAndroid.LONG);
                  // ToastAndroid.show(rowData.name, ToastAndroid.LONG);
                  this.drawer.closeDrawer();
                  // ToastAndroid.show(this.majorDataSource.toString(), ToastAndroid.LONG);
                }}
              >
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
        <View style={styles.listRest}/>
      </View>
    );
  }

  _renderSectionHeader() {
    return (
      <View>
        <Text style={styles.sideBarTitle}>{appName}</Text>
      </View>
    );
  }

  _onPressButton(rowData) {
    this.drawer.closeDrawer();
  }
}

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

export default AndroidRoot;
