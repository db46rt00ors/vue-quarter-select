module.exports = {
    // 修改 src 为 examples
    pages: {
        index: {
            entry: "./src/main.js", //入口文件
            template: "public/index.html",
            filename: "index.html"
        }
    },
    // 组件样式内联
    css: {
        extract: false
    },
    devServer: {
        port: 3000
    }
}