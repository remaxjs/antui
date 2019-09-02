import * as React from 'react';
import { View } from 'remax/alipay';
import clsx from 'clsx';
import ListItem from './ListItem';
import './index.css';

export interface ListProps {
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export default class List extends React.Component<ListProps> {
  static ListItem = ListItem;

  render() {
    const { className, header, footer, children } = this.props;
    return (
      <View className={clsx('am-list', className)}>
        {header && <View className="am-list-header">{header}</View>}
        <View className="am-list-body">{children}</View>
        {footer && <View className="am-list-footer">{footer}</View>}
      </View>
    );
  }
}
