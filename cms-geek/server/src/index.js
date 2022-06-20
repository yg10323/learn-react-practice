const Koa = require('koa')
const KoaBody = require('koa-body');
const KoaStatic = require('koa-static');
const cors = require('koa2-cors');
const path = require('path');
const mapRoutes = require('./router');
require('./db');


const app = new Koa()

// 处理跨域
app.use(cors({ origin: "*" }));
// 数据解析 + 图片上传
app.use(KoaBody({
  multipart: true,//允许多张图像上传
  formidable: {
    uploadDir: path.join(__dirname, 'public/upload'),
    keepExtensions: true,
    maxFieldsSize: 2 * 1024 * 1024
  }
}));
// 静态资源服务器
app.use(KoaStatic(path.join(__dirname, 'public')));
// 注册路由
mapRoutes(app)


app.listen(3001, () => {
  console.log('服务在3001端口启动');
})