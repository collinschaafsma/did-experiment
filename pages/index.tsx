import type { NextPage } from 'next'
import Head from 'next/head'
import Login from '../components/Login'
import { Heading } from '@chakra-ui/react'
import { useState } from 'react'

const Home: NextPage = () => {
  const [address, setAddress] = useState('Anon')

  return (
    <div>
      <Head>
        <title>Decentralized Identity Experiment</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading>Hello {address}</Heading>
      <Login setAddress={setAddress}></Login>
    </div>
  )
}

export default Home
