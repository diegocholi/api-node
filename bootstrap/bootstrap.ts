import { core } from '.'
import express from 'express'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'
import fs from 'fs'
import cors from 'cors'
import path from 'path'
import middlewares from '../src/middleware/middlewares'
export const api = express()

export const bootstrap = () => {
  // Configurações gerais da API
  api.use([
    // Configuração de cors
    cors({
      origin: '*',
    }),
    // Setando aplicação para aceitar requisições em Json
    bodyParser.json(),
    // Configurando API para aceitar arquivos
    fileUpload({
      limits: { fileSize: 50 * 2024 * 2024 },
      preserveExtension: true,
      useTempFiles: false,
      tempFileDir: '/tmp/',
    }),
    // Setando parametros para decode de URL
    bodyParser.urlencoded({ extended: false }),
  ])

  // Definindo diretório de arquivos estáticos
  api.use(middlewares) // Definição de de um middlewares para arquivos estáticos
  api.use('/storage', express.static(path.resolve() + '/storage'))

  // Criando pasta do repositório de arquivos caso ela não exista
  if (!fs.existsSync('storage')) fs.mkdirSync('storage')

  // Portar que a api vai servir
  api.listen(3000)

  // Iniciando Core
  core()
}
