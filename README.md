# guoweitang

## Project structure
```
|--mock                      // mock数据
   |   |--peopleList
   |   |   |--createSession
   |   |--auth
   |   |--chatMain
   |--public                 // 静态文件（不经过打包压缩处理）
   |   |--flexible
   |--src                    // 代码目录             
   |   |--components         // 组件目录
   |   |   |--footer
   |   |   |--header
   |   |   |   |--img
   |   |--views              // 视图模板
   |   |   |--chat
   |   |   |--passport
   |   |   |--index
   |   |   |   |--store       // vuex模块数据
   |   |   |--account
   |   |--assets              // 公共资源
   |   |   |--css
   |   |   |   |--fonts
   |   |   |--js
   |   |   |--img
   |   |--store                // vuex数据(全局)
   |   |--router               // 路由
   |--.gitignore               // git提交忽略描述文件
   |--.babel.config.js         // babel配置文件
   |--.mock.config.js          // mock数据配置文件
   |--.package.json 
   |--.package-lock.json 
   |--.README.md               // 项目介绍文件
   |--.vue.config.js           // @vue/cli配置文件
```


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm start
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
