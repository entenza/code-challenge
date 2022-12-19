import 'dotenv'
import * as fs from 'fs';
import * as path from 'path'

import { createDatabase } from 'typeorm-extension';
import { getConnectionOptions, TreeRepository } from 'typeorm';
import { dirname, join } from 'path';

const buildOptions = () => {
  return {
    name: 'default',
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: process.env.POSTGRES_PORT || 5432,
    username: process.env.POSTGRES_DB_USER || 'postgres',
    password: process.env.POSTGRES_DB_PASS || 'postgres',
    database: process.env.POSTGRES_DB_NAME || 'postgres',
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

const buildOrmConfigJsonFile = async () => {
  const promise = new Promise( (resolve, reject) => {
    try {
      fs.writeFileSync('ormconfig.json', 
        JSON.stringify(buildOptions(), null, 2)
      );
      resolve(true)
    } catch (error) {
      reject(error);    
    }

  })

  return promise
}

const checkOrmFile = () => {
  const promise = new Promise( (resolve, reject) => {

    const path_env_file = path.join(__dirname, '..', 'ormconfig.json');
    
    try {
      if (fs.existsSync(path_env_file)) {
        resolve(true);
      }
      reject(false); 
    } catch (err) {
      reject(err);  
    }
  })

  return promise
}


export const checkDB = async () => {
  
  try {
    await buildOrmConfigJsonFile()
  } catch (error) {
    throw new Error('Error, there writing OrmConfigJson!')
  }

  try {
    await checkOrmFile();
  } catch (error) {
    throw new Error('Error, there is no Orm File created!' );
    
  }
  
  
  try {
    const options = await getConnectionOptions();
    await createDatabase({
      ifNotExist: true,
      options,
    });
  } catch (error) {
    throw new Error("Error, there writing OrmConfigJson!   " + error)
    
  }

  return true
}