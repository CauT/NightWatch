'use strict';

import React from 'react-native';

const {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Component,
} = React;

class SignInButton extends Component {
  render() {
    return (
      <TouchableHighlight
        style={[styles.button, {backgroundColor: this.props.backgroundColor,}]}
        onPress={this.props.onPress}
        activeOpacity={0.3}
        underlayColor={this.props.underlayColor}
      >
        <View style={styles.row}>
          <Text style={[styles.buttonText, {color: this.props.textColor}]}>
            {this.props.buttonText}
          </Text>
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
    height: 50,
    width: 260,
    margin: 10,
    shadowColor: '#a6aab0',
    shadowOpacity: 0.5,
    shadowOffset:{width:2,height:2},
    shadowRadius: 3,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    elevation: 2,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 20,
  },
  icon: {
    width: 14,
    height: 14,
    alignSelf: 'center',
  },
});

export default SignInButton;
