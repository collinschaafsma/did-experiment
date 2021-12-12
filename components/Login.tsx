import React, { FC, useState } from 'react'
import { Center, Button } from '@chakra-ui/react'
import { ethers } from 'ethers'
//import { SiweMessage, SignatureType } from 'siwe'

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

    const nonce = await fetch('/api/nonce', { 
      credentials: 'include' 
    }).then((res) => res.text());
    console.log(nonce)

    const { chainId } = await provider.getNetwork()
    console.log(chainId)

    // const message = new SiweMessage({
    //   domain: document.location.host,
    //   address,
    //   chainId: String(chainId),
    //   uri: document.location.origin,
    //   version: '1',
    //   statement: 'DID Experiment sig',
    //   type: SignatureType.PERSONAL_SIGNATURE,
    //   nonce,
    // })

    // const signature = await fetch('/api/signature', {
    //   method: 'POST',
    //   body: JSON.stringify({ message }),
    //   headers: { 'Content-Type': 'application/json' },
    //   credentials: 'include',
    // }).then((res) => res.text());

    // message.signature = await provider.getSigner().signMessage(signature)
    // console.log(signature)

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