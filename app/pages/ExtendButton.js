'use strict';

import React from 'react-native';
import {logos} from '../../string';

const {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Component,
} = React;

class ExtendButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableHighlight
        style={styles.arrowBar}
        onPress={this.props.onPress}
        activeOpacity={0.3}
        underlayColor={'#66bb6a'}
      >
        <View style={styles.row} >
          <Text style={{paddingRight: 8,}}>{this.props.buttonText}</Text>
            <Image
              style={styles.arrowIcon}
              source={{
                uri: this.props.isHidden ?
                  logos.downArrow : logos.upArrow,
                scale: 4.5
              }}
            />
        </View>
      </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({
  arrowIcon: {
    width: 14,
    height: 14,
    alignSelf: 'center',
  },
  arrowBar: {
    backgroundColor: '#a5d6a7',
    margin: 8,
    shadowColor: '#a6aab0',
    shadowOpacity: 0.5,
    shadowOffset:{width:2,height:2},
    shadowRadius: 3
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
});

export default ExtendButton;
