#!/usr/bin/env node
const {inquirerPrompt} =  require('./inquirer');
const yargs = require('yargs');
const path   = require('path');
//引入拷贝的的函数 

const { copyDir, checkMkdirExists } = require("./copy");
yargs.command(
    ['create','c'],
    '创建一个新的项目',
    function (yargs){
        return yargs.option('name',{
            alias:'n',
            describe:'项目名称',
            type:'string',
            demand:true
        })
    },
    function(argv){
        console.log('创建项目：',argv)
        inquirerPrompt(argv).then((answer)=>{
            const { name, type } = answer;
            console.log('项目名称：',name)
            const isMkdirExists = checkMkdirExists(
              path.resolve(process.cwd(),`./src/pages/${name}`)
            );
            if (isMkdirExists) {
              console.log(`${name}文件夹已经存在`)
            } else {
              copyDir(
                path.resolve(__dirname, `./template/${type}`),  //
                path.resolve(process.cwd(), `./src/pages/${name}`) //运行的地址 process.cwd() 绝对地址  最好使用的是绝对的地址
              )
            }
      
   
        })
    }
).argv;
