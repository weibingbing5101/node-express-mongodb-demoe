# node-express-mongodb-demoe

执行 mongodb

mac   mongod --config /usr/local/etc/mongod.conf

win   mongod安装目录bin下  cmd执行  mongod --dbpath=E:\xxdata  再新开执行 mongo

安装mongoDB http://www.cnblogs.com/junqilian/p/4109580.html

访问 http://localhost:8081/   


安装 nodemon
	npm install -g nodemon

	nodemon app.js

admin  管理员路径

// ===========================================================================================

// cat /usr/local/etc/mongod.conf  查看文件
<!-- 
systemLog:
  destination: file
  path: /usr/local/var/log/mongodb/mongo.log
  logAppend: true
storage:
  dbPath: /usr/local/var/mongodb   数据库存放位置
net:
  bindIp: 127.0.0.1

-->












































