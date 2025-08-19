const chalk = require('chalk');
const child_process = require('child_process')
// const { spawn } = require('child_process')
module.exports = () => {
    let cmdStr = 'cd demo && npm run build'
    child_process.exec(cmdStr, (error) => {
    	if (error) {
    		console.log('error :>> ', error)
    	} else {
    		console.log(chalk.yellow('编译完成后可执行 npm run preview 预览'))
    	}
    })
}