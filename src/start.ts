import { core } from '../bootstrap'
import express from 'express'
import bodyParser from 'body-parser'
export const api = express()

export const startApilication = () => {
  let cors = require('cors')
  // Setando aplicação para aceitar requisições em Json
  api.use(bodyParser.json())

  // Configuração de cors
  api.use(
    cors({
      origin: '*',
    })
  )
  // Setando parametros para decode de URL
  api.use(bodyParser.urlencoded({ extended: false }))

  // Portar que a api vai servir
  api.listen(3000)

  // Iniciando Core
  core()
}
