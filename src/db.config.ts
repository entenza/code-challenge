import 'dotenv'
import * as fs from 'fs';
import * as path from 'path'

import { createDatabase } from 'typeorm-extension';
import { DataSourceOptions, getConnectionOptions, TreeRepository } from 'typeorm';
import { dirname, join, parse } from 'path';

const buildOptions = () : DataSourceOptions => {
  return {
    name: 'default',
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_DB_USER,
    password: process.env.POSTGRES_DB_PASS,
    database: process.env.POSTGRES_DB_NAME,
    synchronize: true,

    // entities: ['src/**/*.entity{.ts}'],

    // migrations: ['src/db/migrations/*{.ts}'],
    // migrationsTableName: 'migrations',
    // migrationsRun: true,
    logging: false,
    // logger: 'file',
    // keepConnectionAlive: true,
    // cli: {
    //   migrationsDir: 'dist/src/db/migrations',
    // },
  };
}

export const checkDB = async () => {
  
  try {
    const options = buildOptions()
    
    await createDatabase({
      ifNotExist: true,
      options,
    });
  } catch (error) {
    throw new Error("Error, there writing OrmConfigJson!   " + error)
    
  }

  return true
}