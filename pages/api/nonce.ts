import type { NextApiRequest, NextApiResponse } from 'next'
import { generateNonce } from 'siwe'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../lib/session'

const handler = (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const nonce = generateNonce()
  req.session.nonce = nonce
  req.session.save()
  res.json(nonce)
}

export default withIronSessionApiRoute(handler, sessionOptions)
