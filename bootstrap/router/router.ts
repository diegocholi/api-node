import { Request, Response, NextFunction } from 'express'
import { api } from '../bootstrap'
import middleware from '../../src/middleware/middlewares'

export interface IRouter {
  route: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  execute: (req: Request, res: Response) => void
  executeMiddleware?: boolean
}

const router = (
  route: string,
  method: string,
  execute: (req: Request, res: Response) => void,
  executeMiddleware: boolean = false
) => {
  executeMiddleware
  switch (method.toUpperCase()) {
    case 'GET':
      if (executeMiddleware)
        api.get(
          route,
          middleware,
          async (req: Request, res: Response, next: NextFunction) => {
            try {
              await execute(req, res)
            } catch (err) {
              next(err)
              res.status(400).send({
                status: 'BAD_REQUEST',
                error: err,
              })
            }
          }
        )
      else
        api.get(
          route,
          async (req: Request, res: Response, next: NextFunction) => {
            try {
              await execute(req, res)
            } catch (err) {
              next(err)
              res.status(400).send({
                status: 'BAD_REQUEST',
                error: err,
              })
            }
          }
        )
      return
    case 'POST':
      if (executeMiddleware)
        api.post(
          route,
          middleware,
          async (req: Request, res: Response, next: NextFunction) => {
            try {
              await execute(req, res)
            } catch (err) {
              next(err)
              res.status(400).send({
                status: 'BAD_REQUEST',
                error: err,
              })
            }
          }
        )
      else
        api.post(
          route,
          async (req: Request, res: Response, next: NextFunction) => {
            try {
              await execute(req, res)
            } catch (err) {
              next(err)
              res.status(400).send({
                status: 'BAD_REQUEST',
                error: err,
              })
            }
          }
        )
      return
    case 'PUT':
      if (executeMiddleware)
        api.put(
          route,
          middleware,
          async (req: Request, res: Response, next: NextFunction) => {
            try {
              await execute(req, res)
            } catch (err) {
              next(err)
              res.status(400).send({
                status: 'BAD_REQUEST',
                error: err,
              })
            }
          }
        )
      else
        api.put(
          route,
          async (req: Request, res: Response, next: NextFunction) => {
            try {
              await execute(req, res)
            } catch (err) {
              next(err)
              res.status(400).send({
                status: 'BAD_REQUEST',
                error: err,
              })
            }
          }
        )
      return
    case 'DELETE':
      if (executeMiddleware)
        api.delete(
          route,
          middleware,
          async (req: Request, res: Response, next: NextFunction) => {
            try {
              await execute(req, res)
            } catch (err) {
              next(err)
              res.status(400).send({
                status: 'BAD_REQUEST',
                error: err,
              })
            }
          }
        )
      else
        api.delete(
          route,
          async (req: Request, res: Response, next: NextFunction) => {
            try {
              await execute(req, res)
            } catch (err) {
              next(err)
              res.status(400).send({
                status: 'BAD_REQUEST',
                error: err,
              })
            }
          }
        )
      return
    default:
      return
  }
}

export default router
