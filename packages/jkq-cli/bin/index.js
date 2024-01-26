#!/usr/bin/env node
const {inquirerPrompt} =  require('./inquirer/inquirer');
const yargs = require('yargs');
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
        console.log(answer)

        })
    }
).argv;
