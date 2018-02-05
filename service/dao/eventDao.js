var db = require('../common/basicConnection');
var $sqlCommands = require('../common/sqlCommands');
var sprintf = require("sprintf-js").sprintf;
var vsprintf = require("sprintf-js").vsprintf;

/**
 * 增加事件Action
 */
function addEventAction(req, res, next){
	// 获取前台页面传过来的参数
	var param = req.body;
	// 执行Query
	db.queryArgs($sqlCommands.event_status.insertOne,
		[param.uuid,param.eventType,param.eventDesc,param.startTime,param.endTime],
		function(err, result) {
			if(!err){
				result = {
					code: 200,
					msg:'successful',
				};
			}
			// 以json形式，把操作结果返回给前台页面
			db.doReturn(res, result);
		}
	);
}

/**
 * 修改事件Action
 */
function editEventAction(req, res, next) {
	// 获取前台页面传过来的参数
	var param = req.body;
	// 执行Query
	db.query(vsprintf($sqlCommands.event_status.editOne,[param.eventType,param.eventDesc,param.startTime,param.endTime,param.uuid,param.id]),
		function(err, result) {
			if(!err){
				let temp = result;
				result = {
					code: 200,
					msg:'successful',
				};
			}
			// 以json形式，把操作结果返回给前台页面
			db.doReturn(res, result);
		}
	);
}

/**
 * 查询某用户一天事件Action
 * @returns {id,uuid,eventType,eventDesc,startTime,endTime}
 */
function searchOneDayEventForSingleUserAction(req, res, next) {
	// 获取前台页面传过来的参数
	var param = req.body;
	// 执行Query
	db.query(vsprintf($sqlCommands.event_status.searchOneUserOneDay,[param.uuid,param.startTime,param.endTime]),
		function(err, result) {
			if(!err){
				let temp = result;
				result = {
					code: 200,
					msg:'successful',
					rows: temp
				};
			}
			// 以json形式，把操作结果返回给前台页面
			db.doReturn(res, result);
		}
	);
}

/**
 * 查询某用户全部事件Action
 * @returns {id,uuid,eventType,eventDesc,startTime,endTime}
 */
function searchAllEventForSingleUserAction(req, res, next) {
	// 获取前台页面传过来的参数
	var param = req.body;
	// 执行Query
	db.query(sprintf($sqlCommands.event_status.searchOneUser,param.uuid),
		function(err, result) {
			if(!err){
				let temp = result;
				result = {
					code: 200,
					msg:'successful',
					rows: temp
				};
			}
			// 以json形式，把操作结果返回给前台页面
			db.doReturn(res, result);
		}
	);
}

// exports
module.exports = {
	addEventAction: addEventAction,
	editEventAction: editEventAction,
	searchOneDayEventForSingleUserAction:searchOneDayEventForSingleUserAction,
	searchAllEventForSingleUserAction:searchAllEventForSingleUserAction,
};