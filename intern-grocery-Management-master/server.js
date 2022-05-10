// remove in production
require('dotenv').config()

const express = require('express')
const app = express()
const server = require('http').createServer(app)

const cookieParser = require('cookie-parser')

// to handle async errors
require('express-async-errors');

app.set('view engine', 'ejs')
app.use(express.static("public"))
app.use(express.json())
app.use(cookieParser())

const User = require('./models/User')

const connectDB = require('./config/connect')

// routes
const authRouter = require('./routes/authentication')

// middlewares
const { authorizationMiddleware, apiAuthorizationMiddleware, setAuthorizationMiddleware } = require('./middlewares/authorization')
const errorHandler = require('./middlewares/errorHandler')

app.use('/auth', authRouter)


app.get('/', setAuthorizationMiddleware, (req, res) => {
    let isLoggedIn = false
    if (req.user)
        isLoggedIn = true
    res.render('home', { isLoggedIn })
})

app.get('/store', (req, res) => {
    res.render('store')
})

app.get('/cart', authorizationMiddleware, (req, res) => {
    res.render('cart')
})

app.get('/fruits', (req, res) => {
    res.render('fruits')
})

const products = require('./products')
app.get('/products/fruits', (req, res) => {
    res.json(products.fruits)
})

app.get('/products/vegetables', (req, res) => {
    res.json(products.vegetables)
})

app.get('/cart-items', apiAuthorizationMiddleware, async (req, res) => {
    const user = await User.findById(req.user.userId)
    const cart = user.cart
    res.json({ cart })
})

app.post('/add-to-cart', apiAuthorizationMiddleware, async (req, res) => {
    const data = req.body
    const user = await User.findById(req.user.userId)
    user.cart.push(data)
    await user.save()
    res.json({ msg: "added to cart successfully" })
})

// error handler middleware
app.use(errorHandler)


const PORT = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => console.log(`Server is listening port ${PORT}...`));
    } catch (error) {
        console.log(error);
    }
};

start();
