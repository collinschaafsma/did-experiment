import { Center, Button } from '@chakra-ui/react'
import { ethers } from 'ethers'

const Login = () => {
  const doLogin = async () => {
    //eslint-disable-next-line
    const metamask = window.ethereum
    
    if (typeof metamask === undefined) throw Error('No metamask')

    await metamask.request({
      method: 'eth_requestAccounts',
    })

    let provider: ethers.providers.Web3Provider = new ethers.providers.Web3Provider(metamask)
    const [address] = await provider.listAccounts()

    if (!address) throw Error('No address')

    let ens: string | null = await provider.lookupAddress(address)

    if (ens) console.log(ens)

  }

  return (
    <Center paddingTop='40px'>
      <Button size='lg' border='2px' onClick={ () => doLogin() }>
        Login with Ethereum
      </Button>
    </Center>
  )
}

export default Login