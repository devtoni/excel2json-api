import path from 'path'
import express from 'express'
import cors from 'cors'
import logger from 'loglevel'
import bodyParser from 'body-parser'
import router from './routes'
import { cleanFolder, getPathFromRoot } from './helpers'


const startServer = () => {
  const app = express()

  cleanFolder(getPathFromRoot('uploads'))

  app.use(cors())
  app.use(bodyParser.json())
  app.use(router)

  return new Promise(resolve => {
    const server = app.listen(process.env.PORT || 3001, () => {
      logger.info(`Listening on port ${server.address().port}`)
      resolve(server)
    })
  })
}

export default startServer
