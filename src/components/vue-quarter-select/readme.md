# vue-quarter-select

### 一个基于 Vue.js 的季度选择器（源码）

![](preview.png)

## 安装

```sh
#npm
npm install --save vue-quarter-select
```

## 基本使用

支持Vue.use全局引入和组件内部引入
```
<template>
    <VueQuarterSelect
        :options="options"
        :max="2032"
        :min="2012"
        @handleQuarterSelect="handleQuarterSelect"
        @maximum="handleMaxmum"
        @minimum="handleMinimum"
    />
</template>

<script>
import VueQuarterSelect from "@/components/vue-quarter-select";
import moment from "moment";
export default {
    components: { VueQuarterSelect },
    data() {
        return {
            options: {
                quarter: moment().quarter(), // ['Number', 'String']
                year: moment().year(), // ['Number', 'String']
            },
        };
    },
    methods: {
        handleQuarterSelect(params) {
            // 输出格式 {year: 2032, quarter: 1}
            console.log(params);
        },
        handleMaxmum(message) {
            // 默认提示文本 例如： 最小年为2012年
            console.log(message);
        },
        handleMinimum(message) {
            // 默认提示文本 例如： 最大年为2032年
            console.log(message);
        },
    },
};
</script>
```

## 参数

| prop | type | default | require |description |
| --- | --- | --- | --- | --- |
| options | Object | `{year: 当前年, quarter: 当前月份所在季度}`| false | - |
| min | String/Number | `1970` | false | 小于最小日期的季度将触发handleMinimum函数 |
| max | String/Number | `2099` | false | 大于最大日期的季度将触发handleMaxmum函数 |



## 事件

| 事件名 | 说明 | 参数 |
| ----- | ----------- | ------ |
| handleQuarterSelect | 选项变化时 | newVal |
| handleMaxmum | 超出设置最大年时 | message |
| handleMinimum | 超出设置最小年时 | message |
