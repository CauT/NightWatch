'use strict';

import React from 'react-native';
import * as types from '../../constants/ActionTypes';
import {
  selectCurrentDataSelector,
  selectHistoricalDataSelector,
} from '../../actions/Soil';
import {connect} from 'react-redux';
import * as strings from '../../constants/Strings';

import {
  Select,
  Option,
  OptionList,
} from 'react-native-selectme';

const {
  StyleSheet,
  Text,
  View,
  Component,
} = React;

function mapStateToProps(state) {
  return {};
}

class Selector extends Component {

  constructor(props) {
    super(props);
  }

  _selectType(toSelect) {
    const {dispatch} = this.props;
    dispatch({
      type: types.SET_SELECTOR_STATE,
      selectorVarName: this.props.varName,
      toSelect: toSelect,
    });
  }

  _getOptionList() {
    return this.refs.OPTION_LIST;
  }

  render() {
    var optionList = [];
    var overlayStyles = {
      position: 'absolute',
      width: window.width / 2,
      height: window.height / 2,
      flex : 1,
      justifyContent : 'center',
      alignItems : 'center',
      backgroundColor : '#ffffff',
      shadowColor: '#ccc',
      opacity: 1,
      shadowOffset: {width: 2, height: 2},
      shadowOpacity: 0.5,
      shadowRadius: 3,
    };

    if (this.props.valList !== undefined) {
      this.props.valList.forEach(function(val) {
        optionList.push(
          <Option value={val} key={val}>{val}</Option>
        );
      });
    }

    return (
      <View style={styles.selector}>
        <Text style={styles. selectorVarName}>
          {this.props.upperText}
        </Text>
        <Select
          width={110}
          height={40}
          ref="SELECT_TYPE"
          optionListRef={this._getOptionList.bind(this)}
          defaultValue={this.props.defaultValue}
          onSelect={this._selectType.bind(this)}
        >
          {optionList}
        </Select>
        <OptionList ref="OPTION_LIST" overlayStyles={overlayStyles}/>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  selector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
  },
   selectorVarName: {
    paddingRight: 10,
    alignSelf: 'center',
  },
});

export default connect(mapStateToProps)(Selector);
