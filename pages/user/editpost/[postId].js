
import React from 'react'
import Head from 'next/head'
import EditPost from '../../../components/userprofile/EditPost';


export default function Createpost() {


    return (
        <>
            <div>
                <Head>
                    <title>লেখা সম্পাদন করুন</title>
                </Head>
            </div>
            <section className="all__post__sec__wrap">
                <div className="relative w-full xl:h-[330px] lg:h-[330px] md:h-[300px] sm:h-[230px] xs:h-[200px] -z-10  overflow-hidden" style={{ background: `url('/images/pages-banner-svg/baseBanner.png')center center / cover no-repeat` }}>
                    <h2 class=" absolute top-[50%] left-[50%] lg:text-[40px] md:text-[34px] sm:text-[30px] xs:text-[28px] text-[#F9A106] -translate-x-[50%] -translate-y-[50%] max-h-[0px]">লেখা সম্পাদন</h2>
                </div>
            </section>
            <section className="all__page__main__content">
                <div className="container">

                    <div className="lg:flex lg:flex-row lg:pt-[110px] md:pt-[90px] sm:pt-[40px] xs:pt-[40px]">
                        <div className="w-full">

                            {/* <CreatePost /> */}
                            <EditPost />

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
