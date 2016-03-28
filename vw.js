'use strict';

var React = require('react-native');

var {
  ART,
  View,
  Animated,
  Easing,
} = React;

var Group = ART.Group;
var Surface = ART.Surface;
var Wedge = require('./Wedge');

var AnimatedWedge = Animated.createAnimatedComponent(Wedge);

var VectorWidget = React.createClass({

  getInitialState: function() {
    return {
      startAngle: new Animated.Value(90),
      endAngle: new Animated.Value(100),
    };
  },

  componentDidMount: function() {
    Animated.parallel([
      Animated.timing(
        this.state.endAngle,
        {
          toValue: 405,
          duration: 700,
          easing: Easing.linear,
        }
      ),
      Animated.timing(
        this.state.startAngle,
        {
          toValue: 135,
          duration: 700,
          easing: Easing.linear,
        })
    ]).start();
  },

  render: function() {
    return (
      <View>
        <Surface
          width={700}
          height={700}
        >
          {this.renderGraphic()}
        </Surface>
      </View>
    );
  },

  renderGraphic: function() {
    console.log(this.state.endAngle.__getValue());
    return (
      <Group>
        <AnimatedWedge
          cx={100}
          cy={100}
          outerRadius={50}
          stroke="black"
          strokeWidth={2.5}
          startAngle={this.state.startAngle}
          endAngle={this.state.endAngle}
          fill="FFFFFF"/>
      </Group>
    );
  }
});

module.exports = VectorWidget;
