<template>
    <div class="quarter-component" id="contextMenuBox">
        <li
            @click="toggleMenu()"
            class="dropdown-toggle"
            v-if="options.year !== undefined"
        >
            {{ options.year }} - Q{{ options.quarter }}
            <span class="caret" :class="{ caretOpen: showMenu }"></span>
        </li>
        <!-- :class="{caretOpen: showMenu}"-->
        <ul class="quarter" :class="{ hide: !showMenu }">
            <li class="quarter-select-header">
                <i class="prev-year" @click="goPrevYear"></i>
                <span class="center">{{ options.year }}年</span>
                <i class="next-year" @click="goNextYear"></i>
            </li>
            <li
                class="quarter-item"
                :class="{ cur: 1 === options.quarter }"
                @click="options.year <= max && handleQuarterSelect(1)"
            >
                第一季度
            </li>
            <li
                class="quarter-item"
                :class="{ cur: 2 === options.quarter }"
                @click="options.year <= max && handleQuarterSelect(2)"
            >
                第二季度
            </li>
            <li
                class="quarter-item"
                :class="{ cur: 3 === options.quarter }"
                @click="options.year <= max && handleQuarterSelect(3)"
            >
                第三季度
            </li>
            <li
                class="quarter-item"
                :class="{ cur: 4 === options.quarter }"
                @click="options.year <= max && handleQuarterSelect(4)"
            >
                第四季度
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "vue-quarter-select",
    data() {
        return {
            showMenu: false,
        };
    },
    props: {
        options: {
            type: Object,
            default: () => ({
                year: new Date().getFullYear(),
                quarter: Math.floor(
                    new Date().getMonth() % 3 == 0
                        ? new Date().getMonth() / 3
                        : new Date().getMonth() / 3 + 1
                ),
            }),
            required: false,
        },
        max: {
            type: Number,
            default: 2099,
            require: false,
        },
        min: {
            type: Number,
            default: 1970,
            require: false,
        },
    },
    created() {
        if (
            this.max < this.min ||
            this.max < this.options.year ||
            this.min > this.options.year
        ) {
            throw new Error(
                "参数有误最大值不能小于最小值且当前年应在最大值与最小值之间"
            );
        }
    },
    mounted() {
        document.addEventListener("click", this.hidePanel, false);
    },
    methods: {
        handleQuarterSelect(index) {
            this.options.quarter = index;
            let year = this.options.year;
            let quarter = this.options.quarter;
            this.showMenu = false;
            this.$emit("handleQuarterSelect", { year, quarter });
        },
        toggleMenu() {
            this.showMenu = !this.showMenu;
        },
        closeBtnGroup() {
            this.showMenu = false;
        },
        checkYear(year) {
            if (year < this.min || year > this.max) {
                return false;
            } else {
                return true;
            }
        },
        goPrevYear() {
            if (this.checkYear(this.options.year - 1)) {
                this.options.year -= 1;
            } else {
                // alert(`最小年为${this.min}年`);
                this.$emit("maximum", `最小年为${this.min}年`);
            }
        },
        goNextYear() {
            if (this.checkYear(this.options.year + 1)) {
                this.options.year += 1;
            } else {
                // alert(`最大年为${this.max}年`);
                this.$emit("minimum", `最大年为${this.max}年`);
            }
        },
        hidePanel(e) {
            document.addEventListener("click", (e) => {
                const contextMenuBox = document.getElementById(
                    "contextMenuBox"
                );
                if (contextMenuBox) {
                    if (!contextMenuBox.contains(e.target)) {
                        this.showMenu = false;
                    }
                }
            });
        },
    },
};
</script>

<style lang='less' scoped>
.quarter-component {
    min-width: 150px;
    height: 40px;
    position: relative;
    margin: 10px 1px;
    display: inline-block;
    vertical-align: middle;
    border: 1px solid #8c8c8c;
    border-radius: 3px;
    a {
        &:hover {
            text-decoration: none;
        }
    }
}
.dropdown-toggle {
    font-family: PingFangSC-Semibold;
    list-style-type: none;
    color: #000;
    min-width: 150px;
    padding: 10px;
    text-transform: none;
    font-weight: 300;
    margin-bottom: 7px;
    border: 0;
    border-radius: 0;
    text-align: center;
    box-sizing: border-box;
}
.hide {
    display: none;
}
.quarter {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    min-width: 150px;
    padding: 5px 0;
    margin: 2px 0 0;
    list-style: none;
    font-size: 14px;
    text-align: left;
    background-color: #fff;
    border: 1px solid #ccc;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
}
.quarter > li.quarter-item {
    padding: 10px 30px;
    display: block;
    clear: both;
    font-weight: normal;
    line-height: 1.6;
    color: #333333;
    white-space: nowrap;
    text-decoration: none;
    text-align: center;
    &:hover {
        background: #efefef;
        color: #409fcb;
    }
    &.cur {
        color: #d21f3e;
        font-weight: 600;
    }
}
.quarter > li.quarter-item {
    overflow: hidden;
    width: 100%;
    position: relative;
    margin: 0;
    box-sizing: border-box;
    cursor: pointer;
}
.caret {
    width: 10px;
    height: 10px;
    display: inline-block;
    overflow: hidden;
    transition: all 0.3s;
    transform-origin: 5px 5px;
    &:after {
        content: "";
        position: relative;
        top: 6px;
        width: 0;
        height: 0;
        border-top: 4px solid;
        border-right: 4px solid transparent;
        border-left: 4px solid transparent;
    }
    &.caretOpen {
        transform: rotate(180deg);
        transform-origin: 5px 5px;
    }
}
.quarter-select-header {
    position: relative;
    height: 40px;
    line-height: 40px;
    i {
        cursor: pointer;
        position: absolute;
        top: 0;
        padding: 0 5px;
        &:before,
        &:after {
            content: "";
            position: relative;
            display: inline-block;
            width: 8px;
            height: 8px;
            vertical-align: middle;
            border: 0 solid #aaa;
            border-radius: 1px;
            top: -1px;
            transition: all 0.3s;
        }
        &:hover {
            &:before,
            &:after {
                border-color: #000;
            }
        }
    }
    .prev-year {
        &:before,
        &:after {
            border-width: 1.5px 0 0 1.5px;
            transform: rotate(-45deg) scale(0.8);
        }
        &:after {
            left: -3px;
        }
    }
    .center {
        display: block;
        text-align: center;
    }
    .next-year {
        right: 9px;

        &:before,
        &:after {
            border-width: 1.5px 0 0 1.5px;
            transform: rotate(135deg) scale(0.8);
        }
        &:after {
            left: -3px;
        }
    }
}
</style>