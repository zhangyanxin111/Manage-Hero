const express = require('express');
const formidable = require('formidable');
const path = require('path');
const { raw } = require('body-parser');

//获取路由
const router = express.Router();
const model = require('./model');
const tokenUtil = require('./ken');
//设置允许跨域请求
router.all('*', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	//设置完请求头，交给后续的中间件进行处理
	next();
});
//get方法，地址为/getHeroList
router.get('getHeroList', (req, res) => {
	tokenUtil.checkRole(req, res);
	model.getHeroList((err, data) => {
		if (err) {
			res.json({ code: -1, msg: err });
		} else {
			res.json({ code: 200, data });
		}
	});
});
router.get('/delHeroById', (req, res) => {
	tokenUtil.checkRole(req, res);
	const { id } = req.query;
	model.deleteHeroById(id, (err, data) => {
		if (err) {
			res.json({ code: -1, msg: '删除失败' });
		} else {
			res.json({ code: 200, msg: '删除成功' });
		}
	});
});
//新增英雄接口
router.post('/addHero', (req, res) => {
	const { name, gender, img } = req.body;
	model.addHero(name, gender, img, (err, data) => {
		if (err) {
			res.json({ code: -1, msg: '新增失败' });
		} else {
			res.json({ code: 200, msg: '新增成功' });
		}
	});
});
//图片上传
router.post('/uploadFile', (req, res) => {
	console.log(req.body);
	const from = formidable({
		uploadDir: path.join(__dirname, '../upload'),
		keepExtensions: true,
	});
	from.parse(req, (err, fields, files) => {
		const filePath = files.avatar.path;
		console.log(filePath);
		const fileName = path.basename(filePath);
		res.json({ code: 0, src: fileName });
	});
});

//定义通过英雄id获取英雄数据的接口
router.get('/getHeroById', (req, res) => {
	const { id } = req.query;
	model.getHeroById(id, (err, data) => {
		if (err) {
			res.json({
				code: -1,
				msg: '获取失败',
			});
		} else {
			res.json({ code: 200, data: data[0] });
		}
	});
});

//更新英雄信息
router.post('/updateHero', (req, res) => {
	const { name, gender, img, id } = req.body;
	model.updateHero(id, name, gender, img, (err, data) => {
		if (err) {
			res.json({ code: -1, msg: '更新失败' });
		} else {
			res.json({ code: 200, msg: '更新成功' });
		}
	});
});
//登录
router.post('/login',(req,res)=>{
  model.login(
    req.body.(err,result)=>{
if(err){
  res.json({
    res.json({})
  })
}
    }
  )
})