import Editor from './Editor/index'
import Driver from './Driver'
import fs from 'fs'
import path from 'path'

const dir = './data'
const editor = new Editor(dir)

const cacheObj = editor.getCacheWord()
const driver = new Driver(cacheObj, dir)

// 导出外部的主动触发函数
export const initiative = (q: string, playData: { [key: string]: any }) => { driver.initiativeStart(q, playData) }


// 加载额外主动库
fs.readdirSync(path.join('./Function/initiative/')).forEach((value) => {
    console.log(value)
    require(path.join('./Function/initiative/', value))
})

editor.add('测试(@)', '成功', 'admin')
