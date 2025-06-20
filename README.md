# 打造属于自己的项目脚手架工具liux-cli

本文介绍了如何创建一个像VueCLI那样的脚手架工具liux-cli，包括初始化脚本映射、使用commander解析命令行参数、设计命令参数、准备模板、下载模板及增强用户体验。

## 一、初始化——把脚本映射为命令

### vue-cli演示

我们希望可以像vue-cli那样 在终端输入vue 有对应的命令显示

### 创建自己的脚手架文件（liux-cli）

1、创建文件夹liux-cli，
2、在文件夹下创建index.js文件
3、index.js文件中写入

```js
// 使用Node开发命令行工具所执行的javascript 脚本必须在顶部加入#!/usr/bin/env node 声明
#!/usr/bin/env node
console.log('liux-cli脚手架工具')
```

4、接下来，需要在当前文件夹中使用 npm init -y 命令 创建pakaage.json文件，并在文件中 加入bin字段

```json
"bin": {
    "liux": "index.js"
  },
```

5、然后再使用 npm link命令 就可以实现 将 该文件映射到全局了

6、试着在cmd中输入 liux，发现成功执行index.js

## 二、使用commander解析命令行参数

<!-- ### vue-cli演示 -->

### 安装使用commander

1、安装使用commander

```git
npm install commander
```

2、[我们可以直接复制 commander官网上的实例代码来使用](https://github.com/tj/commander.js/blob/master/examples/alias.js)

## 三、设计命令行参数

在index.js中将复制过来的代码简化。

## 四、准备模板

在github创建一个仓库当作模板

## 五、根据liux create 命令 将模板下载到本地

1.安装 download-git-repo 插件

```git
npm install download-git-repo
```

2.在index.js中引入并使用

## 六、用ora增加下载中的loading效果

1、安装ora

```git
npm install ora
```

2.在index.js中引入并使用

## 七、使用chalk 和 logSymbols增加文本样式

1.下载chalk

```git
npm install chalk log-symbols
```

引入并使用

## 八、npm发布

打开npm官网

注册一个npm账号

在npm中检索是否有重复的包名

将package.json中的name改为发布到npm上的包名

打开控制台，执行npm login

登陆成功后，在项目下执行npm publish 发布

在npm官网搜索，看看是否发布成功

## 九、项目源码以及笔记

```js
#!/usr/bin/env node

console.log('liux-cli脚手架工具')
const { program } = require('commander');
const download = require('download-git-repo')
// const ora = require('ora')
// const chalk = require('chalk')
// const logSymbols = require('log-symbols')
program
  .version('0.1.0')//输出对应的版本号

program
  .command('create <project>')
  .description('初始化项目模板')
  .action(function(project){
    // 在下载前提示
    // const spinner = ora('正在下载模板...').start();
    //download的
    //第一个参数:仓库地址#分支注意需要改成所需要的格式，不要直接复制粘贴
    // 第二个参数: 项目名
    const downLoadUrl = `https://github.com:liuxiao915/vite-vue-project#master`
    download(downLoadUrl, project, { clone:true }, err => {
      if(err){
        console.error('下载失败')
        // spinner.fail()
        // return console.log(chalk.red('下载失败，失败原因：' + err))
        // return console.log(logSymbols.error, (chalk.red('下载失败，失败原因：' + err)))
      } else {
        console.log('下载成功')
        // spinner.succeed()
        // return console.log(chalk.green('下载成功'))
        // return console.log(logSymbols.success, chalk.green('下载成功'))
      }
    })
  })

program
  .command('help')
  .description('查看所有可用的模板帮助')
  .action(function(){
    console.log('在这里可以书写相关的帮助信息');
  });

program
  .parse(process.argv);
```
