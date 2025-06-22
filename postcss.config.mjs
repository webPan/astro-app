export default {
    plugins: {
        "@tailwindcss/postcss": {},
        'autoprefixer': {},
        'postcss-pxtorem': {
            rootValue: 16, // rem 相对于 px 转换的基准值
            propList: ['*'], // 需要转换的 CSS 属性，* 表示全部
            unitPrecision: 5, // 转换后的小数位数
            exclude: (e) => {
               return false;
            }
        },

    }
}