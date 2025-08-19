const Utils = require('./utils');
const chalk = require('chalk');
const figlet = require('figlet');
const check = require('./checkVersion.js');
module.exports = () => {
  console.log(chalk.green(figlet.textSync('LIUX-CLI', { horizontalLayout: 'full' })))
  check(() => {
    Utils.createQuestion().then(res => {
      const { filename, templName } = res;
      if(templName.indexOf('https://') > -1 || templName.indexOf('http://') > -1) {
        // 克隆git模板
        Utils.gitClone(filename, templName)
      } else {
        // 复制本地模板
        Utils.copyTempl(filename, templName)
      }
    })
  })
}