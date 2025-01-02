import express from 'express'
import { env } from '~/config/environment'
import { APIs } from '~/routes'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'
import connectDB from '~/config/mongodb'

const START_SERVER = () => {
  connectDB();
  
  const app = express()

  app.use(express.json())
  
  app.use('/api', APIs)
  
  // error handling middleware
  app.use(errorHandlingMiddleware)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`START SERVER SUCCESS!`)
  })
}

connectDB()
  .then(() => START_SERVER())
  .catch(error => {
    console.error(error)
    process.exit(0)
  })
