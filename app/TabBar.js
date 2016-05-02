'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
} = React;

var { Icon, } = require('react-native-icons');

var styles = StyleSheet.create({
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabName: {
    marginLeft: 20,
  },
  tabs: {
    height: 45,
    flexDirection: 'row',
    paddingTop: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  icon: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: 0,
    left: 10,
  },
});

var TabBar = React.createClass({
    selectedTabIcons: [],
    unselectedTabIcons: [],

    propTypes: {
      goToPage: React.PropTypes.func,
      activeTab: React.PropTypes.number,
      tabs: React.PropTypes.array
    },

    renderTabOption({tabIcon, tabName}, page) {
      var isTabActive = this.props.activeTab === page;

      return (
        <TouchableOpacity key={tabIcon} onPress={() => this.props.goToPage(page)} style={styles.tab}>
          <Icon name={tabIcon} size={30} color='#01A971' style={styles.icon}
            ref={(icon) => { this.selectedTabIcons[page] = icon }}/>
          <Text style={styles.tabName}>{tabName}</Text>
          <Icon name={tabIcon} size={30} color='#ccc' style={styles.icon}
            ref={(icon) => { this.unselectedTabIcons[page] = icon }}/>
        </TouchableOpacity>
      );
    },

    componentDidMount() {
      this.setAnimationValue({value: this.props.activeTab});
      this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
    },

    setAnimationValue({value}) {
      var currentPage = this.props.activeTab;

      this.unselectedTabIcons.forEach((icon, i) => {
        var iconRef = icon;

        if (!icon.setNativeProps && icon !== null) {
          iconRef = icon.refs.icon_image
        }

        if (value - i >= 0 && value - i <= 1) {
          iconRef.setNativeProps({opacity: value - i});
        }

        if (i - value >= 0 &&  i - value <= 1) {
          iconRef.setNativeProps({opacity: i - value});
        }
      });
    },

    render() {
      var containerWidth = this.props.containerWidth;
      var numberOfTabs = this.props.tabs.length;
      var tabUnderlineStyle = {
        position: 'absolute',
        width: containerWidth / numberOfTabs,
        height: 3,
        backgroundColor: '#01A971',
        bottom: 0,
      };

      var left = this.props.scrollValue.interpolate({
        inputRange: [0, 1], outputRange: [0, containerWidth / numberOfTabs]
      });

      return (
        <View>
          <View style={styles.tabs}>
            {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
          </View>
          <Animated.View style={[tabUnderlineStyle, {left}]} />
        </View>
      );
    },
});

module.exports = TabBar;
