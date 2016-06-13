'use strict';

var React = require('react-native');
import {connect} from 'react-redux';
import {fetchHistoricalData} from '../../actions/Soil';
var {
  StyleSheet,
  Text,
  View,
  DatePickerAndroid,
  TimePickerAndroid,
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

var DateSelectPad = React.createClass({

  _onDateChange: function(date) {
    const {dispatch} = this.props;
    dispatch({
      type: types.CHANGE_HISTORICAL_DATE,
      date: date,
    });
  },

  async _onPressDateArrow() {
    const {dispatch} = this.props;
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: this.props.historicalDate,
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        var date = new Date();
        date.setYear(year);
        date.setMonth(month);
        date.setDate(day);
        dispatch({
          type: types.CHANGE_HISTORICAL_DATE,
          date: date,
        });
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  },

  async _onPressTimeArrow() {
    const {dispatch} = this.props;
    try {
      const {action, hour, minute} = await TimePickerAndroid.open({
        date: this.props.historicalDate,
        is24Hour: true,
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        var date = new Date();
        date.setHours(hour);
        date.setMinutes(minute);
        dispatch({
          type: types.CHANGE_HISTORICAL_DATE,
          date: date,
        });
      }
    } catch ({code, message}) {
      console.warn('Cannot open time picker', message);
    }
  },

  _onPressSearch() {
    const {dispatch} = this.props;
    dispatch(fetchHistoricalData());
  },

  render: function() {
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
            onPress={this._onPressSearch}/>
        </View>
        <DateExtendButton stateVarName={'isHistoricalDatePadHidden'}
          buttonText={'选择月日'} onPress={this._onPressDateArrow}/>
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
    shadowRadius: 3
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
  };
}

export default connect(mapStateToProps)(DateSelectPad);
