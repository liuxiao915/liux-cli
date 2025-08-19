#!/usr/bin/env node --harmony

const { program } = require('commander');

program
  .version(require('../package.json').version)

program
  .command('init')
  .description('初始化')
  .alias('i')
  .action(() => {
    require('../lib/init')()
  })

program
  .command('build')
  .description('打包')
  // .option('-e, --env <env>', '指定环境', 'stg')
  .action(() => {
    require('../lib/build')()
  })

program
  .command('list')
  .description('查看所有可用的模板')
  .alias('l')
  .action(() => {
    require('../lib/list')()
  })

// if (!program.args.length) {
//   program.help()
// }
program.parse(process.argv)
