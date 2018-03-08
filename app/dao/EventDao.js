/**
 * Created by TIAN on 2018/2/20.
 */

class Event {
	constructor(param) {
		this.id = param.id;
		this.uuid = param.uuid;
		this.eventType = param.eventType;
		this.eventDesc = param.eventDesc;
		this.startTime = param.startTime;
		this.endTime = param.endTime;
	}
}

module.exports = Event;