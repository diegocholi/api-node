import { IRouter } from '../../bootstrap'
import { FilesController } from '../controller'
export const routes: Array<IRouter> = [
  {
    route: '/upload-file',
    method: 'GET',
    execute: new FilesController().uploadFile,
  },
]
