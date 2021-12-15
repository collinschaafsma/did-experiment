import React, { FC, useState } from 'react'
import { Center, Button } from '@chakra-ui/react'
import { ethers } from 'ethers'
import { SiweMessage, SignatureType } from 'siwe'
import Router from 'next/router'

declare global {
  interface Window {
      ethereum: { request: (opt: { method: string }) => Promise<Array<string>> }
      web3: unknown
  }
}

interface LoginProps {
  setAddress(arg: string): void 
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
    
    const nonce = await fetch('/api/nonce', { 
      credentials: 'include' 
    }).then((res) => res.text());

    const { chainId } = await provider.getNetwork()

    const message = new SiweMessage({
      domain: document.location.host,
      address,
      chainId: String(chainId),
      uri: document.location.origin,
      version: '1',
      statement: 'DID Experiment sig',
      type: SignatureType.PERSONAL_SIGNATURE,
      nonce,
    })

    message.signature = await provider.getSigner().signMessage(message.signMessage())

    const loginResponse = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ ens, message }),
      headers: { 'Content-Type': 'application/json', },
      credentials: 'include',
    })

    if(loginResponse.status === 200) {
      if(ens) {
        setAddress(ens as string)
      } else {
        setAddress(address)
      }
      setBtnVisible(false)
    } else {
      console.log(loginResponse)
    }

    setLoading(false)

    Router.reload()
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