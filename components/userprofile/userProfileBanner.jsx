
import React, { useState } from 'react'
import { apiBasePath } from '../../utils/constant'
import ImageCrop from './cropComponents/ImageCrop'
import ImageCropProvider from './cropComponents/ImageCropProvider'
import UserAchivement from './userAchivement'
import { countWords } from '../../function/api'
import ProfileModal from './profileUpdate/ProfileModal'
import { convertToBanglaPhoneNumber, convertToBengaliDate } from '../../utils/convertToBanglaDate'

export default function UserProfileBanner({
    bio,
    profileInfo,
    profileName,
    approvedPost,
    unapprovedPost,
    profileStatus,
    profileStats,
    setProfileController,
}) {
    const selectedBio = countWords(bio, 55);
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);

    const banglaBirthDate = convertToBengaliDate(profileInfo?.dob)

    const banglaGender = profileInfo?.gender === 'male' ? 'পুরুষ' : 'নারী';

    const banglaPhoneNumber = convertToBanglaPhoneNumber(profileInfo?.phone)

    let defaultImage = '/images/defaultUserPic/userProfile.png';
    if(profileInfo?.gender === 'male'){
        defaultImage = '/images/defaultUserPic/rounded/male.png';
    }else if(profileInfo?.gender === 'famale'){
        defaultImage = '/images/defaultUserPic/rounded/famel.png';
    }

    return (
        <div className='container border'>
            <div className="flex justify-center">
                <img
                    className="lg:w-[240px] lg:h-[240px]  md:w-[200px] md:h-[200px] sm:w-[180px] sm:h-[180px] xs:w-[180px] xs:h-[180px] rounded-full  border-4 border-solid border-white -mt-[110px]  "
                    src={profileInfo?.image?.length > 0 ? `${apiBasePath}/${profileInfo?.image.slice(profileInfo?.image.indexOf("/") + 1)}` : defaultImage}
                />
               
            </div>
            <h1><span className='text-[35px] font-bold text-[#FCD200]'>{profileInfo?.name}</span> <span className='text-[#595D5B] pl-[20px] text-[22px]'>{profileInfo?.designation}</span></h1>

            <ul className='profile__info__wrap flex flex-row text-[#737373] text-[20px] lg:mt-[10px]'>


                <li>
                    {profileInfo?.dob?.length > 0 && <>  <span className='text-[#F9A106]'><img src='/images/usericons/birthdate.svg' /></span> <span className='text-[#737373]'>{banglaBirthDate}</span> </>}
                </li>

                <li>
                    {profileInfo?.gender?.length > 0 && <> <span className='text-[#F9A106] ml-[30px]'>{profileInfo?.gender === 'male' ? <img src='/images/usericons/sexicon.svg' /> : <img src='/images/usericons/sexicon.svg' />}</span> <span className='capitalize text-[#737373]'>{banglaGender}</span> </>}
                </li>

            </ul>

            <ul className='profile__info__wrap text-[#737373] text-[20px] pb-[30px]'>

                <li>
                    {profileInfo?.address?.length > 0 && <> <span className='text-[#F9A106]'><img src='/images/usericons/location.svg' /></span> <span className='text-[#737373]'>{profileInfo?.address}</span></>}
                </li>

                <li>
                    {profileInfo?.phone?.length > 0 && <> <span className='text-[#F9A106] '><img src='/images/usericons/phone.svg' /></span> <span className='text-[#737373] '>+{banglaPhoneNumber}</span> </>}
                </li>

                <li>
                    {profileInfo?.email?.length > 0 && <>  <span className='text-[#F9A106]'><img src='/images/usericons/email.svg' /></span> <span className='text-[#737373] '>{profileInfo?.email}</span> </>}
                </li>
            </ul>

            <hr></hr>


            <div className='mt-[44px] mb-[44px] flex justify-center'>
                <UserAchivement
                    setProfileController={setProfileController}
                    follower={profileStats?.follower}
                    following={profileStats?.following}
                    apprevedPost={approvedPost}
                    unApprovedPost={unapprovedPost} />
            </div>

            <hr></hr>

            {selectedBio.length > 0 && <>
                <h1 className='mt-[35px] text-[#F9A106] font-semibold text-[20px]'>সংক্ষিপ্ত বায়ো</h1>
                <p className='text-[16px] text-[#737373] mt-[10px]'>{selectedBio}</p>
            </>}

            <div className='w-full'>
                <button onClick={() => setShowModal(true)} className='page__common__yello__btn w-full bg-[#F9A106] text-white rounded-[5px] px-[75px] py-[17px] mt-[30px] mb-[40px]'>সম্পাদন করুন</button>

            </div>
            {<ProfileModal setShowModal={setShowModal} image={profileInfo?.image || ''} showModal={showModal} handleClose={handleClose} />}

        </div>
    )
}
