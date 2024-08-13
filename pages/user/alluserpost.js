'use client'
import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar';
import ProfilePostLeftContentApproved from '../../components/userprofile/ProfilePostLeftContentApproved';
import ProfilePostLeftContentUnApproved from '../../components/userprofile/ProfilePostLeftContentUnapproved';
import Head from 'next/head';

export default function AllUserPost() {


  return (
    <>
      <div>
        <Head>
          <title>সকল</title>
        </Head>

        <section className="all__page__main__content">
          <div className="container">

            <div className="lg:flex lg:flex-row lg:pt-[110px] md:pt-[110px] sm:pt-[110px] xs:pt-[110px]">

              <div className="lg:w-[70%]">

                <div>
                  <ProfilePostLeftContentUnApproved />
                </div>

                <div className='mt-[50px]'>
                  <h1 className='lg:text-5xl md:text-3xl sm:text-xl xs:text-2xl text-black'>অনুমোদিত  পোস্ট </h1>
                  <ProfilePostLeftContentApproved />
                </div>

              </div>

              <div className="lg:w-[30%] flex flex-col ">
                <Sidebar />
              </div>

            </div>
            
          </div>
        </section>
      </div>
    </>
  )
}
