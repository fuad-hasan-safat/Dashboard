'use client'

import React, { useEffect, useState } from "react";
import LekhaPokaProfile from "../../common/lekhaProfile";
import SidebarPostDivider from "../../common/sidebarpostdivider";
import { fetchData } from "../../../function/api";
import { apiBasePath } from "../../../utils/constant";


const Samprotik = () => {

  const [samprotikPost, setSamprotikPost] = useState([])

  useEffect(() => {

    async function fetchDataAsync() {
      try {

        const result = await fetchData(
          `${apiBasePath}/recentpost`
        );
        console.log('samprotik ---->>', result);
        setSamprotikPost(result.posts);

      } catch (error) {

      }

    }

    fetchDataAsync();
  }, []);


  return (
    <>
      <div>
        <div>
          <h1 className="text-[18px] text-[#F9A106] font-semibold">সাম্প্রতিক</h1>
        </div>
        {samprotikPost.length > 0 ?
          <div className="pt-[23px]">
            {samprotikPost.length &&
              samprotikPost.map((item, index) => (
                <div key={index}>

                  <div key={index} className="pb-1">
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

                  <div className="pb-[14px]">
                    {index <= samprotikPost.length - 2 ? (
                      <SidebarPostDivider />
                    ) : (
                      ""
                    )}
                  </div>

                </div>

              ))}
          </div> :
          <div className="pt-10"> এই মুহূর্তে কোনো লেখা নেই
          </div>
        }
      </div>
    </>
  );
};

export default Samprotik;
