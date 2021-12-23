import { FC } from 'react'
import { Button, Center } from '@chakra-ui/react'
import Router from 'next/router'

const Logout: FC = () => {
  const doLogout = async () => {
    await fetch('/api/logout', {
      credentials: 'include',
    })

    Router.reload()
  }

  return (
    <Center paddingTop="40px">
      <Button size="lg" border="2px" onClick={() => doLogout()}>
        Logout
      </Button>
    </Center>
  )
}

export default Logout
