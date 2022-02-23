import { IRouter } from '../../bootstrap'
import { FilesController } from '../controller'
export const routes: Array<IRouter> = [
  {
    route: '/upload-file/:context/:folder',
    method: 'POST',
    execute: new FilesController().uploadFile,
    executeMiddleware: true,
  },
  {
    route: '/delete-file/:context/:folder/:idFile',
    method: 'DELETE',
    execute: new FilesController().deleteFile,
    executeMiddleware: true,
  },
]
