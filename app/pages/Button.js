'use strict';

import React from 'react-native';

const {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Component,
} = React;

class Button extends Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        onPress={this.props.onPress}
        activeOpacity={0.3}
        underlayColor={'#2ab7a9'}
      >
        <View style={styles.row}>
          <Text style={styles.buttonText}>{this.props.buttonText}</Text>
          <Image style={styles.icon}
            source={{uri: this.props.logoSource, scale: 4.5}} />
        </View>
      </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  button: {
    height: 30,
    width: 70,
    backgroundColor: '#26A69A',
    shadowColor: '#a6aab0',
    shadowOpacity: 0.5,
    shadowOffset:{width:2,height:2},
    shadowRadius: 3,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 15,
    color: '#ffffff',
  },
  icon: {
    width: 14,
    height: 14,
    alignSelf: 'center',
  },
});

export default Button;
