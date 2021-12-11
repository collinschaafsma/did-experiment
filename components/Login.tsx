import React, { FC, useState } from 'react'
import { Center, Button } from '@chakra-ui/react'
import { ethers } from 'ethers'

interface LoginProps {
  setAddress(arg: string): void; 
}

const Login: FC<LoginProps> = ({ setAddress }) => {
  const [loading, setLoading] = useState(false)
  const [btnVisible, setBtnVisible] = useState(true)

  const doLogin = async () => {
    setLoading(true);
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

    if (ens) {
      setAddress(ens)
    } else {
      setAddress(address)
    }

    setBtnVisible(false)
  }

  return (
    <Center paddingTop='40px'>
      {
        btnVisible && (
          <Button 
            size='lg' 
            border='2px' 
            isLoading={loading}
            loadingText='Connecting'
            spinnerPlacement='end'
            onClick={ () => doLogin() }
          >
            Login with Ethereum
          </Button>
        )
      }
    </Center>
  )
}

export default Login