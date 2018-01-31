var express = require('express');
var router = express.Router();
var eventDao = require('../dao/eventDao')

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.get('/addEventAction', function(req, res, next) {
	eventDao.addEventAction(req,res,next)
});

router.get('/editEventAction', function(req, res, next) {
	eventDao.editEventAction(req,res,next)
});

router.get('/searchOneDayEventForSingleUserAction', function(req, res, next) {
	eventDao.searchOneDayEventForSingleUserAction(req,res,next)
});

router.get('/searchAllEventForSingleUserAction', function(req, res, next) {
	eventDao.searchAllEventForSingleUserAction(req,res,next)
});

router.post('/addEventAction', function(req, res, next) {
	eventDao.addEventAction(req,res,next)
});

router.post('/editEventAction', function(req, res, next) {
	eventDao.editEventAction(req,res,next)
});

router.post('/searchOneDayEventForSingleUserAction', function(req, res, next) {
	eventDao.searchOneDayEventForSingleUserAction(req,res,next)
});

router.post('/searchAllEventForSingleUserAction', function(req, res, next) {
	eventDao.searchAllEventForSingleUserAction(req,res,next)
});

module.exports = router;

