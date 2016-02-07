/**
 * Copyright 2013-2014 Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Circle.art
 * @typechecks
 *
 * Example usage:
 * <Circle
 *   radius={10}
 *   stroke="green"
 *   strokeWidth={3}
 *   fill="blue"
 * />
 *
 */
'use strict'
var React = require('react-native');
var ReactART = React.ART;

var $__0 =  React,PropTypes = $__0.PropTypes;
var Path = ReactART.Path;
var Shape = ReactART.Shape;

/**
 * Circle is a React component for drawing circles. Like other ReactART
 * components, it must be used in a <Surface>.
 */
var Circle = React.createClass({displayName: "Circle",
  propTypes: {
    radius: PropTypes.number.isRequired,
    cx: PropTypes.number.isRequired,
    cy: PropTypes.number.isRequired,
  },

  render: function() {
    var radius = this.props.radius;
    var cx = this.props.cx;
    var cy = this.props.cy;

    // var path = Path().moveTo(0, -radius)
    //     .arc(0, radius * 2, radius)
    //     .arc(0, radius * -2, radius)
    //     .close();

    var path = Path().moveTo(cx, 2 * cy)
        .arc(0, radius * 2, radius)
        .arc(0, radius * -2, radius)
        .close();

    return React.createElement(Shape, React.__spread({},  this.props, {d: path}));
  },
});

module.exports = Circle;
