'use strict';

import React from 'react-native';
import {connect} from 'react-redux';
const {
  StyleSheet,
  Text,
  View,
  Component,
  PixelRatio,
  DatePickerAndroid,
  TimePickerAndroid,
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

  _getOnPressArrow(index) {
    const {dispatch} = this.props;
    if (index % 2 === 0) { // select date
      return async function() {
        try {
          const {action, year, month, day} = await DatePickerAndroid.open({
            date: index < 2 ?
              this.props.startDate : this.props.endDate,
          });
          if (action !== DatePickerAndroid.dismissedAction) {
            let date = index < 2 ?
              this.props.startDate : this.props.endDate;
            date.setYear(year);
            date.setMonth(month);
            date.setDate(day);
            dispatch({
              type: index < 2 ?
                types.CHANGE_GRAPH_START_DATE : types.CHANGE_GRAPH_END_DATE,
              date: date,
            });
          }
        } catch ({code, message}) {
          console.warn('Cannot open date picker', message);
        }
      }.bind(this);
    } else { // select time
      return async function() {
        try {
          const {action, hour, minute} = await TimePickerAndroid.open({
            date: index < 2 ?
              this.props.startDate : this.props.endDate,
            is24Hour: true,
          });
          if (action !== TimePickerAndroid.dismissedAction) {
            let date = index < 2 ?
              this.props.startDate : this.props.endDate;
            date.setHours(hour);
            date.setMinutes(minute);
            dispatch({
              type: index < 2 ?
                types.CHANGE_GRAPH_START_DATE : types.CHANGE_GRAPH_END_DATE,
              date: date,
            });
          }
        } catch ({code, message}) {
          console.warn('Cannot open time picker', message);
        }
      }.bind(this);
    }
  }

  render() {
    const {dispatch} = this.props;
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
            onPress={() => dispatch({type: types.UPDATE_GRAPH_URL})}/>
        </View>
        <SrtDateExtButton buttonText={'起始时间：选择月日'}
          onPress={this._getOnPressArrow(0)}/>
        <SrtTimeExtButton buttonText={'起始时间：选择时间'}
          onPress={this._getOnPressArrow(1)}/>
        <EndDateExtButton buttonText={'终止时间：选择月日'}
          onPress={this._getOnPressArrow(2)}/>
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
  };
}

export default connect(mapStateToProps)(GraphDateSelectPad);
