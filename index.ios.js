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

import React from 'react-native';
import IOSRoot from './app/iOSRoot';
import CurrentData from './app/pages/CurrentData';
import {Provider} from 'react-redux';
import ConfigureStore from './app/stores/ConfigureStore';

const store = ConfigureStore();
const {
  AppRegistry,
} = React;

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <IOSRoot />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('NightWatch', () => Root);
