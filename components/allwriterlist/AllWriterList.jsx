'use client'
import { apiBasePath } from '../../utils/constant';
import React, { useState, useEffect } from 'react'
import LekhokDetails from '../common/lekhok';
import SidebarPostDivider from '../common/sidebarpostdivider';
import { convertToBengaliDate } from '../../utils/convertToBanglaDate';

export default function AllWriterList() {

    const [lekhokList, setLekhokList] = useState([]);

    useEffect(() => {

        fetch(`${apiBasePath}/profilelist`)
            .then((response) => response.json())
            .then((data) => {
                setLekhokList(data);
                // console.log("-----------", setLekhokList);
            })
            .catch((error) => console.error("Error fetching data:", error));

    }, []);

    return (
        <div className='container'>
            <div className='mt-[50px]'>

                <div className='text-[26px] text-[#FCD200]'>

                    <p> লেখকদের তালিকা </p>
                    <hr className='bg-[#fcac00]'></hr>

                </div>

                {lekhokList.length > 0 ?

                    <div className="pt-[23px] ">

                        {lekhokList.length &&

                            lekhokList.map((item, index) => {
                                console.log('writer-->', item);
                                let banglaBirthdate = item?.birth_date ? convertToBengaliDate(item?.birth_date) : '';
                                let banglaExpiredate = item?.expiry_date ? convertToBengaliDate(item?.expiry_date) : '';

                                banglaBirthdate = banglaBirthdate || '';
                                banglaExpiredate = banglaExpiredate || '';

                                let lifeCycle = `${banglaBirthdate} থেকে  বর্তমান `;

                                if(!item?.birth_date){
                                  lifeCycle = '';
                                }


                                return (
                                    <div key={index}>

                                       {item?.birth_date && <>
                                        <div className="pb-3">

                                            <LekhokDetails
                                                key={index}
                                                image={`${apiBasePath}/${item.image?.slice(item.image.indexOf("/") + 1)}`}
                                                writer={item.name}
                                                writer_id={item._id}
                                                id={item._id}
                                                user_id={item._id}
                                                lifeCycle={lifeCycle}

                                            />
                                        </div>

                                        <div className="pb-3">
                                            {index <= lekhokList.length - 2 ? <SidebarPostDivider /> : ""}
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
        </div>
    )
}
