'use client'

import React, { useEffect, useState } from "react";
import LekhaPokaProfile from "../../common/lekhaProfile";
import SidebarPostDivider from "../../common/sidebarpostdivider";
import { fetchData } from "../../../function/api";
import { apiBasePath } from "../../../utils/constant";


const Somosamoyik = () => {
    
const [somosamoyikPost, setSomosamoyikPost] = useState([])

useEffect(() => {

  async function fetchDataAsync() {

    try {
      const result = await fetchData(
        `${apiBasePath}/contemporarypost`
      );

      console.log('somosamoyik ---->>', result);
      setSomosamoyikPost(result.posts);

    } catch (error) {
      //alert(error)
      console.log(error)
    }
  }

  fetchDataAsync();

}, []);



  return (
    <>
      <div className="">
        <div>
          <div className="text-[18px] text-[#F9A106] font-semibold ">
           <p>সমসাময়িক</p> 
          </div>
        </div>
        {somosamoyikPost.length>0?
        <div className="pt-[23px]">
          {somosamoyikPost.length &&
            somosamoyikPost.map((item, index) => (
              <div key={index}>
               
                <div key={index} className="pb-1 ">
                  <LekhaPokaProfile
                   image={item.image}
                   title={item.title}
                   writer={item.writer}
                   writer_id={item.writer_id}
                   id={item._id}
                   star={item.rating}
                   uploaded_by= {item.uploaded_by}
                  />
                </div>

                <div className="pb-3">
                  {index <= somosamoyikPost.length - 2 ? (
                    <SidebarPostDivider />
                  ) : (
                    ""
                  )}
                </div>
                
              </div>
            ))}
        </div>:
                <div className="pt-10"> এই মুহূর্তে কোনো লেখা নেই
                </div>

}
      </div>
    </>
  );
};

export default Somosamoyik;
