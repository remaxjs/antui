# Mini AntUI

**不再维护，Remax 已支持引用小程序自定义组件，详情参考 https://remaxjs.org/guide/custom-component**

Port AntUI to Remax.

https://github.com/ant-mini-program/mini-antui

## 安装使用

```bash
$ npm install remax-antui --save
```

```javascript
import { View, Text } from 'remax';
import { Badge } from 'remax-antui';

export default () => {
  return (
    <View>
      <Badge text="hot">
        <Text>Remax</Text>
      </Badge>
    </View>
  );
}
```

## 更多 DEMO

https://github.com/remaxjs/alipay-api-demo
