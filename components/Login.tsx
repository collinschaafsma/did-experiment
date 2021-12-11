import { Center, Button } from '@chakra-ui/react'

const Login = () => {
  const doLogin = () => {
    console.log('Do Login')
  }

  return (
    <Center paddingTop='40px'>
      <Button size='lg' border='2px' onClick={doLogin}>
        Login with Ethereum
      </Button>
    </Center>
  )
}

export default Login