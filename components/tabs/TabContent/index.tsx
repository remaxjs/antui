import * as React from 'react';
import { SwiperItem } from 'remax/alipay';
import './index.css';

export interface TabContentProps {
  tabKey: string;
  style: React.CSSProperties;
}

const TabContent: React.FC<TabContentProps> = ({ tabKey, style = {}, children }) => {
  return (
    <SwiperItem style={style} class="am-tabs-pane-wrap" key={`tabs-pane-${tabKey}`}>
      {children}
    </SwiperItem>
  );
};

export default TabContent;
