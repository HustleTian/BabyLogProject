/**
 * Created by TIAN on 2018/1/21.
 */

var user_status = {
    insertOne:'INSERT INTO user (uuid, username, password, sex, birthday) VALUES(?,?,?,?,?)',
    login:'SELECT * FROM user WHERE username="%s" and password="%s"',
};

var event_status = {
    insertOne:'INSERT INTO user_event (uuid, eventType, eventDesc, startTime, endTime) VALUES(?,?,?,?,?)',
    editOne:'UPDATE user_event SET eventType="%d", eventDesc="%s", startTime="%d", endTime="%d" WHERE uuid="%s" and id="%d"',
    searchOneUserOneDay:'SELECT * FROM user_event WHERE uuid="%s" and startTime>="%d" and endTime<=%d',
    searchOneUser:'SELECT * FROM user_event WHERE uuid="%s"',
}

//exports
module.exports = {
    user_status: user_status,
    event_status: event_status,
};