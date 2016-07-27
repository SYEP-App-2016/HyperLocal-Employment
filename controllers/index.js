var express = require('express'),
    router = express.Router();

router.use('/', require('./auth'));
router.use('/', require('./profile.get'));
router.use('/', require('./profile.post'));
router.use('/', require('./profile.update'));
router.use('/', require('./newUser'));
router.use('/', require('./jobListing'));
router.use('/', require('./jobs'));
router.use('/', require('./company'));

router.get('/', function(req, res){
    if(req.user) res.render('profile')
    res.render('index', {
        user: req.user
    });
});

module.exports = router;
