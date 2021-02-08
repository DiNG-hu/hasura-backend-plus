// ! Keep dotenv.config at the very beginning of the file!!!

import * as Dotenv from 'dotenv'


// Load '.env' file if production mode, '.env.<NODE_ENV>' otherwise
// const envFile =
//   process.env.NODE_ENV && process.env.NODE_ENV !== 'production'
//     ? `.env.${process.env.NODE_ENV}`
//     : '.env'

Dotenv.config({ path: '.env' })

import Boom from '@hapi/boom'

import { HASURA_ENDPOINT } from './application'
export * from './application'
export * from './authentication'
export * from './storage'

/**
 * * Check required settings, and raise an error if some are missing.
 */
if (!HASURA_ENDPOINT) {
  throw Boom.badImplementation('No Hasura GraphQL endpoint found.')
}
