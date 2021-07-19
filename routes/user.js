
const express = require('express');
const router= express.Router();
const { signUp, signIn,} = require('../controllers/User')


// router.get('/', allUsers)

router.post('/signup', signUp);
router.post('/signin', signIn)








module.exports = router;

