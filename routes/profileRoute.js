const router = require('express').Router();

router.route('/symbals').get((req, res) => {
    res.render('profile-symbals');
});
router.route('/cryptochicken').get((req, res) => {
    res.render('profile-chicken');
});

router.route('/').get((req, res) => {
    res.render('lensprofile');
});

module.exports = router;
