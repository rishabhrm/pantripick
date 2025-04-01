const pool = require('../config/db'); // Import the database pool

// Fetch all users
const FetchUser = (req, res) => {
  pool.query('SELECT * FROM users_table;', (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error executing query' });
    }
    res.json(result.rows);
  });
};

// Register a new user
const RegisterUser = (req, res) => {
  const { var1, var2, var3 } = req.body;

  const query = 'INSERT INTO users_table (u_name, u_email, u_password) VALUES ($1, $2, $3) RETURNING *;';
  const values = [var1, var2, var3];

  pool.query(query, values, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error executing query' });
    }
    res.json(result.rows[0]);
  });
};

// Update user details
const UpdateUser = (req, res) => {
  const { var1, var2, var3 } = req.body;

  const query = 'UPDATE users_table SET field1 = $1, field3 = $2 WHERE field2 = $3 RETURNING *;';
  const values = [var1, var3, var2];

  pool.query(query, values, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error executing query' });
    }
    res.json(result.rows);
  });
};

// Delete a user
const DeleteUser = (req, res) => {
  const { var2 } = req.body;

  const query = 'DELETE FROM users_table WHERE field2 = $1 RETURNING *;';
  const values = [var2];

  pool.query(query, values, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error executing query' });
    }
    res.json(result.rows);
  });
};

module.exports = {
  FetchUser,
  RegisterUser,
  UpdateUser,
  DeleteUser,
};
