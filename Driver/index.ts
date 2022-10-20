import * as fs from 'fs'
import * as path from 'path'
import * as api from '../Tools/index'
let dir: string

/**
* 返回一个文件的json对象
* @param list 词库文件目录（wordConfig/userData/wordList/recycleBin）
* @param name 词库文件名
* @return 词库json对象
*/
const getjson = (list: string, name: string) => { return api.command.getjson(dir, list, name) }

/**
* 将词库json对象存储在文件内
* @param list 词库文件目录
* @param name 词库文件名
* @param file 词库json对象
*/
const update = (list: string, name: string, file: any) => { return api.command.update(dir, list, name, file) }



export const driver = {
  wordCache: {},
  dir: '',

  /**
   * 配置基础信息
   * @param cache 
   * @param dir 
   */
  config: (cache:object, dir:string) => {
    driver.wordCache = cache
    driver.dir = dir

    // 加载额外主动库
    fs.readdirSync(path.join('../Function/initiative/')).forEach((value)=>{ require(path.join('../Function/initiative/', value)) })
  }, 
  mainStart: (q: string, playerData: object) => { },  // 开始被动解析
  initiativeStart: (q: string, playerData: object) => {}, // 开始主动解析?????
  start: () => { }, // 执行回答

  readPack: (dbName: string) => { }, // 查看xxx词库背包
  readOtherPack: () => { } //查看某人xxx词库背包

}


/*
  wordObj = {
    触发词: [所拥有的词库]
    keys : [所有的触发词],
    wordList : [所有的库名称],
    recycleBinList: [回收站列表]
  }
*/

/*
  {
    main:{ // 基础存储 },
    author: [ // 编写者 ],
    backpack: [ // 标记物品? ],
    cache: '存储库名',
    initiative: { // 主动词库 },
    function: { // js代码 }
  }
*/
// 当有人触发某词库时，将操作指针定位到此词库