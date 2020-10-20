// 留给有需要的小伙伴 
// 1. 安装node http://nodejs.cn/download/
// 2. 初始化 npm init
// 3. 安装依赖 npm i --save express
// 4. 创建app.js（copy下述代码）
// 5. 运行命令：node app

// app.js
const express = require("express");
const app = express();

// 设置跨域访问
app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

let resData = [10, 20, 30, 40, 50, 60];

// 接口配置
app.get("/api/dashboard/chart", (req, res) => {
  res.status(200), res.json(resData);
});

// 配置服务端
let server = app.listen(3000, () => {
  let host = server.address().address;
  let port = server.address().port;

  console.log("Server running at http://%s:%s", host, port);
});
