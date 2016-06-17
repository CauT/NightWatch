'use strict';

import React from 'react-native';
import {connect} from 'react-redux';
const {
  DatePickerIOS,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  Component,
} = React;
import {logos} from '../../../string';
import Button from '../components/Button';
import ExtendButton from '../components/ExtendButton';
import * as types from '../../constants/ActionTypes';

var SrtDateExtButton = connect(getEBMapStateToProps(0))(ExtendButton);
var SrtTimeExtButton = connect(getEBMapStateToProps(1))(ExtendButton);
var EndDateExtButton = connect(getEBMapStateToProps(2))(ExtendButton);
var EndTimeExtButton = connect(getEBMapStateToProps(3))(ExtendButton);

function getEBMapStateToProps(index) {
  return function(state) {
    const {soil} = state;
    return {
      isHidden: soil.isGraphDatePadHidden[index],
    };
  };
}

class GraphDateSelectPad extends Component {
  _getOnDateChange(isStart) {
    const {dispatch} = this.props;
    return function(date) {
      dispatch({
        type: isStart ? types.CHANGE_GRAPH_START_DATE :
          types.CHANGE_GRAPH_END_DATE,
        date: date,
      });
    };
  }

  _getOnPressArrow(index) {
    const {dispatch} = this.props;
    return function() {
      dispatch({
        type: types.SWITCH_GRAPH_DATE_SELECT_PAD_STATE,
        index: index,
      });
    };
  }

  // order: startDate startTime endDate endTime
  _renderDatePicker(index) {
    return (
      this.props.isHidden[index] ?
      <View /> :
      index % 2 === 0 ?
        <DatePickerIOS
          date={index < 2 ? this.props.startDate : this.props.endDate}
          mode="date"
          onDateChange={this._getOnDateChange(index < 2)}
        /> :
        <DatePickerIOS
          date={index < 2 ? this.props.startDate : this.props.endDate}
          mode="time"
          onDateChange={this._getOnDateChange(index < 2)}
          minuteInterval={1}
        />
    );
  }

  _onPressSearch() {
    const {dispatch} = this.props;
    dispatch({
      type: types.UPDATE_GRAPH_URL,
    });
  }

  render() {
    return (
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <View>
            <Text style={styles.selectedTime}>{
              '起始：' +
              this.props.localeStartDate +
              ' ' +
              this.props.localeStartTime.substr(0, 11)
            }</Text>
            <Text style={styles.selectedTime}>{
              '终止：' +
              this.props.localeEndDate +
              ' ' +
              this.props.localeEndTime.substr(0, 11)
            }</Text>
          </View>
          <Button style={{alignSelf: 'flex-end'}} buttonText={'查找'} logoSource={logos.search}
            onPress={this._onPressSearch}/>
        </View>
        {this._renderDatePicker(0)}
        <SrtDateExtButton buttonText={'起始时间：选择月日'}
          onPress={this._getOnPressArrow(0)}/>
        {this._renderDatePicker(1)}
        <SrtTimeExtButton buttonText={'起始时间：选择时间'}
          onPress={this._getOnPressArrow(1)}/>
        {this._renderDatePicker(2)}
        <EndDateExtButton buttonText={'终止时间：选择月日'}
          onPress={this._getOnPressArrow(2)}/>
        {this._renderDatePicker(3)}
        <EndTimeExtButton buttonText={'终止时间：选择时间'}
          onPress={this._getOnPressArrow(3)}/>
        <View style={styles.greenLine}/>
        <View style={styles.blank} />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  textinput: {
    height: 26,
    width: 50,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    padding: 4,
    fontSize: 13,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  arrowIcon: {
    width: 14,
    height: 14,
    alignSelf: 'center',
  },
  selectedTime: {
    fontSize: 15,
    padding: 7,
    alignSelf: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  greenLine: {
    backgroundColor: '#01a971',
    margin: 3,
    height: 4 / PixelRatio.get(),
    shadowColor: '#ccc',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
  },
  blank: {
    height: window.height / 12,
  }
});

function mapStateToProps(state) {
  const {soil} = state;
  return {
    localeStartDate: soil.graphStartDate.toLocaleDateString(),
    localeStartTime: soil.graphStartDate.toLocaleTimeString(),
    localeEndDate: soil.graphEndDate.toLocaleDateString(),
    localeEndTime: soil.graphEndDate.toLocaleTimeString(),
    startDate: soil.graphStartDate,
    endDate: soil.graphEndDate,
    isHidden: soil.isGraphDatePadHidden,
  };
}

export default connect(mapStateToProps)(GraphDateSelectPad);
