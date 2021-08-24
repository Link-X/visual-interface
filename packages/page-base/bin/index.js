#!/usr/bin/env node

/* eslint-disable */
const argv = require('yargs').argv
const commands = argv._ || []

if (commands[0] === 'design') {
    require('../cli/start')
} else if (commands[0] === 'build') {
    require('../cli/build')
}
/* eslint-disable no-new */
