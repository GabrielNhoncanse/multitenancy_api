import express from 'express'

const port = 8000

const app = express()

app.get("/health", (req, res) => {
  res.send("Server is running")
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
