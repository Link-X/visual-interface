#!/usr/bin/env node
const path = require('path')
const argv = require('yargs').argv
const commands = argv._ || []

if (commands[0] === 'design') {
    require('../cli/start')
} else if (commands[0] === 'build') {
    require('../cli/build')
}

