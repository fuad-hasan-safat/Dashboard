"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Sidebar from "../../components/sidebar/Sidebar";

import FullPost from '../../components/common/fullContent'
import { fetchData } from "../../function/api";
import AudioPlayer from '../../components/musicbar/AudioPlayer'
import RatingComponent from '../../components/common/starRating'
import { apiBasePath } from "../../utils/constant";
import Loading from "../../components/common/loading";


export default function PostDetails() {
  const router = useRouter();
  const { slug } = router.query;
  //console.log("----slug-------", slug);

  const [data, setData] = useState([]); // State to store fetched data
  const [isLoading, setIsLoading] = useState(true); // State to store any errors




  useEffect(() => {
    console.log("in side use effect slug", slug);
    async function fetchDataAsync() {
      try {
        const result = await fetchData(
          `${apiBasePath}/getslider/${slug}`
        );
        console.log("result         ->>>>>>>>>>>>>>>>", result.object.post);
        console.log({slug, result})
        setData(result.object.post);
        setIsLoading(false)
        router.push(`/post/${result.object.post._id}`)
        setIsLoading(false)
        console.log('data -------------- slider  -------------- slider >>>>>', data)
      } catch (error) {

        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDataAsync();

  }, [router.query]);

  //console.log('----DDDDDDDDD AAAAAAAAA TTTTTTTT AAAAAAAAAAA-------', data)

  return (
    <section className="pt-[95px]">
      {isLoading &&
        <Loading />
      }
      {
        <div className="lg:flex lg:flex-row">
          <div className="lg:w-[70%] text-black text-center text-3xl py-[100px]">
            {/* সাময়িক অসুবিধার জন্য দুঃখিত */}
          </div>
          <div className="lg:w-[30%]">
            <Sidebar />
          </div>

        </div>


      }
    </section>
  );
}
