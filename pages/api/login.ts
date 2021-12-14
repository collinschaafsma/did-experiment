import type { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../lib/session'
import { SiweMessage } from 'siwe'
import { providers } from 'ethers'
import { ConnectionInfo } from 'ethers/lib/utils'
import { chainUrl } from '../../lib/chain'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if(req.method !== 'POST') {
    res.status(405).json({message: 'POST Request only'})
  }

  if(!req.body.message) {
    res.status(422).json({message: 'message required in POST body'})
  }

  const { ens } = req.body
  const message = new SiweMessage(req.body.message);
  const providerConfig: ConnectionInfo = {
    headers: {
      Accept: '*/*',
      Origin: process.env.PROVIDER_ORIGIN as string,
      'Accept-Encoding': 'gzip, deflate, br',
      'Content=Type': 'application/json',
    },
    url: chainUrl(message.chainId),
    allowGzip: true,
  }

  const provider = new providers.JsonRpcProvider(
    providerConfig,
    Number.parseInt(message.chainId)
  )

  await provider.ready

  const validatedMessage: SiweMessage = await message.validate(provider)

  if(validatedMessage.nonce !== req.session.nonce) {
    res.status(422).json({message: 'nonce is invalid'})
  }

  req.session.siwe = validatedMessage
  req.session.ens = ens
  req.session.nonce = null
  await req.session.save()

  res.status(200).json({ 
    ens: req.session.ens,
    address: req.session.siwe.address,
    chainId: req.session.siwe.chainId, 
  })
}

export default withIronSessionApiRoute(handler, sessionOptions)
