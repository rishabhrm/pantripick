const p1 = require('../database/connectionDB')
const o1 = p1.ConnectionObj()
const FetchuserFunction = (req, res) => {
  try {
    o1.query('SELECT * FROM table1;', (error, result) => {
      if (error) {
        console.log(error)
        res.status(500).json({ error: 'error in executing query' })
      }
      res.json(result.rows)
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: 'error in executing query' })
  }
}
const SaveuserFunction = (req, res) => {
  try {
    // console.log(req);
    v1 = req.body.var1
    v2 = req.body.var2
    v3 = req.body.var3
    console.log(v1, v2, v3)
    o1.query(
      `INSERT INTO table1 (field1, field2, field3) VALUES ('${v1}',${v2},'${v3}');`,
      (error, result) => {
        if (error) res.status(500).json({ error: 'error in executing query' })
        res.json(result.rows)
      }
    )
  } catch {
    res.status(500).json({ error: 'error in executing query' })
  }
}

const DeleteuserFunction = (req, res) => {
  try {
    v1 = req.body.var2
    o1.query(`DELETE FROM table1 WHERE field2 = ${v1};`, (error, result) => {
      if (error) res.status(500).json({ error: 'error in executing query' })
      res.json(result.rows)
    })
  } catch {
    res.status(500).json({ error: 'error in executing query' })
  }
}

const UpdateuserFunction = (req, res) => {
  try {
    v1 = req.body.var1
    v2 = req.body.var2
    v3 = req.body.var3
    o1.query(
      `UPDATE table1 SET field1 = '${v1}' , field3 = '${v3}'  WHERE field2 = ${v2};`,
      (error, result) => {
        if (error) res.status(500).json({ error: 'error in executing query' })
        res.json(result.rows)
      }
    )
  } catch {
    res.status(500).json({ error: 'error in executing query' })
  }
}

module.exports = {
  FetchuserFunction,
  SaveuserFunction,
  DeleteuserFunction,
  UpdateuserFunction,
}
