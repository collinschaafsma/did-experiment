import type { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../lib/session'

type ResponseData = {
  loggedIn: boolean
}

const handler = (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  req.session.destroy()
  res.status(205).json({ loggedIn: false })
}

export default withIronSessionApiRoute(handler, sessionOptions)
