/**
* The examples provided by Facebook are for non-commercial testing and
* evaluation purposes only.
*
* Facebook reserves all rights not expressly granted.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
* OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
* FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
* AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
* CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*
*/
'use strict';

const React = require('react-native');
const {
  ScrollView,
  StyleSheet,
  PullToRefreshViewAndroid,
  Text,
  TouchableWithoutFeedback,
  View,
} = React;

const styles = StyleSheet.create({
  row: {
    borderColor: 'grey',
    borderWidth: 1,
    padding: 20,
    backgroundColor: '#3a5795',
    margin: 5,
  },
  text: {
    alignSelf: 'center',
    color: '#fff',

  },
  layout: {
    flex: 1,
  },
  scrollview: {
    flex: 1,
  },
});

const Row = React.createClass({
  _onClick: function() {
    this.props.onClick(this.props.data);
  },
  render: function() {
    return (
     <TouchableWithoutFeedback onPress={this._onClick} >
        <View style={styles.row}>
          <Text style={styles.text}>
            {this.props.data.text + ' (' + this.props.data.clicks + ' clicks)'}
          </Text>
        </View>
    </TouchableWithoutFeedback>
    );
  },
});
const PullToRefreshLayoutAndroidExample = React.createClass({
  statics: {
    title: '<PullToRefreshLayoutAndroid>',
    description: 'Container that adds pull-to-refresh support to its child view.'
  },

  getInitialState() {
    console.log(PullToRefreshViewAndroid);
    return {
      isRefreshing: false,
      loaded: 0,
      rowData: Array.from(new Array(20)).map(
        (val, i) => {return {text: 'Initial row' + i, clicks: 0}}),
    };
  },

  _onClick(row) {
    row.clicks++;
    this.setState({
      rowData: this.state.rowData,
    });
  },

  render() {
    const rows = this.state.rowData.map((row) => {
      return <Row data={row} onClick={this._onClick}/>;
    });
    return (
      <PullToRefreshViewAndroid
        style={styles.layout}
        refreshing={this.state.isRefreshing}
        onRefresh={this._onRefresh}
        colors={['#ff0000', '#00ff00', '#0000ff']}
        progressBackgroundColor={'#ffff00'}
        >
        <ScrollView style={styles.scrollview}>
          {rows}
        </ScrollView>
      </PullToRefreshViewAndroid>
    );
  },

  _onRefresh() {
    this.setState({isRefreshing: true});
    setTimeout(() => {
      // prepend 10 items
      const rowData = Array.from(new Array(10))
      .map((val, i) => {return {
        text: 'Loaded row' + (+this.state.loaded + i),
        clicks: 0,
      }})
      .concat(this.state.rowData);

      this.setState({
        loaded: this.state.loaded + 10,
        isRefreshing: false,
        rowData: rowData,
      });
    }, 5000);
  },

});


module.exports = PullToRefreshLayoutAndroidExample;
