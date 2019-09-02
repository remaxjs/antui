import * as React from 'react';
import { View, Image } from 'remax/alipay';
import clsx from 'clsx';
import './index.css';

export interface ListItemProps {
  className?: string;
  align?: boolean;
  disabled?: boolean;
  multipleLine?: boolean;
  wrap?: boolean;
  prefix?: React.ReactNode;
  extra?: React.ReactNode;
  thumb?: string;
  arrow?: boolean;
  last?: boolean;
  index: number;
  onClick?: (e: { index: number }) => void;
}

export default class ListItem extends React.Component<ListItemProps> {
  static defaultProps = {
    className: '',
    align: false,
    disabled: false,
    multipleLine: false,
  };

  onItemTap = (index: number) => () => {
    const { onClick, disabled } = this.props;
    if (onClick && !disabled) {
      onClick({
        index: index,
      });
    }
  };

  render() {
    const {
      className,
      align,
      disabled,
      multipleLine,
      thumb,
      last,
      wrap,
      arrow,
      prefix,
      extra,
      index,
      children,
    } = this.props;

    return (
      <View
        className={clsx(
          'am-list-item',
          `am-list-${align}`,
          {
            'am-list-multiple': multipleLine,
            last: last,
          },
          className,
        )}
        hoverClass={clsx({ 'am-list-item-hover': !disabled })}
        onTap={this.onItemTap(index)}
      >
        {prefix && <View className="am-list-prefix">{prefix}</View>}
        {thumb && <Image className="am-list-thumb" src={thumb} mode="scaleToFill" />}
        <View className={clsx('am-list-line', { 'am-list-wrap': wrap })}>
          <View className="am-list-content">{children}</View>
          {extra && <View className="am-list-extra">{extra}</View>}
          {arrow && <View className="am-list-arrow" />}
          <View className="am-list-line-bottom" />
        </View>
      </View>
    );
  }
}
