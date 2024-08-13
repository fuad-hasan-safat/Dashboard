'use client'

import React, { useEffect, useState } from "react";
import { fetchData } from "../../../function/api";
import LekhaPokaProfile from '../../common/lekhaProfile'
import SidebarPostDivider from "../../common/sidebarpostdivider";
import { apiBasePath } from "../../../utils/constant";


const Jonopriyo = () => {

  const [jonopriyoData, setJanapriyoData] = useState([])

  useEffect(() => {

    async function fetchDataAsync() {

      try {
        const result = await fetchData(
          `${apiBasePath}/popularpost`
        );
        console.log("result     জনপ্রিয়    ->>>>>>>>>>>>>>>>", result);
        setJanapriyoData(result.posts);
      } catch (error) {
        console.log(error)
      }

    }

    fetchDataAsync();
  }, []);



  return (
    <>
      <div>
        <div>
          <h1 className="text-[18px] text-[#F9A106] font-semibold">জনপ্রিয়</h1>
        </div>
        {jonopriyoData.length > 0 ?
          <div className="pt-[23px]">
            {jonopriyoData.length &&
              jonopriyoData.map((item, index) => (
                <div key={index}>

                  <div className="pb-1">
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
                    {index <= jonopriyoData.length - 2 ? (
                      <SidebarPostDivider />
                    ) : (
                      ""
                    )}
                  </div>
                  
                </div>
              ))}
          </div> :

          <div className="pt-10"> এই মুহূর্তে কোনো লেখা নেই </div>

        }
      </div>
    </>
  );
};

export default Jonopriyo;
