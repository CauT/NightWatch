'use strict';

var React = require('react-native');

var {
    Text,
    Animated,
    Easing,
    PropTypes,
} = React;

var AnimatedText = createAnimatedTextComponent();
var AnimatedProps = Animated.__PropsOnlyForTests;

function createAnimatedTextComponent() {
    var refName = 'node';

    class AnimatedComponent extends React.Component {
        _propsAnimated: AnimatedProps;

        componentWillUnmount() {
            this._propsAnimated && this._propsAnimated.__detach();
        }

        setNativeProps(props) {
            this.refs[refName].setNativeProps(props);
        }

        componentWillMount() {
            this.attachProps(this.props);
        }

        attachProps(nextProps) {
            var oldPropsAnimated = this._propsAnimated;

            var callback = () => {
                this.forceUpdate();
            };

            this._propsAnimated = new AnimatedProps(
                nextProps,
                callback,
            );

            oldPropsAnimated && oldPropsAnimated.__detach();
        }

        componentWillReceiveProps(nextProps) {
            this.attachProps(nextProps);
        }

        render() {
            var tmpText = this._propsAnimated.__getAnimatedValue().text;
            return (
                <Text
                    {...this._propsAnimated.__getValue()}
                    ref={refName}
                >
                    {Math.floor(tmpText)}
                </Text>
            );
        }
    }

    return AnimatedComponent;
}

var RisingNumber = React.createClass({
    propTypes: {
        startNumber: PropTypes.number.isRequired,
        toNumber: PropTypes.number.isRequired,
        startFontSize: PropTypes.number.isRequired,
        toFontSize: PropTypes.number.isRequired,
        duration: PropTypes.number.isRequired,
    },

    getInitialState: function() {
        return {
            number: new Animated.Value(this.props.startNumber),
            fontSize: new Animated.Value(this.props.startFontSize),
        };
    },

    componentDidMount: function() {
        Animated.parallel([
            Animated.timing(
                this.state.number,
                {
                    toValue: this.props.toNumber,
                    duration: this.props.duration,
                    easing: Easing.linear,
                },
            ),
            Animated.timing(
                this.state.fontSize,
                {
                    toValue: this.props.toFontSize,
                    duration: this.props.duration,
                    easing: Easing.linear,
                }
            )
        ]).start();
    },

    render: function() {
        return (
            <AnimatedText
                style={{fontSize: this.state.fontSize}}
                text={this.state.number} />
        );
    }
});

module.exports = RisingNumber;
