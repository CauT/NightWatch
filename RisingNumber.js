'use strict';

var React = require('react-native');

var {
    Text,
    Animated,
    Easing,
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

            // The system is best designed when setNativeProps is implemented. It is
            // able to avoid re-rendering and directly set the attributes that
            // changed. However, setNativeProps can only be implemented on leaf
            // native components. If you want to animate a composite component, you
            // need to re-render it. In this case, we have a fallback that uses
            // forceUpdate.
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
    getInitialState: function() {
        return {
            degree: new Animated.Value(10),
        };
    },

    componentDidMount: function() {
        Animated.timing(
            this.state.degree,
            {
                toValue: 30,
                duration: 1000,
                easing: Easing.linear,
            },
        ).start();
    },

    render: function() {
        return (
            <AnimatedText
                style={{fontSize: this.state.degree}}
                text={this.state.degree} />
        );
    }
});

module.exports = RisingNumber;
