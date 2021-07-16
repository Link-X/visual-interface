const path = require('path')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const argv = require('yargs').argv

const resolve = (dir) => path.join(__dirname, '../', dir)

const COMMON_PLUGINS = [
    new webpack.EnvironmentPlugin({
        NODE_ENV: 'dev'
    }),
    new webpack.ProgressPlugin({
        entries: true,
        modules: true,
        modulesCount: 100,
        profile: true
    })
]

if (!process.env.analyzer) {
    COMMON_PLUGINS.push(
        new BundleAnalyzerPlugin({
            analyzerPort: parseInt(process.env.port || 9528, 10)
        })
    )
}

const styleLoader = 'style-loader'

const smpWrap = (config) => config

const cacheLoader = {
    loader: 'cache-loader',
    options: {
        // cacheDirectory: resolve(commands[0] === 'start' ? '/node_modules/.cache/cache-loader' : '/.cache/cache-loader')
        cacheDirectory: '/node_modules/.cache/cache-loader'
    }
}

const cssInclude = [resolve('src')]
if (process.env.NODE_ENV === 'dev') {
    cssInclude.push(resolve('../engine/dist/style/index.css'))
}
module.exports = (webpackOptions) => {
    return smpWrap({
        mode: webpackOptions.mode,
        entry: webpackOptions.entry,
        output: {
            path: `${process.cwd()}/dist`,
            filename: '[name].js',
            ...webpackOptions.output
        },
        optimization: webpackOptions.optimization,
        module: {
            rules: [
                {
                    test: /.(j|t)s(x)?$/,
                    include: [resolve('src'),resolve('../engine/dist/esm/index.js')],
                    use: [
                        cacheLoader,
                        {
                            loader: 'babel-loader',
                            options: {
                                cacheDirectory: true,
                                presets: [
                                    [
                                        '@babel/preset-env',
                                        {
                                            targets: {},
                                            modules: false,
                                            debug: false,
                                            include: [],
                                            exclude: [],
                                            useBuiltIns: 'usage',
                                            corejs: {
                                                version: 3,
                                                proposals: true
                                            },
                                            forceAllTransforms: false,
                                            shippedProposals: true
                                        }
                                    ],
                                    '@babel/preset-typescript',
                                    ['@babel/preset-react']
                                ],
                                plugins: [
                                    '@babel/plugin-transform-modules-commonjs',
                                    [
                                        '@babel/plugin-proposal-decorators',
                                        {
                                            legacy: true
                                        }
                                    ],
                                    '@babel/plugin-proposal-export-default-from',
                                    '@babel/plugin-proposal-class-properties',
                                    [
                                        '@babel/plugin-transform-runtime',
                                        {
                                            corejs: false,
                                            helpers: true,
                                            regenerator: true,
                                            useESModules: false
                                        }
                                    ]
                                ]
                            }
                        }
                    ]
                },
                {
                    test: /.less$/,
                    use: [
                        cacheLoader,
                        styleLoader,
                        'css-loader',
                        'postcss-loader',
                        {
                            loader: 'less-loader',
                            options: {
                                javascriptEnabled: true
                            }
                        }
                    ]
                },
                {
                    test: /.css$/,
                    include: /node_module/,
                    use: [styleLoader, 'css-loader']
                },
                {
                    test: /.css$/,
                    include: cssInclude,
                    exclude: /(node_module|\.module.css$)/,
                    use: [cacheLoader, styleLoader, 'css-loader', 'postcss-loader']
                },
                {
                    test: /\.(eot|otf|ttf|woff|woff2)$/,
                    use: 'file-loader'
                },
                {
                    test: /.svg$/,
                    use: [
                        {
                            loader: 'svg-url-loader',
                            options: {
                                limit: 10 * 1024,
                                noquotes: true
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                    use: ['file-loader']
                },
                {
                    test: /\.html$/,
                    use: 'html-loader'
                },
                {
                    test: /\.(mp4|webm)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 10000
                        }
                    }
                }
            ]
        },
        plugins: webpackOptions.plugins.concat(COMMON_PLUGINS),
        resolve: {
            modules: [resolve('src'), 'node_modules'],
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.react.js', '.json'],
            mainFields: ['main', 'jsnext:main'],
            alias: {
                'react-dom': 'react-dom',
                '@': resolve('src'),
                '@components': resolve('src/components')
            }
        },
        devtool: webpackOptions.devtool,
        target: 'web',
        performance: webpackOptions.performance || {}
    })
}
