'use client'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { apiBasePath } from '../../../../utils/constant';
import LekhokDetails from '../../../common/lekhok';
import SidebarPostDivider from '../../../common/sidebarpostdivider';
import { convertToBengaliDate } from '../../../../utils/convertToBanglaDate';

export default function AudioSidebarLekhok() {
    const router = useRouter()

    const [lekhokList, setLekhokList] = useState([]);
    let getVisibleWriters = ''

    useEffect(() => {

        fetch(`${apiBasePath}/profilelist`)
            .then((response) => response.json())
            .then((data) => {
                setLekhokList(data);
                getVisibleWriters(data?.slice(0,4))
            })
            .catch((error) => console.error("Error fetching data:", error));

    }, []);


    function allWriterHandler() {
        router.push(`/allwriter`)
    }






    return (
        <>
            <div>
                {lekhokList.length > 0 ?
                    <div className="pt-[23px] ">

                        {lekhokList?.length > 0 &&
                            lekhokList?.slice(0,4)?.map((item, index) => {
                                const banglaBirthdate = item?.birth_date ? convertToBengaliDate(item?.birth_date) : '';
                                const banglaExpiredate = item?.expiry_date ? convertToBengaliDate(item?.expiry_date) : '';

                                let lifeCycle = `${banglaBirthdate} থেকে  বর্তমান `;

                                if(!item?.birth_date){
                                  lifeCycle = '';
                                }

                                return (

                                    <div key={index}>
                                      { item?.birth_date && <>
                                        <div className="pb-3">
                                            <LekhokDetails
                                                image={`${apiBasePath}/${item.image?.slice(item.image?.indexOf('/')+1)}`}
                                                writer={item.name}
                                                writer_id={item._id}
                                                id={item._id}
                                                user_id={item._id}
                                                lifeCycle={lifeCycle}
                                            />
                                        </div>
                                        <div className="pb-3">
                                            {index < lekhokList.length - 1 ? (
                                                <SidebarPostDivider />
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                        </>
                        }
                                    </div>

                                )

                            })}
                    </div> :
                    <div className="pt-10"> লেখক নেই </div>

                }

            </div>
        </>
    );
}
