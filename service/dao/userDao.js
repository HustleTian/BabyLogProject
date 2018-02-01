var db = require('../common/basicConnection');
var $sqlCommands = require('../common/sqlCommands');
var sprintf = require("sprintf-js").sprintf;
var vsprintf = require("sprintf-js").vsprintf;
/**
 * 增加用户Action
 */
function addUserAction(req, res, next){
    // 获取前台页面传过来的参数
    var param = req.body;
    // 执行Query
	var uuid = guid();
    db.queryArgs($sqlCommands.user_status.insertOne,
        [uuid,param.username,param.password,param.sex,param.birthday],
        function(err, result) {
            if(!err){
                result = {
                    code: 200,
                    msg:'successful',
	                uuid: uuid
                };
            }
            // 以json形式，把操作结果返回给前台页面
            db.doReturn(res, result);
        }
    );
}

/**
 * 查询用户Action
 * @returns {uuid,username,password,sex,birthday}
 */
function loginUserAction(req, res, next) {
	// 获取前台页面传过来的参数
	var param = req.body;
	// 执行Query
	db.query(vsprintf($sqlCommands.user_status.login,[param.username,param.password]),
		function(err, result) {
			if(!err){
				let temp = result;
				let code = 200;
				let msg = 'successful';
				if (temp == null || temp.length <= 0)
				{
					code = 201;
					msg = 'fail';
				}
				result = {
					code: code,
					msg: msg,
					rows: temp
				};
			}
			// 以json形式，把操作结果返回给前台页面
			db.doReturn(res, result);
		}
	);
}

function guid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	});
}

// exports
module.exports = {
    addUserAction: addUserAction,
	loginUserAction: loginUserAction
};