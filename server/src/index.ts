import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send({ message: 'Hello world!' })
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
