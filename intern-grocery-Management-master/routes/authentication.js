const express = require('express')
const router = express.Router()

const {
    registerUser,
    loginUser,
} = require('../controllers/authentication')

router.route('/register')
    .get((req, res) => res.render('auth/register'))
    .post(registerUser)
router.route('/login')
    .get((req, res) => res.render('auth/login'))
    .post(loginUser)
router.route('/logout')
    .get((req, res) => {
        res.clearCookie('JWT')
        res.redirect('/')
    })



module.exports = router