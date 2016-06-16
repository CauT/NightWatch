'use strict';

import React from 'react-native';
import {connect} from 'react-redux';
import * as types from '../constants/ActionTypes';
import {signInThenFetchToken} from '../actions/SignIn';
import SignInButton from './components/SignInButton';
import * as Progress from 'react-native-progress';
import Overlay from 'react-native-overlay';
import {BlurView} from 'react-native-blur';
import {logos, loginInfos} from '../../string';

const {
  View,
  Text,
  Image,
  Alert,
  StyleSheet,
  Component,
  TextInput,
  PixelRatio,
  Dimensions,
} = React;

var window = Dimensions.get('window');

class SignIn extends Component {

  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      indeterminate: true,
    };
  }

  _getOnChangeText(isAccount) {
    const {dispatch} = this.props;
    return function(text) {
      dispatch({
        type: isAccount ? types.INPUT_ACCOUNT : types.INPUT_PASSWORD,
        text: text,
      });
    };
  }

  render() {
    const {dispatch} = this.props;

    return (
      <View style={styles.login}>
        <Overlay isVisible={this.props.isWaiting}>
          <BlurView style={styles.background} blurType="dark">
            <Progress.Circle
              style={styles.progress}
              indeterminate={this.state.indeterminate}
            />
          </BlurView>
        </Overlay>
        <Text style={styles.title}>{loginInfos.title}</Text>

        <View style={styles.row}>
          <Image style={styles.icon} source={{uri:logos.account, scale: 4.5}}/>
          <TextInput
            style={styles.textInput}
            onChangeText={this._getOnChangeText(true)}
            value={this.props.username}
          />
        </View>

        <View style={styles.greyLine}/>

        <View style={styles.row}>
          <Image style={styles.icon} source={{uri:logos.lock, scale: 4.5}}/>
          <TextInput
            style={styles.textInput} secureTextEntry={true}
            onChangeText={this._getOnChangeText(false)}
            value={this.props.pwd}
          />
        </View>

        <Text style={styles.lawAttention}>{loginInfos.lawAttention}</Text>

        <SignInButton buttonText={'登陆'} underlayColor={'#2ab7a9'}
          backgroundColor={'#26A69A'} textColor={'#ffffff'}
          onPress={() => dispatch(signInThenFetchToken())}
        />
        <SignInButton buttonText={'需要帮助'} underlayColor={'#2ab7a9'}
          backgroundColor={'#D4D5DA'} textColor={'#565656'}
          onPress={() => dispatch(signInThenFetchToken())}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  login: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputText: {
    paddingLeft: 10,
    alignSelf: 'center',
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    padding: 10,
  },
  lawAttention: {
    fontSize: 15,
    textAlign: 'center',
    padding: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 20,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  textInput: {
    height: 40,
    width: 210,
    borderWidth: 0
  },
  greyLine: {
    backgroundColor: '#d4d4d4',
    margin: 3,
    width: 270,
    height: 2 / PixelRatio.get(),
  },
  progress: {
    alignSelf:'center',
  },
  background: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    width: window.width,
    height: window.height,
  },
});

function mapStateToProps(state) {
  const {signIn} = state;
  return {
    username: signIn.username,
    isWaiting: signIn.isWaiting,
    alertText: signIn.alertText,
    alertTitle: signIn.alertTitle,
    pwd: signIn.pwd,
  };
}

export default connect(mapStateToProps)(SignIn);
