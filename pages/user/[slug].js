import React from 'react'
import UserProfile from '../../components/userprofile/UserProfile'
import { useRouter } from 'next/router';
import Head from 'next/head';



export default function Home() {
  const router = useRouter()
  const slug = router.query.slug;

  return (
    router.isReady &&
    <>
      {/* <div>
        <head>
          <title>প্রোফাইল</title>
        </head>
      </div> */}
      <div className=''>
      <Head>
        <title>প্রোফাইল</title>
        {/* Other meta tags or link elements can be added here */}
      </Head>
        <UserProfile slug={slug} />
      </div>
    </>
  )
}
