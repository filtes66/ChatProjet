require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
app.use(cors({ origin: 'http://localhost:4000', credentials: true}))

app.use(express.json())
app.use(cookieParser())

let refreshTokens = []

app.post('/token', (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name })
    res.json({ accessToken: accessToken })
  })
})

app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
})

const posts = [
  {
    username: 'Kyle',
    password: 'azerty'
  },
  {
    username: 'Jim',
    password: 'qsdfg'
  }
]

app.post('/login', (req, res) => {
  // Authenticate User

 const user = res.json(posts.filter(post => post.username === req.username))

 // const username = req.body.username
 // const user = { name: username }
 const password = req.body.password;

  if (user.password !== password) {
    return res.status(403).json({
      error: "invalid login",
    });
  }

  const accessToken = generateAccessToken(user)
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
  refreshTokens.push(refreshToken)
  res
    .status(202)
    .cookie( 'accessToken', accessToken, /*refreshToken: refreshToken*/ {
      sameSite: 'strict',
      path: '/',
      expires: new Date(new Date().getTime() + 100 * 1000),
      httpOnly: true,
      //secure: true
    }).send("cookie being initialised")  
  })

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}

app.listen(4000)