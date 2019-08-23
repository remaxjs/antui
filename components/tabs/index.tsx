import * as React from 'react';
import { View, Text, ScrollView, Swiper } from 'remax/alipay';
import clsx from 'clsx';
import { calcScrollLeft, compareVersion } from './util';
import Badge from '../badge';
import TabContent from './TabContent';
import './index.css';

const { windowWidth } = my.getSystemInfoSync();

export interface TabsProps {
  className: string;
  activeCls: string;
  tabBarUnderlineColor: string;
  tabBarActiveTextColor: string;
  tabBarInactiveTextColor: string;
  tabBarBackgroundColor: string;
  showPlus: boolean;
  swipeable: true;
  activeTab: number;
  animation: boolean;
  tabBarCls: string;
  duration: number;
  onChange?: (e: { index: number }) => void;
  onTabClick?: (e: { index: number }) => void;
  onPlusClick?: () => void;
  tabs: Array<{
    title: string;
    badgeType: string;
    badgeText: string;
  }>;
}

interface State {
  windowWidth: number;
  tabWidth: number;
  autoplay: boolean;
  animation: boolean;
  version: number;
}

export default class Tabs extends React.Component<TabsProps, State> {
  static TabContent = TabContent;

  static defaultProps = {
    className: '',
    activeCls: '',
    tabBarUnderlineColor: '#108ee9', // 选中选项卡下划线颜色
    tabBarActiveTextColor: '#108ee9', // 选中选项卡字体颜色
    tabBarInactiveTextColor: '#333333', // 未选中选项卡字体颜色
    tabBarBackgroundColor: '#ffffff', // 选项卡背景颜色
    showPlus: false,
    swipeable: true,
    activeTab: 0, // 当前激活tab
    animation: true,
    tabBarCls: '',
    duration: 500,
  };

  state = {
    windowWidth,
    tabWidth: 0.25,
    autoplay: false,
    animation: false,
    version: my.SDKVersion,
  };

  componentDidMount() {
    const { tabs, animation } = this.props;
    this.setState({
      tabWidth: tabs.length > 3 ? 0.25 : 1 / tabs.length,
      animation,
      autoplay: true,
    });
  }

  componentDidUpdate(prevProps: TabsProps) {
    const { tabs } = this.props;
    if (prevProps.tabs.length !== tabs.length) {
      this.setState({
        tabWidth: tabs.length > 3 ? 0.25 : 1 / tabs.length,
      });
    }
  }

  handleSwiperChange = (e: any) => {
    const { current } = e.detail;

    if (this.props.onChange) {
      this.props.onChange({ index: current });
    }
  }

  handleTabClick = (index: number) => () => {
    if (this.props.onTabClick) {
      this.props.onTabClick({ index });
    }
  }

  handlePlusClick = () => {
    if (this.props.onPlusClick) {
      this.props.onPlusClick();
    }
  }

  render() {
    const {
      className,
      activeCls,
      tabBarUnderlineColor,
      tabBarActiveTextColor,
      tabBarInactiveTextColor,
      tabBarBackgroundColor,
      showPlus,
      swipeable,
      activeTab,
      tabBarCls,
      duration,
      tabs,
      children,
    } = this.props;

    const { tabWidth, autoplay, version, animation } = this.state;

    return (
      <View className={clsx('am-tabs', className)}>
        <View className="am-tabs-tab-bar-wrap">
          <View className="am-tabs-bar">
            <View className="am-tabs-bar-content-wrap">
              <View className="am-tabs-scroll-left" />
              <View className="am-tabs-scroll-right" />
              <ScrollView
                scrollLeft={calcScrollLeft(windowWidth, tabWidth, activeTab)}
                scrollX
                scrollWithAnimation={animation}
                className="am-tabs-bar-content"
              >
                {tabs.map((tab, index) => (
                  <View
                    key={`tabs-item-${index}`}
                    onTap={this.handleTabClick(index)}
                    style={{
                      backgroundColor: tabBarBackgroundColor,
                      color: index === activeTab ? tabBarActiveTextColor : tabBarInactiveTextColor,
                      width: (tabs.length > 3 ? 0.25 : 1 / tabs.length) * 100 + '%',
                    }}
                    className={clsx('am-tabs-bar-tab', tabBarCls)}
                  >
                    <View
                      className={clsx('am-tabs-bar-title', { [activeCls]: index === activeTab })}
                      style={{ borderBottomColor: index === activeTab ? tabBarUnderlineColor : '' }}
                    >
                      <Text>{tab.title}</Text>
                      {tab.badgeType && (
                        <Badge
                          className={clsx('am-tabs-bar-badge', { [tab.badgeType]: tab.badgeType })}
                          dot={tab.badgeType == 'dot'}
                          text={tab.badgeText}
                        />
                      )}
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
            <View className={clsx('am-tabs-plus-wrap', { show: showPlus })}>
              <View className="am-tabs-plus" onTap={this.handlePlusClick} />
            </View>
          </View>
          {swipeable ? (
            <Swiper
              circular={false}
              current={activeTab}
              interval="99999999"
              autoplay={autoplay}
              duration={duration}
              onChange={this.handleSwiperChange}
              className={clsx('am-tabs-content-wrap', { fix: compareVersion(version) < 0 })}
            >
              {children}
            </Swiper>
          ) : (
            <View className={clsx('am-tabs-content-wrap', { fix: compareVersion(version) >= 0 })}>
              <View className="am-tabs-slides" style={{ transform: 'translate3d(' + -activeTab * 100 + 'vw, 0, 0)' }}>
                {children}
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
}
