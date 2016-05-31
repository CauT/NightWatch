'use strict';

import React from 'react-native';
import {
  selectCurrentDataSelector,
  selectHistoricalDataSelector,
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
  return {};
}

class Selector extends Component {

  constructor(props) {
    super(props);
  }

  _selectType(selected) {
    const {dispatch} = this.props;
    if (this.props.isCurrent) {
      dispatch(selectCurrentDataSelector(this.props.type, this.props.name,
        selected));
    } else {
      dispatch(selectHistoricalDataSelector(this.props.type, this.props.name,
        selected));
    }
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
        <Text style={styles.selectorName}>
          {this.props.upperText}
        </Text>
        <Select
          width={70}
          height={55}
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
  selectorName: {
    paddingRight: 10,
    alignSelf: 'center',
  },
});

export default connect(mapStateToProps)(Selector);
