'use strict';

var React = require('react-native');
import {connect} from 'react-redux';
import {fetchHistoricalData} from '../../actions/read';
var {
  DatePickerIOS,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} = React;
import {logos} from '../../../string';
import Button from '../components/Button';
import ExtendButton from '../components/ExtendButton';
import * as types from '../../constants/ActionTypes';

var DateExtendButton = connect(debMapStateToProps)(ExtendButton);
var TimeExtendButton = connect(tebMapStateToProps)(ExtendButton);

function debMapStateToProps(state) {
  const {tmp} = state;
  return {
    isHidden: tmp.historicalPadState[0].bool,
  };
}

function tebMapStateToProps(state) {
  const {tmp} = state;
  return {
    isHidden: tmp.historicalPadState[1].bool,
  };
}

var DateSelectPad = React.createClass({

  _onDateChange: function(date) {
    const {dispatch} = this.props;
    dispatch({
      type: types.CHANGE_HISTORICAL_DATE,
      date: date,
    });
  },

  _onPressDateArrow() {
    const {dispatch} = this.props;
    dispatch({
      type: types.SWITCH_DATE_SELECT_PAD_STATE,
      padIndex: 0,
    });
  },

  _onPressTimeArrow() {
    const {dispatch} = this.props;
    dispatch({
      type: types.SWITCH_DATE_SELECT_PAD_STATE,
      padIndex: 1,
    });
  },

  _renderDatePicker() {
    return (
      this.props.isHistoricalDatePadHidden ?
      <View /> :
      <DatePickerIOS
        date={this.props.historicalDate}
        mode="date"
        onDateChange={this._onDateChange}
      />
    );
  },

  _renderTimePicker() {
    return (
      this.props.isHistoricalTimePadHidden ?
      <View /> :
      <DatePickerIOS
        date={this.props.historicalDate}
        mode="time"
        onDateChange={this._onDateChange}
        minuteInterval={1}
      />
    );
  },

  _onPressSearch() {
    const {dispatch} = this.props;
    dispatch(fetchHistoricalData());
  },

  render: function() {
    return (
      <View>
        <View style={{flexDirection: 'row', alignItems:'space-around'}}>
          <Text style={styles.selectedTime}>{
            '选中:' +
            this.props.localeDate +
            '\n' +
            this.props.localeTime.substr(0, 11)
          }</Text>
          <Button buttonText={'查找'} logoSource={logos.search}
            onPress={this._onPressSearch}/>
        </View>
        {this._renderDatePicker()}
        <DateExtendButton stateVarName={'isHistoricalDatePadHidden'}
          buttonText={'选择月日'} onPress={this._onPressDateArrow}/>
        {this._renderTimePicker()}
        <TimeExtendButton stateVarName={'isHistoricalTimePadHidden'}
          buttonText={'选择时间'} onPress={this._onPressTimeArrow}/>
      </View>
    );
  },
});

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
    fontSize: 20,
    padding: 7,
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

function mapStateToProps(state) {
  const {tmp} = state;
  return {
    localeDate: tmp.historicalDate.toLocaleDateString(),
    localeTime: tmp.historicalDate.toLocaleTimeString(),
    historicalDate: tmp.historicalDate,
    isHistoricalTimePadHidden: tmp.historicalPadState[1].bool,
    isHistoricalDatePadHidden: tmp.historicalPadState[0].bool,
  };
}

export default connect(mapStateToProps)(DateSelectPad);
