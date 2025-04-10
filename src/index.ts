import { buildApp } from './app'

const port = 8000

async function main () {
  const app = await buildApp()

  app.listen(port, () => {
    console.log(`Server is running on ${port}`)
  })
}

main()
