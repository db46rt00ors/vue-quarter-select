<template>
    <VueQuarterSelect
        :options="options"
        :max="2032"
        :min="2012"
        v-on:handleQuarterSelect="handleQuarterSelect"
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
