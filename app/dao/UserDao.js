/**
 * Created by TIAN on 2018/2/19.
 */

class User {
	constructor(param) {
		this.uuid = param.uuid;
		this.username = param.username;
		this.password = param.password;
		this.birthday = param.birthday;
		this.nickname = param.nickname;
	}
}

module.exports = User;