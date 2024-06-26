import Head from 'next/head'
import React from 'react'
import { Header } from './Header'

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <div className='flex min-h-screen justify-center bg-gray-50 py-5'>
        <div className='hidden md:block md:basis-2/12' />
        <div className='mx-2 md:basis-8/12'>{children}</div>
        <div className='hidden md:block md:basis-2/12' />
      </div>
    </>
  )
}
