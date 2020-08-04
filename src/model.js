//引入数据库操作第三方库
const mysql = require('mysql');

const connection = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: '123456',
	database: 'huahua',
});
//连接数据
connectioin.connect();

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
// 更新英雄数据
const updateHero = (id, name, gender, img, callback) => {
	connection.query(
		'UPDATE heros set gender = ?, name = ?, img = ? WHERE id = ?',
		[gender, name, img, id],
		(err, data) => {
			callback(err, data);
		}
	);
};

// 注册
const register = function (data, callback) {
	const { username, password } = data;
	connection.query(
		'insert into user set ?',
		{ username, password },
		callback
	);
};

// 用户登录
const login = function (data, callback) {
	// 查找数据库，是否有匹配的用户
	const { username, password } = data;
	connection.query(
		'select * from user where username=? and password=?',
		[username, password],
		callback
	);
};

module.exports = {
	getHeroList,
	deleteHeroById,
	addHero,
	getHeroById,
	updateHero,
	register,
	login,
};
