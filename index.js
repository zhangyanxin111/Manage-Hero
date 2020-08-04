//1.导入模块
const express = require('express');

//2.引入第三方库
const mysql = require('mysql');
console.log(mysql);

//创建连接对象
const connection = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: '123456',
	database: 'huahua',
});
connection.connect();
//初始化express
const app = express();

//设置静态资源访问目录，用于存放静态页面
app.use(express.static('public'));
const getHeroList = (callback) => {
	connection.query('select*from heros', (err, data) => {
		callback(err, data);
	});
};
//删除
const deleteHeroById = (id, callback) => {
	connection.query('delect from heros where id =?'[id], (err, data) => {
		callback(err, data);
	});
};
deleteHeroById();
//增加
const addHero = (name, gender, img, callback) => {
	connection.query(
		'insert into heros(name,gender,img)values(?,?,?)',
		[name, gender, img],
		(err, data) => {
			callback(err, data);
		}
	);
};
//通过英雄的ID获取数据
const getHeroById = (id, callback) => {
	connection.query('select*from heros where id=?', [id], (err, data) => {
		callback(err, data);
	});
};
getHeroById();
//更新英雄数据
const updateHero = (id, name, gender, img, callback) => {
	connection.query(
		'UPDATE heros set gender =?, name=?,img=?WHERE id=?',
		[gender, name, img, id],
		(err, data) => {
			callback(err, data);
		}
	);
};
updateHero();
//注册页面
register();
const register = function (data, callback) {
	const { username, password } = data;
	connection.query(
		'insert into user set ?',
		{ username, password },
		callback
	);
};
//用户登录
login();
const login = function (data, callback) {
	//查询数据库是否有匹配的用户
	const { username, password } = data;
	connect.query(
		'select*from user where username=? ande password=?',
		[username, password],
		callback
	);
};
// //使用路由
// app.use(router);
app.get('/getHeroList', (req, res) => {
	connection.query('select * from heros', (err, msg) => {
		if (err) {
			res.json({ code: -1, msg: err });
		} else {
			res.json({ code: 200, msg });
		}
	});
});

//3.开启服务器
app.listen(3001, (err) => {
	console.log(err ? '启动失败' : '启动成功');
});
