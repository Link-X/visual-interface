// Invoked on the commit-msg git hook by yorkie.
const chalk = require('chalk')
const msgPath = process.env.HUSKY_GIT_PARAMS
const msg = require('fs')
    .readFileSync(msgPath, 'utf-8')
    .trim()

const releaseRE = /^v\d/
const commitRE = /^(revert: )?(feat|fix|docs|dx|refactor|perf|test|workflow|build|ci|chore|types|wip|release|deps)(\(.+\))?: .{1,50}/

if (!releaseRE.test(msg) && !commitRE.test(msg)) {
    console.error(`代码提交不规范\n` + `feat: 新增\n` + `fix: 修改bug\n` + `docs: 文档\n`)
    process.exit(1)
}
