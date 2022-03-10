import { Express } from 'express'
import winston from 'winston'
import { Server } from '@src/server'
import { Knex } from 'knex'
import { MongoDB } from '@src/configs/databases/mongo'

import { GroupController } from '@src/controllers/group'
import { UsersController } from '@src/controllers/users'
import { DistrictController } from '@src/controllers/district'
import { ReportController } from '@src/controllers/report'
import { RequestController } from '@src/controllers/request'

import { IGroupService } from '@src/services/group'
import { IUsersService } from '@src/services/users'
import { IDistrictService } from '@src/services/district'
import { IReportService } from '@src/services/report'
import { IRequestService } from '@src/services/request'

import { IGroupRepository } from '@src/repositories/group'
import { IUsersRepository } from '@src/repositories/users'
import { IDistrictRepository } from '@src/repositories/district'
import { IReportRepository } from '@src/repositories/report'
import { IRequestRepository } from '@src/repositories/request'

interface Container {
  // CONFIGS --------------------------------------------
  /** API version */
  version: string
  /** Server port */
  port: number
  /** Enviornment */
  nodeEnv: string
  /** MongoDB connection string */
  mongoDBConnectionString: string

  // APP ------------------------------------------------
  app: Express
  logger: winston.Logger
  mongoDB: MongoDB
  server: Server

  // CONTROLLERS ----------------------------------------
  groupController: GroupController
  usersController: UsersController
  districtController: DistrictController
  reportController: ReportController
  requestController: RequestController

  // SERVICES -------------------------------------------
  groupService: IGroupService
  usersService: IUsersService
  districtService: IDistrictService
  reportService: IReportService
  requestService: IRequestService

  // REPOSITORIES ---------------------------------------
  groupRepository: IGroupRepository
  usersRepository: IUsersRepository
  districtRepository: IDistrictRepository
  reportRepository: IReportRepository
  requestRepository: IRequestRepository
}

export default Container
