'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { FileUploader } from "react-drag-drop-files";
import dynamic from 'next/dynamic';
import { apiBasePath } from '../../utils/constant';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomEditor = dynamic(() => {
  return import('../../components/custom-editor');
}, { ssr: false });

export default function EditPost() {

  const router = useRouter();
  const slug = router.query.postId;
  console.log({ router })

  let notification = ''

  const [fetchedPost, setFeathedPost] = useState([]);

  const [formData, setFormData] = useState();

  console.log({ formData })

  const [selectedOption, setSelectedOption] = useState('');
  const [category, setCategory] = useState([]);
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [audioPreview, setAudioPreview] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);






  useEffect(() => {

    console.log('9999999999999999999999999999999999999')

    fetchDataAsync();

    fetch(`${apiBasePath}/categories`)
      .then((response) => response.json())
      .then((data) => {
        setCategory(data);
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally();

  }, [router.query]);

  async function fetchDataAsync() {

    try {
      console.log('Inside try')
      const result = await axios.get(
        `${apiBasePath}/getpost/${slug}`
      );
      console.log('hello slug---', router)

      setFeathedPost(result.data.object)
      setFormData(result.data.object)
      setContent(result.data.object?.content)
      setPreview(result.data.object?.image)
      setAudioPreview(result.data.object?.audio)
      setSelectedOption(result.data.object.category)
      console.log('post page single postss EDIT ====================>>>>>>>>>>>>>>>>>>>>', result.data.object)
      if (result.data.object.audio?.length > 0) {
      } else {
      }

      if (result.data.status === 'success') {
      } else if (result.data.status === 'failed') {
      }

    } catch (error) {
      // setError(error)    
    } finally {
    }
  }




  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log({ name, value })
    setFormData({ ...formData, [name]: value });
  };

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#fff",
      border: "1px solid #ccc",
      color: "#000"
    }),
  };


  // Drop down category
  let Categoryoptions = [];
  let writersOptions = [];
  for (let i = 0; i < category.length; i++) {
    let data = { value: category[i]._id, label: category[i].title };
    // console.log('---data -----------'. data)
    Categoryoptions.push(data);
  }



  //  image handle
  const handleFileChange = (acceptedFiles) => {
    console.log({ acceptedFiles })

    if (acceptedFiles?.length > 0) {
      console.log('IS ARRAY ', acceptedFiles)
      // const imageFiles = acceptedFiles.map((file) => {
      //     return file.type.startsWith('image/');
      // });

      if (acceptedFiles[0].type.startsWith('image/')) {
        const file = acceptedFiles[0];
        if (file) {
          setImage(file);
          console.log({ file })
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result); // Set preview image
          };
          reader.readAsDataURL(file);
        }
      } else {
        // alert('ছবি আপলোড করুন')
        notification = 'ছবি আপলোড করুন';
        notify1();
      }

    }


  };

  const handleAudioFile = (acceptedFiles) => {
    console.log('file', acceptedFiles)
    if (acceptedFiles?.length > 0) {
      console.log('IS ARRAY ', acceptedFiles)
      // const imageFiles = acceptedFiles.map((file) => {
      //     return file.type.startsWith('image/');
      // });

      if (acceptedFiles[0].type.startsWith('audio/')) {
        const file = acceptedFiles[0];
        if (file) {
          setSelectedFile(file);
          console.log({ file })

        }
      } else {
        // alert('অডিও আপলোড করুন')
        notification = 'অডিও আপলোড করুন';
        notify1();
      }

    }


  }


  function reloadPage(){
    setTimeout(()=>{
        router.push(`/user/${localStorage.getItem("uuid")}`)
    }, 3000)
}


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Determine which fields have changed
    const changedData = {};

    const editFormData = new FormData();

    editFormData.append('title', formData?.title);
    editFormData.append('summary', formData?.summary);
    editFormData.append('content', content);
    editFormData.append('category', selectedOption);
    editFormData.append('status', false);


    if (image) {
      editFormData.append("image", image);
    }

    if (selectedFile) {
      editFormData.append("file", selectedFile);
    }

    try {
      console.log({})
      // const response = await axios.put(`${apiBasePath}/posts/${formData?._id}`, changedData);
      const response = await fetch(`${apiBasePath}/posts/${formData?._id}`, {
        method: "PUT",
        headers: {

        },
        body: editFormData,
      });

      // alert("আপনার লেখাটির আপডেট সম্পন্ন হয়েছে");
      notification = 'আপনার লেখাটির আপডেট সম্পন্ন হয়েছে, অনুমোদনের জন্য এডমিনের নিকট পাঠানো হয়েছে';

      reloadPage();
      console.log('edit response', response);
      // Handle successful update
    } catch (error) {
      console.error(error);
      // Handle error
    }
    notify1();

  };


  let postImage = preview;


  const notify = () => toast.success(notification, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const notify1 = () => toast.warn(notification, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,

  });


  return (
    router.isReady &&
    <>
      <div className="lg:pr-6 md:pr-0 sm:pr-0 space-y-4 lg:flex">
        <div className='create__post__rgt lg:w-[25%] lg:order-last'>
          <div className="text-[#F9A106] font-bold text-[20px] !mb-[5px]">আপনার লেখার ধরণ নির্বাচন করুন</div>
          {/* <p></p> */}
          <div>

            <select
              id="category"
              name="category"
              className={`h-[45px] w-full px-[16px] text-black border-[1px] border-[#ddd] rounded-[7px]`}
              required
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}>
              <option value="">লেখার ধরণ</option>
              {category.map((cat) => (
                <option key={cat._id} value={cat.title}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          <hr class="my-5 border-gray-200" />
          <div className='text-[#292D32]'>
            <div className='mb-[15px]'>
              <div className="text-[#F9A106] font-bold text-[20px] !mb-[2px]">ছবি আপলোড করুন (যদি থাকে)</div>
            </div>

            <FileUploader handleChange={handleFileChange} multiple={true} mimeTypes={['image/*']}
            >
              <div

                className='border-2 border-dashed border-[#F9A106] rounded-md h-[220px] items-center place-content-center text-center justify-center'>
                <div className='flex items-center justify-center'>
                  <img src='/images/user/image-plus-1.png' alt='Image Plus' />
                </div>
                <div className='create__border'>
                  <h1 className='pt-[5px] pb-[5px]'>এখানে ছবি ড্রাগ ড্রপ করুন </h1>
                  <img className='m-auto' src='/images/user/divider.png' alt='Divider' />
                </div>

                <label className=" cursor-pointer flex items-center justify-center" >
                  <div className="page__common__yello__btn mt-[15px]  file-btn w-[200px] h-[43px] text-[16px] " onClick={handleFileChange}>আপলোড</div>

                </label>
              </div>
            </FileUploader>

          </div>
          <div className='bg-[#EEF1F7] mt-[15px] rounded-[10px] p-[12px] w-full'>
            <div className='flex justify-between items-center'>
              <img className='m-auto pr-[10px] w-[40px] h-[35px]' src='/images/likhun/imagelogo.png' alt='image File ' />
              <div className='w-full'>
                {/* <strong className='block'>Kobitar Gan.mp3</strong> */}
                {image ? <p className='w-full text-[#292D32]'>{image ? `File name: ${image?.name?.slice(0, 20)}` : "কোন ছবি নির্বাচন করা হয়নি"}</p> :
                  <p className='w-full text-[#292D32]'>{preview?.length > 0 ? `File name: ${preview?.slice(preview?.indexOf('/'))}` : "কোন ছবি নির্বাচন করা হয়নি"}</p>}

                {/* <span className='flex justify-start items-center'>60 KB of 12O KB . <img className='m-auto pr-[10px]' src='../images/user/audio-icon.png' alt='Audio Icon ' /><strong>Uploading...</strong></span> */}
              </div>
            </div>
          </div>
          <hr class="my-5 border-gray-200" />
          <div className='text-[#292D32]'>
            <div className="text-[#F9A106] mt-[40px] font-bold text-[20px] !mb-[2px]">অডিও আপলোড করুন (যদি থাকে)</div>
            <FileUploader handleChange={handleAudioFile} multiple={true} mimeTypes={['audio/*']}
            >
              <div

                className='border-2 border-dashed border-[#F9A106] rounded-md h-[220px] items-center place-content-center text-center justify-center'>
                <div className='flex items-center justify-center'>
                  <img src='/images/user/image-audio.png' alt='Image Plus' />
                </div>
                <div className='create__border'>
                  <h1 className='pt-[5px] pb-[5px]'>এখানে অডিও ড্রাগ ড্রপ করুন </h1>
                  <img className='m-auto' src='/images/user/divider.png' alt='Divider' />
                </div>

                <label className=" cursor-pointer flex items-center justify-center" >
                  <div className="page__common__yello__btn mt-[15px]  file-btn w-[200px] h-[43px] text-[16px] " onClick={handleAudioFile}>আপলোড</div>

                </label>
              </div>
            </FileUploader>
            {/* <AudioFileUpload selectedFile={selectedFile} setSelectedFile={setSelectedFile} /> */}
          </div>
          <div className='bg-[#EEF1F7] mt-[15px] rounded-[10px] p-[12px] w-full'>
            <div className='flex justify-between items-center'>
              <img className='m-auto pr-[10px] w-[40px] h-[35px]' src='/images/likhun/imagelogo.png' alt='image File ' />
              <div className='w-full'>
                {/* <strong className='block'>Kobitar Gan.mp3</strong> */}
                {selectedFile ? <p className='w-full text-[#292D32]'>{selectedFile ? `File name: ${selectedFile?.name?.slice(0, 20)}` : "কোন অডিও নির্বাচন করা হয়নি"}</p> :
                  <p className='w-full text-[#292D32]'>{audioPreview?.length > 0 ? `File name: ${audioPreview?.slice(audioPreview?.indexOf('/'))}` : "কোন অডিও নির্বাচন করা হয়নি"}</p>}

                {/* <span className='flex audioPreview justify-start items-center'>60 KB of 12O KB . <img className='m-auto pr-[10px]' src='../images/user/audio-icon.png' alt='Audio Icon ' /><strong>Uploading...</strong></span> */}
              </div>
            </div>
          </div>
        </div>
        <div className='create__post__lft lg:pr-[100px] lg:w-[75%] lg:order-first'>
          <div className="text-[#F9A106] font-bold text-[20px] !mb-[2px]">লেখার শিরোনাম</div>

          <input style={{ marginTop: '0' }}
            onChange={handleChange}
            value={formData?.title}
            className="w-full h-[62px] !mt-0 p-4 bg-[#FCF7E8] border-solid border-slate-800 rounded-[8px] text-[#00000080] leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            name="title"
            placeholder="শিরোনাম"
            required
          />
          <div className="text-[#F9A106] font-bold text-[20px] !mt-[30px] !mb-[2px]">সারসংক্ষেপ</div>
          <textarea
            onChange={handleChange}
            value={formData?.summary}
            className="w-full h-[200px] p-4 !mt-0 bg-[#FCF7E8] border-solid border-slate-800 text-gray-700 rounded-[8px] leading-tight focus:outline-none focus:shadow-outline"
            id="summary"
            type="textarea"
            name="summary"
            placeholder="লেখার মূল ভাবার্থ লিখুন"
            required
          />

          <div className="text-[#F9A106] font-bold text-[22px] !mt-[30px] !mb-[2px]">মূল লেখা</div>


          <div>
            <CustomEditor
              initialData={content}
              setContent={setContent}
            />
          </div>

          <div className='submit__btn flex  !mt-[40px]'>
            <div className='w-[50%] pr-[12px]'>
              <button
                onClick={handleSubmit}
                className="page__common__yello__btn hover:text-gray-700 w-full px-[20px] h-[50px] text-[#FCA000] border border-[#FCA000] border-spacing-1 rounded-md text-[16px] items-center profile__btn__midl"
              >
                পোস্ট আপডেট করুন
              </button>
              <ToastContainer />
            </div>
          </div>
        </div>

        <hr class="my-4 border-gray-200" />
      </div>
    </>
  )
}
