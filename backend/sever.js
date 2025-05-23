const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv').config()
const DB = require("./DB/Connection")
const userRouter = require('./Routes/auth')
const noteRouter = require('./Routes/addNote')
const port = 3000

app.use(express.json())
app.use(cors())
DB()
app.use('/api', userRouter)
app.use('/',  noteRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


