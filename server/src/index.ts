import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import { errorHandler } from '@middlewares'
import { router } from '@routes'

const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.send({ message: 'Hello world!' })
})

app.use(express.json())
app.use(express.static('public'))
app.use(router)
app.use(errorHandler)

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
