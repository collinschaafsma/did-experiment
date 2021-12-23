import { useEffect } from 'react'
import Router from 'next/router'
import { User } from './user'
import useSWR from 'swr'

const userPath: string = '/api/user'
const fetcher = async () => {
  const response = await fetch(userPath)
  return response.json()
}

const useUser = ({ redirectTo = '' } = {}) => {
  const { data: user } = useSWR<User>(userPath, fetcher)

  useEffect(() => {
    if (!redirectTo || !user) return

    if (redirectTo && !user?.loggedIn) {
      Router.push(redirectTo)
    }
  }, [user, redirectTo])

  return { user }
}

export default useUser
