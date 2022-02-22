import { IRouter } from '../../bootstrap'
import { FilesController } from '../controller'
export const routes: Array<IRouter> = [
  {
    route: '/upload-file/:context',
    method: 'POST',
    execute: new FilesController().uploadFile,
  },
]
