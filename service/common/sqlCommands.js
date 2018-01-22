/**
 * Created by TIAN on 2018/1/21.
 */

var user_status = {
    insertOne:'INSERT INTO user_status (username, password, qrcode) VALUES(?,?,?)',
};

//exports
module.exports = {
    user_status: user_status
};