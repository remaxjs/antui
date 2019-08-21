# Mini AntUI

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
