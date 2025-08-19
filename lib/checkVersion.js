// 检查版本
// request： 获取工具信息
// co: 异步控制
// co-prompt: 等待用户输入
// semver: 版本检查和对比
const request = require('request')
const semver = require('semver')
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const packageConfig = require('../package.json')
const update = require('./update.js')

module.exports = done => {
  request({
    //由于网络等原因，此处改为https://registry.npm.taobao.org/gbg-peach-cli
    //否则经常超时，查不到版本号
    url: 'https://registry.npmjs.org/liux-cli',
    //为了用户体验，这里时间不能太长
    timeout: 1000
  }, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      const latestVersion = JSON.parse(body)['dist-tags'].latest
      const localVersion = packageConfig.version
      if (semver.lt(localVersion, latestVersion)) {
        console.log()
        console.log(chalk.yellow('  A newer version of liux-cli is available.'))
        console.log()
        console.log('  latest:    ' + chalk.green(latestVersion))
        console.log('  installed: ' + chalk.red(localVersion))
        console.log()
        co(function* () {
          let flag = yield prompt('Do you want to update the package ? [Y/N]')
          if (flag.toLowerCase() === 'y' || flag.toLowerCase() === 'yes') {
            console.log('有新版本');
            update().then(() => {
              done()
            })
          } else if (flag.toLowerCase() === 'n' || flag.toLowerCase() === 'no') {
            done()
          }
        })
      } else {
        done()
      }
    } else {
      done()
    }
  })
}