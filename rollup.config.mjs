// rollup.config.mjs
import babel from '@rollup/plugin-babel'
import alias from '@rollup/plugin-alias'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import terser from '@rollup/plugin-terser'
// import eslint from '@rollup/plugin-eslint'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
// import css from 'rollup-plugin-css-only'
// import cleanup from 'rollup-plugin-cleanup'
// import comments from 'postcss-discard-comments' 

// 文件置顶
const banner = `/* opener v1.0.0 */`;

export default [
   // js打包
    {
        input: 'src/main.js',
        output:  [
            {
                file: './dist/opener.bundle.js',
                format: 'iife',
                name: 'opener',
                sourcemap: true,
                sourcemapFile: './dist/opener.bundle.js.map',
                banner
            },
            {
                file: './dist/opener.esm.js',
                format: 'es',
                name: 'opener',
                sourcemap: true,
                sourcemapFile: './dist/opener.es.js.map',
                banner
            }
        ],
         plugins: [
            babel({ // 解析es6 -》 es5
                babelHelpers: 'bundled',
                presets: ['@babel/preset-env'],
                exclude: "node_modules/**" // 排除文件的操作 glob  
            }),
            alias({
                entries: [
                    {find:'@',replacement:'./src'}
                ]
            }),
            // serve({ // 开启本地服务
            //     open: true,
            //     openPage: '/index.html', // 打开的页面
            //     port: 3333,
            //     contentBase: ''
            // }),
            // livereload('dist'),
        ]
    },
    // js压缩打包
    {
        input: 'src/main.js',
        output:  [
            {
                file: './dist/opener.bundle.min.js',
                format: 'iife',
                name: 'opener',
                sourcemap: true,
                sourcemapFile: './dist/opener.bundle.min.js.map',
                banner
            },
            {
                file: './dist/opener.esm.min.js',
                format: 'es',
                name: 'opener',
                sourcemap: true,
                sourcemapFile: './dist/opener.es.min.js.map',
                banner
            }
        ],
         plugins: [
            babel({ // 解析es6 -》 es5
                babelHelpers: 'bundled',
                presets: ['@babel/preset-env'],
                exclude: "node_modules/**" // 排除文件的操作 glob  
            }),
            alias({
                entries: [
                    {find:'@',replacement:'./src'}
                ]
            }),
            terser()
        ]
    },
    // opener.css打包配置
    {
        input: 'src/style.css',
        output:  [
            {
                file: './dist/opener.css',
                format: 'cjs', // 输出格式为CommonJS
            }
        ],
        plugins: [
            postcss({
                extract: true, // 将CSS提取到单独的文件中
                // minimize: true, // （可选）压缩CSS
                plugins: [
                    autoprefixer({
                       "overrideBrowserslist": [
                            "> 0.5%",
                            // "last 2 versions",
                            "not dead",
                            "ie >= 8"
                        ],
                        grid: true
                    }),//添加浏览器前缀
                ]
            }),
        ]
    },
]