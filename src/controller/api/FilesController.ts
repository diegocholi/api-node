import fs from 'fs'
import path from 'path'
import { Request, Response } from 'express'
import { UploadedFile } from 'express-fileupload'

class FilesController {
  public uploadFile(req: Request, res: Response) {
    try {
      // Verificando se o arquivo existe
      if (!req.files) {
        return res.status(400).send({
          status: 'BAD_REQUEST',
          message: 'Arquivo não encontrado!',
          error: 'File not found!',
        })
      }

      // Verificação e criação de pastas e contextos de aplicações que utilizarão o MS
      let contextPath: string = FilesController.verifyRepositories(
        req,
        'storage'
      )

      const filesResponse = []
      // Iterando multiplos arquivos enviados
      for (const key in req.files) {
        if (Object.prototype.hasOwnProperty.call(req.files, key)) {
          const file: UploadedFile = req.files[key] as UploadedFile
          // Recuperando a extensão do arquivo
          const extension = '.'.concat(
            file.name.split('.')[file.name.split('.').length - 1]
          )

          // Definindo um ID para o arquivo
          const fileId = FilesController.fileIdGenerated()

          // Salvando o arquivo no repositório
          file.mv(contextPath.concat('/').concat(fileId).concat(extension))

          var fullUrl = FilesController.getFullUrl(
            req,
            contextPath,
            fileId,
            extension
          )

          // Salvando informações do arquivo para retorno
          filesResponse.push({
            fileId: fileId.concat(extension),
            extension: extension,
            originalName: file.name,
            fullUrl: fullUrl,
          })
        }
      }

      return res.status(200).send({
        message: 'Files uploaded',
        filesInfo: filesResponse,
      })
    } catch (err) {
      return res.status(400).send({
        status: 'BAD_REQUEST',
        message: 'Erro inesperado ao subir o arquivo',
        error: err,
      })
    }
  }

  public deleteFile(req: Request, res: Response) {
    try {
      const { context, folder, idFile } = req.params
      const oldPath =
        path.resolve() +
        '/' +
        'storage' +
        '/' +
        context +
        '/' +
        folder +
        '/' +
        idFile

      const newPath =
        path.resolve() +
        '/' +
        'storage' +
        '/' +
        context +
        '/' +
        folder +
        '/soft-deleted/'

      if (!fs.existsSync(newPath)) fs.mkdirSync(newPath)
      fs.renameSync(oldPath, newPath + idFile)

      return res.status(200).send({
        message: 'Deleted File',
      })
    } catch (err) {
      return res.status(404).send({
        status: 'BAD_REQUEST',
        message: 'Erro, arquivo não encontrado.',
      })
    }
  }

  public static fileIdGenerated(): string {
    return 'id-'
      .concat(Date.now().toString(16))
      .concat(Math.random().toString(16).substr(2))
  }

  public static verifyRepositories(req: Request, rootFolder: string) {
    let { context, folder } = req.params
    let contextPath = rootFolder.concat('/').concat(context)
    let contextPathWithFolder = contextPath.concat('/').concat(folder)
    if (!fs.existsSync(contextPath)) fs.mkdirSync(contextPath)
    if (!fs.existsSync(contextPathWithFolder))
      fs.mkdirSync(contextPathWithFolder)
    return contextPathWithFolder
  }

  public static getFullUrl(
    req: Request,
    contextPath: string,
    fileId: string,
    extension: string
  ) {
    return (
      req.protocol +
      '://' +
      req.get('host') +
      '/' +
      req.baseUrl +
      contextPath +
      '/' +
      fileId +
      extension
    )
  }
}

export default FilesController
