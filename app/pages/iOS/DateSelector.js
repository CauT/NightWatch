'use strict';

var React = require('react-native');
import {connect} from 'react-redux';
var {
  DatePickerIOS,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} = React;
import {logos} from '../../../string';
import * as types from '../../constants/ActionTypes';

var DatePickerExample = React.createClass({
  getDefaultProps: function () {
    return {
      timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
    };
  },

  getInitialState: function() {
    return {
      timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
    };
  },

  onDateChange: function(date) {
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
        onDateChange={this.onDateChange}
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
        onDateChange={this.onDateChange}
        minuteInterval={1}
      />
    );
  },

  _onPressSearch() {
    console.log('pressed');
  },

  render: function() {
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.selectedTime}>{
            '选中：' +
            this.props.localeDate +
            ' ' +
            this.props.localeTime.substr(0, 11)
          }</Text>
          <TouchableHighlight
            style={styles.button}
            onPress={this._onPressSearch}
            activeOpacity={0.3}
            underlayColor={'#2ab7a9'}
          >
            <View style={styles.row}>
              <Text style={styles.buttonText}>查找</Text>
              <Image style={styles.arrowIcon}
                source={{uri: logos.search, scale: 4.5}} />
            </View>
          </TouchableHighlight>
        </View>
        {this._renderDatePicker()}
        <TouchableHighlight
          style={styles.arrowBar}
          onPress={this._onPressDateArrow}
          activeOpacity={0.3}
          underlayColor={'#66bb6a'}
        >
          <View style={styles.row} >
            <Text style={{paddingRight: 8,}}>选择月日</Text>
              <Image
                style={styles.arrowIcon}
                source={{
                  uri: this.props.isHistoricalDatePadHidden ?
                    logos.downArrow : logos.upArrow,
                  scale: 4.5
                }}
              />
          </View>
        </TouchableHighlight>
        {this._renderTimePicker()}
        <TouchableHighlight
          style={styles.arrowBar}
          onPress={this._onPressTimeArrow}
          activeOpacity={0.3}
          underlayColor={'#66bb6a'}
        >
          <View style={styles.row} >
            <Text style={{paddingRight: 8,}}>选择时间</Text>
              <Image
                style={styles.arrowIcon}
                source={{
                  uri: this.props.isHistoricalTimePadHidden ?
                    logos.downArrow : logos.upArrow,
                  scale: 4.5
                }}
              />
          </View>
        </TouchableHighlight>
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
  labelView: {
    marginRight: 10,
    paddingVertical: 2,
  },
  label: {
    fontWeight: '500',
  },
  headingContainer: {
    padding: 4,
    backgroundColor: '#f6f7f8',
  },
  heading: {
    fontWeight: '500',
    fontSize: 14,
  },
  arrowIcon: {
    width: 14,
    height: 14,
    alignSelf: 'center',
  },
  selectedTime: {
    fontSize: 20,
    padding: 10,
    alignSelf: 'center',
  },
  arrowBar: {
    backgroundColor: '#a5d6a7',
    margin: 8
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  button: {
    height: 30,
    width: 70,
    backgroundColor: '#26A69A',
    shadowColor: '#a6aab0',
    shadowOpacity: 0.5,
    shadowOffset:{width:2,height:2},
    shadowRadius: 3,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 15,
    color: '#ffffff',
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

export default connect(mapStateToProps)(DatePickerExample);
