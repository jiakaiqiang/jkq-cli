#!/usr/bin/env node
const {inquirerPrompt} =  require('./inquirer');
const yargs = require('yargs');
const path   = require('path');
const fs = require('fs');
const ejs = require('ejs');

//引入拷贝的的函数 

// const { copyDir, checkMkdirExists } = require("./copy");
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

            //创建项目

            // const isMkdirExists = checkMkdirExists(
            //   path.resolve(process.cwd(),`./src/pages/${name}`)
            // );
            // if (isMkdirExists) {
            //   console.log(`${name}文件夹已经存在`)
            // } else {
            //   copyDir(
            //     path.resolve(__dirname, `./template/${type}`),  //
            //     path.resolve(process.cwd(), `./src/pages/${name}`) //运行的地址 process.cwd() 绝对地址  最好使用的是绝对的地址
            //   )
            // }
            //使用esj进行末班的渲染
            //获取对应的模板信息
            const  desturl =  path.resolve(__dirname, `./template`);
            //读取template 中文件夹的列表名称
           fs.readdir(desturl,(error,files)=>{
            const cwdUrl = process.cwd();
            files.forEach(item=>{
                ejs.renderFile(path.join(desturl, item), answer).then(data => {
                    // 生成 ejs 处理后的模版文件
                    fs.writeFileSync(path.join(cwdUrl, `./src/pages/${item}`) , data)
                  })
            
           
            })
           });

         
      
   
        })
    }
).argv;
