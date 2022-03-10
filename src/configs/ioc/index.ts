import * as awilix from 'awilix'
import express from 'express'
import dotenv from 'dotenv'
import Container from './container'
import { Server } from '@src/server'

import logger from '@src/configs/logs/winston'
import { MongoDB } from '@src/configs/databases/mongo'

import { GroupController } from '@src/controllers/group'
import { UsersController } from '@src/controllers/users'
import { DistrictController } from '@src/controllers/district'
import { ReportController } from '@src/controllers/report'

import { GroupService } from '@src/services/group'
import { UsersService } from '@src/services/users'
import { DistrictService } from '@src/services/district'
import { ReportService } from '@src/services/report'

import { GroupRepository } from '@src/repositories/group'
import { UsersRepository } from '@src/repositories/users'
import { DistrictRepository } from '@src/repositories/district'
import { ReportRepository } from '@src/repositories/report'

export async function createContainer(): Promise<awilix.AwilixContainer<any>> {
  const container = awilix.createContainer()

  // CONFIGS ------------------------------------------------------------------------

  const envFound = dotenv.config()
  if (!envFound) {
    throw new Error('.env file not found')
  }

  const configs: awilix.NameAndRegistrationPair<Container> = {
    version: awilix.asValue(`${process.env.VERSION}`),
    port: awilix.asValue(
      process.env.PORT ? parseInt(process.env.PORT, 10) : 3001
    ),
    nodeEnv: awilix.asValue(`${process.env.ENV}`),
    mongoDBConnectionString: awilix.asValue(
      `${process.env.MONGODB_CONNECTION_STRING}`
    ),

    // APP ---------------------------------------------------------------------------
    app: awilix.asValue(express()),
    logger: awilix.asFunction(logger),
    mongoDB: awilix.asClass(MongoDB),
    server: awilix.asClass(Server),

    // CONTROLLERS -------------------------------------------------------------------
    groupController: awilix.asClass(GroupController),
    usersController: awilix.asClass(UsersController),
    districtController: awilix.asClass(DistrictController),
    reportController: awilix.asClass(ReportController),

    // SERVICES ----------------------------------------------------------------------
    groupService: awilix.asFunction(GroupService),
    usersService: awilix.asFunction(UsersService),
    districtService: awilix.asFunction(DistrictService),
    reportService: awilix.asFunction(ReportService),

    // REPOSITORIES ------------------------------------------------------------------
    groupRepository: awilix.asFunction(GroupRepository),
    usersRepository: awilix.asFunction(UsersRepository),
    districtRepository: awilix.asFunction(DistrictRepository),
    reportRepository: awilix.asFunction(ReportRepository),
  }

  container.register(configs)

  // ASYNC CONFIGS -------------------------------------------------------------------

  const mongoDB = container.resolve('mongoDB') as MongoDB
  await mongoDB.connect()

  return container
}

export default Container
