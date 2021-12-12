import type { NextApiRequest, NextApiResponse } from 'next'
import { SiweMessage } from 'siwe'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../lib/session'

const handler = (
  req: NextApiRequest,
  res: NextApiResponse
) => {

}

export default withIronSessionApiRoute(handler, sessionOptions)
