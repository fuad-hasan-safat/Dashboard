import React from 'react'
import { convertToBengaliNumerals } from '../../utils/convertToBanglaDate'

export default function UserAchivement({
    setProfileController,
    apprevedPost = 0,
    follower = 0,
    following = 0,
    unApprovedPost }) {

        const banglaFollowing = convertToBengaliNumerals(following);
        const banglaFollower = convertToBengaliNumerals(follower)
        const banglaNumOfPost = convertToBengaliNumerals(apprevedPost)

    return (
        <>
            <div className="flex flex-row divide-x text-[#484848] lg:text-[20px] md:text-[17px] sm:text-[15px] xs:text-[12px]  place-content-center items-center m-auto">

                <div className="cursor-default text-center pr-[22px] pt-[15px] pb-[15px]">
                    <h1 className='text-[32px] text-[#F9A106]'>{banglaNumOfPost}</h1>
                    <h1>পোস্ট</h1>
                </div>

                <button
                    onClick={() => setProfileController('follower')}
                    className="cursor-default px-[22px] text-center pt-[15px] pb-[15px]">

                    <h1 className='text-[32px] text-[#F9A106]'>{banglaFollower || '0'}</h1>
                    <h1>ফলোয়ার</h1>
                </button>
                <button
                    onClick={() => setProfileController('following')}
                    className="cursor-default pl-[22px] text-center pt-[15px] pb-[15px]">
                    <h1 className='text-[32px] text-[#F9A106]'>{banglaFollowing || '0'}</h1>
                    <h1>ফলোয়িং</h1>
                </button>
                {/* <div className="pl-2 text-center">
                    <h1>{unApprovedPost}</h1>
                    <h1>অনুমোদনহীন পোস্ট</h1>
                </div> */}
            </div>
        </>
    )
}
