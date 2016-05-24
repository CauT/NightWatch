'use strict';

import React from 'react-native';
import {
  selectCurrentDataSelector,
} from '../actions/read';
import {connect} from 'react-redux';

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
  const {tmp} = state;
  return {
    typeSelector: tmp.typeSelector,
    stationSelector: tmp.stationSelector,
  };
}

class Selector extends Component {

  constructor(props) {
    super(props);
  }

  _selectType(selected) {
    const {dispatch} = this.props;
    dispatch(selectCurrentDataSelector(this.props.name, selected));
  }

  _getOptionList() {
    return this.refs['OPTION_LIST'];
  }

  render() {
    var optionList = [];
    var overlayStyles = {
      position: 'absolute',
      width: window.width / 3,
      height: window.height / 3,
      flex : 1,
      justifyContent : 'center',
      alignItems : 'center',
      backgroundColor : '#ffffff',
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
        <Text style={{padding: 10,}}>
          {this.props.upperText}
        </Text>
        <Select
          width={120}
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
    justifyContent: 'center',
  },
});

export default connect(mapStateToProps)(Selector);
