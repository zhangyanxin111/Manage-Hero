//1.导入模块
const express = require('express');
const badyParse = require('body-parser');
const router = require('./router');
const bodyParser = require('body-parser');
//2.创建服务器
const app = express();

app.use(express.static('public'));
app.use(express.static('upload'));
app.use(bodyParser.urlencoded());
app.use(router);
//3.开启服务器
app.listen(3000, (err) => {
	if (err) {
		console.log('服务器启动失败', err);
	} else {
		console.log('服务器启动成功');
	}
});
