const express = require('express')
var cors = require('cors')
const app = express()
const port = 4567

const m1 = require('./modules/crudOperations')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get("/api/getuser", m1.FetchuserFunction);
app.post("/api/storeuser", m1.SaveuserFunction);
app.post("/api/deleteuser", m1.DeleteuserFunction);
app.post("/api/updateuser", m1.UpdateuserFunction);

app.get('/', (req, res) => {
  res.send('Server is ready.')
})

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
