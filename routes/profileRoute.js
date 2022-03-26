const router = require('express').Router();

router.route('/symbals').get((req, res) => {
    res.render('profile-symbals');
});
router.route('/cryptochicken').get((req, res) => {
    res.render('profile-chicken');
});

module.exports = router;
