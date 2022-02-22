import { router } from '../'
import { routes } from '../../src/routes/routes'
const core = () => {
  routes.map((route) => {
    router(
      route.route,
      route.method,
      route.execute,
      route.executeMiddleware ? route.executeMiddleware : undefined
    )
  })
}
export default core
