const express = require('express');
const router = express.Router({ mergeParams: true });

router.use('/bags', require('./bags.routes'));
router.use('/auth', require('./auth.routes'));

module.exports = router;
