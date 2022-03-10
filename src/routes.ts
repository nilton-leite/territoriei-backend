import { Router } from 'express'

// Controllers
import { UsersController } from './controllers/users'
import { GroupController } from './controllers/group'
import { DistrictController } from './controllers/district'
import { ReportController } from './controllers/report'
import { RequestController } from './controllers/request'

interface Controllers {
  usersController: UsersController
  groupController: GroupController
  districtController: DistrictController
  reportController: ReportController
  requestController: RequestController
}

export default async ({
  usersController,
  groupController,
  districtController,
  reportController,
  requestController,
}: Controllers) => {
  const router = Router()

  // Users routes
  router.post('/users', usersController.create.bind(usersController))
  router.get(
    '/user/validate',
    usersController.validateRegister.bind(usersController)
  )
  router.post('/login', usersController.login.bind(usersController))

  // Group routes
  router.post('/group', groupController.create.bind(groupController))
  router.get('/group', groupController.get.bind(groupController))

  // District routes
  router.post('/district', districtController.create.bind(districtController))
  router.get('/district', districtController.get.bind(districtController))

  // Report routes
  router.post('/report', reportController.create.bind(reportController))
  router.get('/report', reportController.get.bind(reportController))
  router.get('/report/:id', reportController.getById.bind(reportController))

  // Request routes
  router.post('/request', requestController.create.bind(requestController))
  router.get('/request', requestController.get.bind(requestController))
  return router
}
