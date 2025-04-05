const { ConnectionObj } = require('../config/db')
const db = ConnectionObj()

const FetchUser = async (req, res) => {
  const result = await db.query('SELECT * FROM users_table;')
  res.json({ users: result.rows })
}

const RegisterUser = async (req, res) => {
  const { u_name, u_email, u_password, u_phone, u_address, u_city } = req.body
  const result = await db.query(
    `INSERT INTO users_table 
     (u_name, u_email, u_password, u_phone, u_address, u_city) 
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
    [u_name, u_email, u_password, u_phone, u_address, u_city]
  )
  res.json({ user: result.rows[0] })
}

const UpdateUser = async (req, res) => {
  const { u_id, u_name, u_email, u_phone, u_address, u_city } = req.body
  const result = await db.query(
    `UPDATE users_table 
     SET u_name = $1, u_email = $2, u_phone = $3, u_address = $4, u_city = $5 
     WHERE u_id = $6 RETURNING *;`,
    [u_name, u_email, u_phone, u_address, u_city, u_id]
  )
  res.json({ updatedUser: result.rows[0] })
}

const DeleteUser = async (req, res) => {
  const { u_id } = req.body
  const result = await db.query(
    'DELETE FROM users_table WHERE u_id = $1 RETURNING *;',
    [u_id]
  )
  res.json({ deletedUser: result.rows[0] })
}

const LoginUser = async (req, res) => {
  const { email, password } = req.body
  const result = await db.query(
    'SELECT * FROM users_table WHERE u_email = $1;',
    [email]
  )
  const user = result.rows[0]

  if (!user || user.u_password !== password) {
    return res
      .status(401)
      .json({ error: !user ? 'User not found' : 'Invalid password' })
  }

  req.session.user = {
    firstName: user.u_name,
    email: user.u_email,
    phone: user.u_phone,
    address: user.u_address,
  }

  res.json({ message: 'Login successful', user: req.session.user })
}

const SessionUser = (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user })
  } else {
    res.status(401).json({ message: 'Not logged in' })
  }
}

const LogoutUser = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid')
    res.json({ message: 'Logged out successfully' })
  })
}

module.exports = {
  FetchUser,
  RegisterUser,
  UpdateUser,
  DeleteUser,
  LoginUser,
  SessionUser,
  LogoutUser
}