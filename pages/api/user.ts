import type { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../lib/session'
import { User } from '../../lib/user'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  let user: User
  if(req.session.siwe) {
     user = {
      loggedId: true,
      address: req.session.siwe.address,
      ens: req.session.ens,
    }
  } else {
    user = {
      loggedId: false,
      address: '',
      ens: '',
    }
  }

  res.json({ user })
}

export default withIronSessionApiRoute(handler, sessionOptions)
