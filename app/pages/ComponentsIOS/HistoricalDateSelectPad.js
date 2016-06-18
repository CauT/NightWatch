'use strict';

import React from 'react-native';
import {connect} from 'react-redux';
import {fetchHistoricalData} from '../../actions/Soil';
const {
  DatePickerIOS,
  StyleSheet,
  Text,
  View,
  Component,
} = React;
import {logos} from '../../../string';
import Button from '../components/Button';
import ExtendButton from '../components/ExtendButton';
import * as types from '../../constants/ActionTypes';

var DateExtendButton = connect(debMapStateToProps)(ExtendButton);
var TimeExtendButton = connect(tebMapStateToProps)(ExtendButton);

function debMapStateToProps(state) {
  const {soil} = state;
  return {
    isHidden: soil.historicalPadState[0].bool,
  };
}

function tebMapStateToProps(state) {
  const {soil} = state;
  return {
    isHidden: soil.historicalPadState[1].bool,
  };
}

class DateSelectPad extends Component {

  _renderDatePicker() {
    const {dispatch} = this.props;
    return (
      this.props.isHistoricalDatePadHidden ?
      <View /> :
      <DatePickerIOS
        date={this.props.historicalDate}
        mode="date"
        onDateChange={(date) => dispatch({
          type: types.CHANGE_HISTORICAL_DATE,
          date: date,
        })}
      />
    );
  }

  _renderTimePicker() {
    const {dispatch} = this.props;
    return (
      this.props.isHistoricalTimePadHidden ?
      <View /> :
      <DatePickerIOS
        date={this.props.historicalDate}
        mode="time"
        onDateChange={(date) => dispatch({
          type: types.CHANGE_HISTORICAL_DATE,
          date: date,
        })}
        minuteInterval={1}
      />
    );
  }

  render() {
    const {dispatch} = this.props;
    return (
      <View>

        <View style={styles.container}>
          <Text style={styles.selectedTime}>{
            '选中：' +
            this.props.localeDate +
            ' ' +
            this.props.localeTime.substr(0, 11)
          }</Text>
          <Button buttonText={'查找'} logoSource={logos.search}
            onPress={() => dispatch(fetchHistoricalData())}/>
        </View>

        {this._renderDatePicker()}

        <DateExtendButton stateVarName={'isHistoricalDatePadHidden'}
          buttonText={'选择月日'} onPress={() => dispatch({
            type: types.SWITCH_DATE_SELECT_PAD_STATE,
            padIndex: 0,
          })}
        />

        {this._renderTimePicker()}

        <TimeExtendButton stateVarName={'isHistoricalTimePadHidden'}
          buttonText={'选择时间'} onPress={() => dispatch({
            type: types.SWITCH_DATE_SELECT_PAD_STATE,
            padIndex: 1,
          })}
        />

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
    padding: 5,
    alignSelf: 'center',
  },
  arrowBar: {
    backgroundColor: '#a5d6a7',
    margin: 8,
    shadowColor: '#a6aab0',
    shadowOpacity: 0.5,
    shadowOffset:{width:2,height:2},
    shadowRadius: 3,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});

function mapStateToProps(state) {
  const {soil} = state;
  return {
    localeDate: soil.historicalDate.toLocaleDateString(),
    localeTime: soil.historicalDate.toLocaleTimeString(),
    historicalDate: soil.historicalDate,
    isHistoricalTimePadHidden: soil.historicalPadState[1].bool,
    isHistoricalDatePadHidden: soil.historicalPadState[0].bool,
  };
}

export default connect(mapStateToProps)(DateSelectPad);
