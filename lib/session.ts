import type { IronSessionOptions } from 'iron-session'
import { SiweMessage } from 'siwe'

export const sessionOptions: IronSessionOptions = {
  cookieName: 'did-experiment',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
  password: process.env.SECRET_COOKIE_PASSWORD as string,
}

declare module 'iron-session' {
  interface IronSessionData {
    nonce: string | null
    siwe: SiweMessage
    ens: string
  }
}
