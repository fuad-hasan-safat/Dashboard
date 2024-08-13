import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import Head from 'next/head';
import FullPost from '../../components/common/fullContent'
import RatingComponent from '../../components/common/starRating'
import { apiBasePath } from "../../utils/constant";
import ReaderModeModal from "../../components/readerMode/ReaderModeModal";
import FullPostReaderMode from "../../components/common/fullContentReadermood";
import { AudioPlayListContext } from "../../components/store/audioPlayer-context";


export async function getServerSideProps(context) {

  const { slug } = context.params;
  let postData;

  try {
    const res = await fetch(`${apiBasePath}/getpost/${slug}`)
    postData = await res.json()

    console.log('single post data', postData);

  } catch (error) {
    postData = {
      status:'failed'
    }
  }


  return { props: { postData } }
}

export default function PostDetails({ postData }) {
  const router = useRouter();
  const slug = router.query.slug;
  const { asPath } = router;

  console.log({ postData })

  const { toggleAudioPlay, audioPlace, currentPlayingIndex, isAudioPlaying } = useContext(AudioPlayListContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const data = postData.object;
  const writerImage = postData?.writer_image;
  const uploaderName = postData?.uploader_name;
  const profileName = postData?.profile_name;
  let isAudioAvailable = postData.object?.audio ? true : false;
  let isdataFetch = postData?.status === "success" ? true : false;


  //  focus mood ----

  const [rating, setRating] = useState(0);


  function readMoodHandler(postId) {
    router.push(`/post/readermood/${postId}`)
  }

  function readerModeClosehandler() {
    setIsModalOpen(false);
    // router.reload()
  }

  function removeHtmlTags(str) {
    return str?.replace(/<\/?[^>]+(>|$)/g, "");
  }


  // select image

  let selectedCoverImage = postData?.writer_image;

  if (postData?.object?.image) {
    selectedCoverImage = data?.image;
  }

  let pageTitle = data?.title
  let withoutTagDes = removeHtmlTags(data?.content?.slice(0, 700))
  console.log({ withoutTagDes })
  let description = withoutTagDes;
  let postLink = `https://lekharpoka.com${asPath}`;
  let imageLink = `https://api.lekharpoka.com/${selectedCoverImage?.slice(selectedCoverImage?.indexOf('/') + 1)}`
  console.log({ pageTitle, description, postLink, imageLink })

  let audioList = [];

  if (isAudioAvailable) {
    audioList = [
      {
        id: data?._id,
        title: data?.title,
        audio: `${data?.audio}`,
        writer: data?.writer,
        image: `${writerImage}`,
      }
    ]

  }

  return (

    <>

      <div>
        <Head>

          <title>{data?.title}</title>
          <meta property="og:title" content={pageTitle} key="og:title" />
          <meta property="og:description" content={`${description} #lekharpoka`} />
          <meta property="og:image" content={imageLink} key="og:image" />
          <meta property="og:url" content={postLink} />
          <meta property="og:type" content="website" key="og:type" />
          <meta name="twitter:card" content={imageLink} />
          <meta name="twitter:title" content={pageTitle} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={imageLink} />

        </Head>
      </div>
      <div className=" body__control" >
        <div className="all__post__content__overlay">
          <section className="banner-sec-wrap place-content-center">
            <div className="banner__bg__sm__wrap relative w-full xl:h-[190px] lg:h-[180px] md:h-[180px] sm:h-[180px] xs:h-[170px]  overflow-hidden" style={{ background: `url('/images/pages-banner-svg/baseBanner.png')center center / cover no-repeat` }}>
              {<h2 className=" absolute lg:text-[40px] md:text-[38px] sm:text-[35px] xs:text-[25px] text-[#F9A106]">{data?.category}</h2>}
            </div>
          </section>
          <section className="all__post__main__content">
            <div className="container">
              <div className="lg:flex lg:flex-row">
                {(
                  <div className="flex flex-col w-full ">
                    {isdataFetch &&
                      <>
                        <div className="kobita__dsc__lft relative flex lg:mb-[110px] md:mb-[84px]">
                          <div>
                            <FullPost
                              id={slug}
                              content={data?.content}
                              title={data?.title}
                              writer={data?.writer}
                              writer_id={data?.writer_id}
                              image={selectedCoverImage}
                              uploadedBy={data?.uploaded_by}
                              writer_image={writerImage}
                              profileName={profileName}
                              updatedAt={data?.updatedAt}
                              catagory={data?.category}
                              url={asPath}
                            />

                            {isAudioAvailable && (
                              <div className="audio__tab__playbutton absolute  lg:left-[15px] md:left-[15px] sm:left-[15px] xs:left-[12px]  lg:top-[150px] md:top-[140px] sm:top-[130px] xs:top-[110px]">
                                <button  className="text-center text-[#F9A106]  flex justify-center items-center" onClick={() => toggleAudioPlay(0, audioList, slug)}>
                                 <span className="inline-block text-[24px]"> {isAudioPlaying && 0 === currentPlayingIndex && audioPlace === slug ? <i class="ri-pause-circle-fill"></i> : <i class="ri-play-circle-fill"></i>}</span> <span className="inline-block font-[600] text-[14px]"> প্লে করুন</span> 
                                </button>
                              </div>

                            )}

                          </div>
                          <div>
                            <button onMouse className="absolute  w-[35px] h-[35px] right-2 mt-[5px] text-white rounded-xl bg-orange-400" onClick={() => setIsModalOpen(true)}><i class="ri-book-read-fill text-[22px]"></i></button>
                          </div>




                        </div>
                        <div className="rating__share__wrap">
                          <button
                            className="facebook__share bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded flex items-center"
                            onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=https://lekharpoka.com/post/${slug}`, '_blank')}>
                            <i class="ri-facebook-circle-fill mr-[4px]"></i> শেয়ার করুন
                          </button>

                          {/* <ShareOnFacebook url={`lekharpoka.com/post/${slug}`} title={'লেখার পোকায় আপনাকে স্বাগতম'} image={''} /> */}
                          <RatingComponent setRating={setRating} rating={rating} post_id={data?._id} />
                        </div>
                      </>
                    }
                    {!isdataFetch &&
                      <>
                        <div className="text-black text-2xl mb-[75px] h-[100vh]">
                          আপনার অনুসন্ধানকৃত লেখাটি পাওয়া যাচ্ছে না !
                        </div>
                      </>
                    }
                  </div>

                )

                }
                {/* <div className="kobita__dsc__rgt lg:w-[30%]">
              <Sidebar />
            </div> */}
              </div>
            </div>


          </section>

        </div>


        <ReaderModeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <section className="read__mod__sec__wrap py-[100px] pb-[470px]" onCopy={(e) => { e.preventDefault(); alert('এই ওয়েবসাইটের যেকোনো লেখা আমাদের অনুমতি ছাড়া কপি করলে আইনগত ব্যবস্থা গ্রহণ করা হবে।') }}>
            <div className="read__mod__wrap">
              <div className="read__mod__btn">
                <button className="w-[40px] h-[40px] text-white rounded-full bg-orange-400" onClick={readerModeClosehandler}><i class="ri-close-large-fill"></i></button>
              </div>
              <div className="read__mod__innr">
                <FullPostReaderMode
                  title={data?.title}
                  writer={data?.writer}
                  writer_id={data?.writer_id}
                  catagory={data?.category}
                  content={data?.content}
                />
              </div>
            </div>
          </section>

        </ReaderModeModal>



      </div>
    </>
  );
}
