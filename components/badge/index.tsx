import * as React from 'react';
import { View, Text } from 'remax/alipay';
import clsx from 'clsx';
import './index.css';

interface BadgeProps {
  className?: string;
  overflowCount?: number;
  text: string | number;
  dot?: boolean;
}

const Badge: React.FC<BadgeProps> = ({ children, className, text, dot = false, overflowCount = 99 }) => {
  return (
    <View className={clsx('am-badge', className, { 'am-badge-not-a-wrapper': !children })}>
      {dot ? (
        <View class="am-badge-text is-dot" />
      ) : (
        <View
          className={clsx('am-badge-text', {
            'am-badge-double': text.toString().length > 1,
          })}
        >
          <Text className="am-badge-text-padding">
            {typeof text === 'number' && text > overflowCount ? overflowCount + '+' : text}
          </Text>
          <Text className="am-badge-text-inner">
            {typeof text === 'number' && text > overflowCount ? overflowCount + '+' : text}
          </Text>
        </View>
      )}
      {children}
    </View>
  );
};

export default Badge;
