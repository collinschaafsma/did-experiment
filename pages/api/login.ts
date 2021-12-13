import type { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../lib/session'

const handler = (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if(req.method !== 'POST') {
    res.status(405).send({message: 'POST Request only'})
  }

  if(!req.body.message) {
    res.status(422).send({message: 'message required in POST body'})
  }

  const message = req.body.message
  res.status(200).send({ message })
}

export default withIronSessionApiRoute(handler, sessionOptions)
