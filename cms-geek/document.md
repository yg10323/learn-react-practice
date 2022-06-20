## 项目准备

### 1. 项目介绍

- 功能
  - null

- 技术
  - 框架：`react 18`
  - 路由：`react-router 5.x`
  - 语言：`typescript`
  - 状态管理：`mobx 6`
  - UI：`antd`
  - 网络请求：`axios`
  - css预编译器：`less`
  - 包管理器：`yarn`

### 2. 项目搭建

1. 使用`CRA`创建TS模板项目：`create-react-app cms-geek --template typescript`
2. 打开项目后，启动项目`yarn start`

### 3. 配置less

1. 暴露webpack配置文件（不可逆）：`yarn eject`

2. 安装less以及less-loader：`yarn add less less-loader`

3. 修改webpack配置文件

   1. 在项目根目录下会生成config文件夹，在其中找到`webpack.config.js`

   2. vscode快捷键`ctrl + f`搜索style，找到如下所示，并添加如下代码：

      ```js
      // style files regexes
      const cssRegex = /\.css$/;
      const cssModuleRegex = /\.module\.css$/;
      const sassRegex = /\.(scss|sass)$/;
      const sassModuleRegex = /\.module\.(scss|sass)$/;
      // 添加如下代码
      const lessRegex = /\.less$/;
      const lessModuleRegex = /\.module\.less$/;
      ```

   3. 然后搜索`oneOf`，添加以下配置代码：

      ```js
      {
        test: lessRegex,
        exclude: lessModuleRegex,
        use: getStyleLoaders(
          {
            importLoaders: 2,
            sourceMap: isEnvProduction
              ? shouldUseSourceMap
              : isEnvDevelopment,
          },
          "less-loader"
        ),
        sideEffects: true,
      },
      {
        test: lessModuleRegex,
        use: getStyleLoaders(
          {
            importLoaders: 2,
            sourceMap: isEnvProduction
              ? shouldUseSourceMap
              : isEnvDevelopment,
            modules: {
              getLocalIdent: getCSSModuleLocalIdent,
            },
          },
          "less-loader"
        ),
      },
      ```

4. 至此配置完成，在项目中可以使用`xx.less`或`xx.module.less(模块化)`

   - 通过模块化的方式引入：import styles from './xx.module.less'
   - 直接引入：import ‘./index.less’

> 注：不同类型的css文件最好不要混合引入，即：less文件只引入less文件

### 4. 配置别名

- 方式
  - 通过craco
  - 通过修改webpack配置文件（本项目使用该方式）

1. 在根目录下的`config/webpack.config.js`中搜索`alias`，找到并添加如下一行代码：

   ```js
         alias: {
           // Support React Native Web
           // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
           'react-native': 'react-native-web',
           // Allows for better profiling with ReactDevTools
           ...(isEnvProductionProfile && {
             'react-dom$': 'react-dom/profiling',
             'scheduler/tracing': 'scheduler/tracing-profiling',
           }),
           ...(modules.webpackAliases || {}),
        	// 添加如下一行   
           "@": path.resolve(__dirname, '../src')
         },
   ```

2. 如果想要vscode在本项目中对`@`有智能提示，可以在根目录下的`tsconfig.json`中添加如下配置：

   ```js
   "baseUrl": "src",
   "paths": {
     "@/*": ["*"]
   }
   ```

**扩展：使用craco配置别名**

1. 安装修改 CRA 配置的包：`yarn add -D @craco/craco`

2. 在项目根目录中创建 craco 的配置文件：`craco.config.js`，并在配置文件中配置路径别名

   ```js
   const path = require('path')
   
   module.exports = {
     // webpack 配置
     webpack: {
       // 配置别名
       alias: {
         // 约定：使用 @ 表示 src 文件所在路径
         '@': path.resolve(__dirname, 'src')
       }
     }
   }
   ```

3. 修改 `package.json` 中的脚本命令

   ```js
   // 将 start/build/test 三个命令修改为 craco 方式
   "scripts": {
     "start": "craco start",
     "build": "craco build",
     "test": "craco test",
     "eject": "react-scripts eject"
   }
   ```

4. 在代码中，就可以通过 `@` 来表示 src 目录的绝对路径

5. 重启项目，让配置生效

### 5. 项目结构

```js
cms-geek
├─ src
│  ├─ assets			项目资源文件，比如，图片 等
│  ├─ components		公共/项目组件
│  ├─ plugins			插件
│  │  ├─ apis			axios封装
│  │  └─ consts			常量封装
│  ├─ store				状态管理
│  ├─ styles			样式
│  ├─ utils				工具方法
│  ├─ views				页面
│  ├─ App.tsx			根组件
│  └─ index.tsx			项目入口
├─ tsconfig.json		TypeScript编译器的配置文件
└─ yarn.lock			项目依赖包相关
```

## 遇到的问题

- git push时报错如下（**本地分支和远程分支断开连接**）：

  ```js
  fatal:'origin' does not appear to be a git repository
  
  fatal:Could not read from remote repository
  ```

  - 参考：[(34条消息) fatal:‘origin‘ does not appear to be a git repository fatal:Could not read from remote repository_huanhuaqian的博客-CSDN博客](https://blog.csdn.net/huanhuaqian/article/details/81986064)

