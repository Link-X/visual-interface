import { nodeResolve } from '@rollup/plugin-node-resolve'
import babel from 'rollup-plugin-babel'

import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'

import tslint from 'rollup-plugin-tslint'
import stylelint from 'rollup-plugin-stylelint'
import postcss from 'rollup-plugin-postcss'
import json from 'rollup-plugin-jsonlint'
import { terser } from 'rollup-plugin-terser'
import alias from '@rollup/plugin-alias'
import serve from 'rollup-plugin-serve'
import copy from 'rollup-plugin-copy-watch'
import requireContext from 'rollup-plugin-require-context'

const path = require('path')

const resolve = function (...args) {
    return path.resolve(__dirname, ...args)
}
const isDev = process.env.NODE_ENV === 'dev'

const moduleDatas = {
    esm: {
        output: {
            format: 'esm',
            dir: resolve('./dist/esm')
        }
    },
    umd: {
        output: {
            format: 'umd',
            dir: resolve('./dist/umd'),
            name: 'CbQueSys'
        }
    },
    cjs: {
        output: {
            format: 'cjs',
            dir: resolve('./dist/cjs')
        }
    }
}
const modulesConfig = moduleDatas[process.env.MODULE]

const extensions = ['js', 'ts', 'jsx', 'tsx']

export default {
    input: resolve('./src/index.tsx'),
    ...modulesConfig,
    plugins: [
        // stylelint(),
        json(),
        postcss({
            minimize: true,
            extensions: ['.less', '.css'],
            use: [
                [
                    'less',
                    {
                        javascriptEnabled: true
                    }
                ]
            ],
            extract: resolve('./dist/style/index.css')
        }),
        tslint({
            throwOnError: true,
            throwOnWarning: true,
            include: ['src/**/*.ts', 'src/**/*.tsx'],
            exclude: ['node_modules/**', '*.js', '*.scss', '*.css']
        }),
        typescript(),
        babel({
            exclude: 'node_modules/**',
            extensions
        }),
        commonjs({ include: /node_modules/ }),
        nodeResolve({
            extensions,
            modulesOnly: true,
            customResolveOptions: {
                moduleDirectory: 'node_modules'
            }
        }),
        requireContext(),
        alias({
            entries: [{ find: 'src', replacement: resolve('./src') }]
        }),
        copy({
            watch: 'static',
            targets: [
                {
                    src: 'src/static/**',
                    dest: resolve('./dist/static')
                }
            ]
        }),
        // isDev &&
        //     serve({
        //         open: false,
        //         contentBase: resolve('./test'),
        //         host: 'localhost',
        //         port: 3004
        //     }),
        // !isDev && terser(),
        {
            watch: {
                include: 'src/**',
                clearScreen: true
            }
        }
    ],
    external: ['react', 'react-grid-layout', 'immer', 'use-immer', 'use-subscription', 'mobx-react-lite']
}
