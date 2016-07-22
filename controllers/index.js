var express = require('express'),
    router = express.Router();

// router.use('/', require('./signup'));
router.use('/', require('./auth'));
router.use('/', require('./profile.get'));
router.use('/', require('./profile.post'));
router.use('/', require('./profile.post.update'));
router.use('/', require('./newUser'));

router.get('/', function(req, res){
    res.render('index');
});

module.exports = router;
