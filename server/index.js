import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import todoRouter from "./routes/todoRouter.js"

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// käytä routeria
app.use("/", todoRouter)

// Middleware virheiden käsittelyyn
app.use((err, req, res, next) => {
  const statusCode = err.status || 500
  res.status(statusCode).json({
    error: {
      message: err.message,
      status: statusCode,
    },
  })
})

const port = process.env.PORT || 3002
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
