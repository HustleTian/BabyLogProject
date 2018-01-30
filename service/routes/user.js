var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/addUserAction', function(req, res, next) {
    userDao.addUserAction(req,res,next)
});

router.get('/loginUserAction', function (req, res, next) {
    userDao.loginUserAction(req,res,next)
});

module.exports = router;
