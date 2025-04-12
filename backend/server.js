const express = require('express')
const session = require('express-session')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes')

// Load environment variables
dotenv.config()

// App Config
const app = express()
const port = process.env.PORT || 4567

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true,
	})
)

// Serve static images
app.use('/images', express.static(path.join(__dirname, 'public/images')))

// Start Session
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: false,
			httpOnly: true,
			sameSite: 'lax',
			maxAge: 24 * 60 * 60 * 1000,
		},
	})
)

// Routes
app.get('/', (req, res) => res.send('Server is ready'))
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)

// Start Server
app.listen(port, () => {
	console.log(`Server started at http://localhost:${port}`)
})