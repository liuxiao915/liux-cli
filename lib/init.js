const Utils = require('./utils');
const check = require('./checkVersion.js');
module.exports = () => {
  // check(() => {
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
  // })
}