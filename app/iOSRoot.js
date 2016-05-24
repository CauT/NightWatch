'use strict';

import React from 'react-native';
const {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
} = React;

import SoilTabBars from './pages/SoilTabBars';
import {iosMajorItemInfos} from '../string';

class iOSRoot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'soilTab',
      notifCount: 0,
      presses: 0,
    };
  }

  _renderContent(color: string, pageText: string, num?: number) {
    return (
        <View style={[styles.tabContent, {backgroundColor: color}]}>
            <Text style={styles.tabText}>{pageText}</Text>
            <Text style={styles.tabText}>{num} re-renders of the {pageText}</Text>
        </View>
    );
  }

  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title={iosMajorItemInfos[0].name}
          icon={{uri: iosMajorItemInfos[0].base64, scale: 4.5}}
          selected={this.state.selectedTab === 'soilTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'soilTab',
            });
        }}>
          <SoilTabBars />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title={iosMajorItemInfos[1].name}
          icon={{uri: iosMajorItemInfos[1].base64, scale: 4.5}}
          selected={this.state.selectedTab === 'weatherTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'weatherTab',
            });
          }}>
          <View />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title={iosMajorItemInfos[2].name}
          icon={{uri: iosMajorItemInfos[2].base64, scale: 4.5}}
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
          title={iosMajorItemInfos[3].name}
          icon={{uri: iosMajorItemInfos[3].base64, scale: 4.5}}
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
            title={iosMajorItemInfos[4].name}
            icon={{uri: iosMajorItemInfos[4].base64, scale: 4.5}}
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
  }
}

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

export default iOSRoot;
