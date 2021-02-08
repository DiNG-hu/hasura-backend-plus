import { Request, Response } from 'express'
import Boom from '@hapi/boom'
import { asyncWrapper, selectUserByUserId} from '../../shared/helpers'
import { getClaims } from '../../shared/jwt'

async function accountMe(req: Request, res: Response): Promise<unknown> {
  const claims = getClaims(req.headers.authorization);
  if (claims === undefined) {
    throw Boom.badRequest('Incorrect JWT Token')
  }
  const user = await selectUserByUserId(claims['x-hasura-user-id'])

  if (!user) {
    throw Boom.badRequest('Account does not exist.')
  }

  return res.send({
    user
  })
}

export default asyncWrapper(accountMe)
