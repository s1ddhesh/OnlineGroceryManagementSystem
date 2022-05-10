const jwt = require('jsonwebtoken')

const authorizationMiddleware = async function (req, res, next) {
    const token = req.cookies.JWT
    if (!token) {
        return res.status(401).redirect('/auth/login')
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = { ...payload }
        next()
    } catch (error) {
        return res.status(401).redirect('/auth/login')
    }
}

const apiAuthorizationMiddleware = async function (req, res, next) {
    const token = req.cookies.JWT
    if (!token) {
        return res.status(401).json({ msg: "unauthorized" })
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = { ...payload }
        next()
    } catch (error) {
        return res.status(401).json({ msg: "unauthorized" })
    }
}

const setAuthorizationMiddleware = async function (req, res, next) {
    const token = req.cookies.JWT
    if (!token) {
        next();
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = { ...payload }
        next()
    } catch (error) {
        next()
    }
}

module.exports = { authorizationMiddleware, apiAuthorizationMiddleware, setAuthorizationMiddleware }