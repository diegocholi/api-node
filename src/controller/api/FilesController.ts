import { Request, Response } from 'express'
class FilesController {
  public uploadFile(req?: Request, res?: Response) {
    res?.status(200).send({ message: 'Teste de API estrutura de API Express' })
  }
}

export default FilesController
