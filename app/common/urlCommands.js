/**
 * Created by TIAN on 2018/1/31.
 */
var urls = {
	login:"user/loginUserAction",
	register:"user/addUserAction",
	addEvent:"event/addEventAction",
	editEvent:"event/editEventAction",
	searchOneUserOneDayEvent:"event/searchOneDayEventForSingleUserAction",
	searchOneUserEvent:"event/searchAllEventForSingleUserAction",
};

//exports
module.exports = {
	urls: urls,
};