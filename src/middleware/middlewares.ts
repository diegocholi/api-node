function middlewares(req: any, res: any, next: any) {
  const authHeader = req.headers['authorization']

  if (!authHeader) return res.status(401).send({ error: 'Token inválido' })

  const parts = authHeader.split(' ')
  if (!(parts.length === 2))
    return res.status(401).send({ error: 'Token inválido' })

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: 'Token inválido' })

  return next()
}

export default middlewares
