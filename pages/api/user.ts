import type { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../lib/session'
import { User } from '../../lib/user'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<User>
) => {
  let user: User
  if(req.session.siwe) {
     user = {
      loggedIn: true,
      address: req.session.siwe.address,
      ens: req.session.ens,
    }
  } else {
    user = {
      loggedIn: false,
      address: '',
      ens: '',
    }
  }

  res.json({ ...user })
}

export default withIronSessionApiRoute(handler, sessionOptions)
