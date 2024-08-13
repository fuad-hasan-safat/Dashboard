'use client'
import React, { useEffect, useState } from 'react'
import { apiBasePath } from '../../utils/constant';
import { useRouter } from 'next/router';
import LekhokDetails from '../common/lekhok';
export default function FollowerList({ showModal, handleClose, userId }) {
    const router = useRouter()
    const slug = router.query.slug;
    const [followerList, setFollowerList] = useState([])
    useEffect(() => {
        console.log('writer user id ---->>>', userId)
        fetch(`${apiBasePath}/followers/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                setFollowerList(data.follower_list);
                console.log("----------->>>>>>>>>>>>>>>>>   FOLLOWER list ------------------->>>>>>>>>>>", data);
                // console.log("-----------", setLekhokList);
            })
            .catch((error) => console.error("Error fetching data:", error));

    }, [router.query])
    return (
        router.isReady &&
        <div className={`${showModal === 'follower' ? 'block' : 'hidden'} fixed z-10 inset-0 overflow-y-auto flex items-center justify-center`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">

                        <div className="mt-3 flex flex-col text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 className="text-lg leading-6 font-medium text-[#F9A106]" id="modal-title">
                                আপনার ফলোয়ার তালিকা
                            </h3>
                            <div className="my-[25px] text-black">
                                {followerList.map((item, index) =>
                                    <div  key={index} className='pt-[11px]'>

                                        <LekhokDetails
                                            key={index}
                                            image={`${apiBasePath}/${item?.writer?.image?.slice(item?.writer?.image.indexOf("/") + 1)}`}
                                            writer={item?.writer?.name}
                                            writer_id={item?.writer?._id}
                                            id={item?.writer?._id}
                                            lifeCycle={`  ${item?.writer?.birth_date === null ? `` : `${item?.writer?.birth_date} `} থেকে  ${item?.writer?.expiry_date === null ? 'বর্তমান' : ` ${item?.writer?.expiry_date}`} `}

                                        />
                                    </div>

                                )}
                            </div>
                            <button
                                type="button"
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                                onClick={handleClose}
                            >
                                বাতিল
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}
