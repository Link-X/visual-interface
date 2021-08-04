/* eslint-disable */
const express = require('express')
const path = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const { createProxyMiddleware } = require('http-proxy-middleware')
const argv = require('yargs').argv

const app = express()

const config = require('../webpack/webpack.dev.config.js')
const runOpen = require('./run-open')
const compiler = webpack(config)
const commands = argv._ || []

const proxyConfig = {
    target: '/',
    changeOrigin: true,
    pathRewrite: {
        '^/api': ''
    },
    context: '/api'
}

const port = process.env.port || '9088'
const openUrl = `http://localhost:${port}`
const middleware = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    silent: true,
    stats: {
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
        colors: true
    }
})
middleware.waitUntilValid((error) => {
    if (commands[0] === 'start') {
        return
    }
    console.log('地址: ', openUrl)
    // if (error.hasErrors()){
    //     return
    // }
    // console.log(chalk.green('生成配置文件中...\n'))
    // feleWatch()
})

app.use(middleware)

app.use(webpackHotMiddleware(compiler))

var devProxy = createProxyMiddleware(proxyConfig)

app.use(proxyConfig.context, devProxy)

const middleFs = middleware.fileSystem
app.get('*', (req, res) => {
    middleFs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
        if (err) {
            res.sendStatus(404)
        } else {
            res.send(file.toString())
        }
    })
})

app.get('*.js', (req, res, next) => {
    req.url = req.url + '.gz'
    res.set('Content-Encoding', 'gzip')
    next()
})

// Serve the files on port 3000.
app.listen(port, function(err) {
    if (err) {
        throw err
    }
    runOpen(openUrl, {
        openPage: '/',
        open: ['google chrome', '--incognito']
    })
})
/* eslint-disable no-new */
