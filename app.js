/**
 * Created by 毅 on 2016/7/30.
 * 应用程序的启动（入口）文件
 */

//加载express模块
var express = require('express');
//加载模板处理模块
var swig = require('swig');
//加载数据库模块
var mongoose = require('mongoose');
mongoose.Promise = Promise;
//加载body-parser，用来处理post提交过来的数据
var bodyParser = require('body-parser');
//加载cookies模块
var Cookies = require('cookies');
//创建app应用 => NodeJS Http.createServer();
var app = express();

var User = require('./models/User');

//设置静态文件托管
//页面中href src url以/public开始，那么直接返回对应__dirname + '/public'下的文件
app.use('/public', express.static(__dirname + '/public'));

//配置应用模板
//定义当前应用所使用的模板引擎
//第一个参数：模板引擎的名称，同时也是模板文件的后缀，第二个参数表示用于解析处理模板内容的方法
app.engine('html', swig.renderFile);
//设置模板文件存放的目录，第一个参数必须是views，第二个参数是目录
app.set('views', './views');
//注册所使用的模板引擎，第一个参数必须是 view engine，第二个参数和app.engine这个方法中定义的模板引擎的名称（第一个参数）是一致的
app.set('view engine', 'html');
//在开发过程中，需要取消模板缓存
swig.setDefaults({ cache: false });

//bodyparser设置  req.body
app.use(bodyParser.urlencoded({ extended: true }));


//设置cookie
app.use(function(req, res, next) {
    // 登陆成功后 给 req.session.userInfo 赋值
    // 利用中间件检查sessions  并赋值给模板传递数据   
    // res.locals.userInfo = req.session  res.locals是往模板传递所有数据的对象集合
    req.cookies = new Cookies(req, res);

    //解析登录用户的cookie信息
    req.userInfo = {};
    if (req.cookies.get('userInfo')) {
        try {
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));

            //获取当前登录用户的类型，是否是管理员
            User.findById(req.userInfo._id).then(function(userInfo) {
                req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                next();
            })
            // next();
        } catch (e) {
            next();
        }

    } else {
        next();
    }
});
/*
 * 根据不同的功能划分模块
 * */
app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));

//监听http请求
mongoose.connect('mongodb://127.0.0.1:27017/test', function(err) {
    process.env.webpackEnv = '2222'; // 用于判断环境 和golbal一样
    console.log(process.env.webpackEnv);

    if (err) {
        console.log('数据库连接失败');
    } else {
        console.log('数据库连接成功');
        app.listen(8081);
    }
});

/*
    until 工具模块  不需要安装

    1、继承
        util.inherits(child, parent);
        let child = new children();
        console.log(child.eat)
        Object.setPrototypeOf(children.prototype, parent.prototype);

    2、类型判断
        Object.prototye.toString.call();   console.log(Object.prototype.toString.call(undefined) === '[Object undefined]')

        util.isArray()  return true || false


    3、util 和 events 发布定阅模式

    例
    let EventEmitter = require('events'); //核心模块
    let util = require('util');

    function Girl() {}
    util.inherits(Girl, EventEmitter);
    let girl = new Girl();

    function cry(xxx) {
        console.log('哭', xxx);
    }
    //once removeListener emit on
    girl.once('失恋', cry);
    girl.removeListener('失恋', cry);
    girl.emit('失恋', 1);
    girl.emit('失恋', 1);













*/

    

    








