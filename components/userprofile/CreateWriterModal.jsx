import { useState } from 'react';
import { apiBasePath } from '../../utils/constant';
import ImageCropProvider from './cropComponents/ImageCropProvider';
import ImageCrop from './cropComponents/ImageCrop';

const CreateWriterModal = ({ showModal, handleClose, setIsWriterAdded }) => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [deathDate, setDeathDate] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('birth_date', birthDate);
    formData.append('expiry_date', deathDate);
    formData.append('file', image);


    setName('')
    setBirthDate('')
    setDeathDate('')
    setImage(null)

    try {
      const response = await fetch(`${apiBasePath}/writers`, {
        method: 'POST',
        body: formData
      });
      setIsWriterAdded(true)

     

      handleClose();

      // if (response.ok) {
      //   console.log('Writer created successfully');
      //   handleClose();
      // } else {
      //   console.error('Failed to create writer');
      // }
    } catch (error) {
      console.error('Error creating writer:', error);
    }
  };

  return (
    <div className={`${showModal ? 'block' : 'hidden'} fixed z-[9999999999] inset-0 overflow-y-auto flex items-center justify-center`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full xs:max-w-lg xs:w-full ">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">

            <div className="mt-3 w-full ml-0 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-[20px] leading-6 font-medium text-gray-900" id="modal-title">
                নতুন রাইটার ক্রিয়েট করুন
              </h3>
              <div className="my-[20px] w-full">
                <form onSubmit={handleSubmit}>
                  <div className="mb-[10px] profile__date text-[14px]">
                    <label className="block text-gray-700  font-bold mb-2" htmlFor="name">
                      নাম
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                      placeholder="নাম"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-[10px] profile__date">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="birthDate">
                      জন্ম তারিখ
                    </label>
                    <input
                      className="shadow appearance-none border rounded bg-transparent  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="birthDate"
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      required

                    />
                    {/* <span className='absolute text-gray-700 right-[195px] pt-[8px] '>mm/dd /yyyy</span> */}
                  </div>
                  <div className="mb-[10px] profile__date w-full">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="deathDate">
                      মৃত্যু তারিখ
                    </label>
                    <input
                      className="shadow deathDateInput bg-transparent appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="deathDate"
                      type="date"
                      placeholder='mm/dd/yyyy'
                      value={deathDate}
                      onChange={(e) => setDeathDate(e.target.value)}
                      required
                    //  style={{ '::placeholder': { color: 'red' } }} 
                    />
                  </div>
                  <div className="mb-[10px] profile__date">
                    <label className="pt-[15px] block text-gray-700 font-bold" htmlFor="image">
                      ছবি আপলোড করুন
                    </label>
                    {/* <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                      /> */}
                    <div className='table m-auto mt-[30px] ' id='image'>
                      <ImageCropProvider>
                        <ImageCrop image={'/images/defaultUserPic/profile.jpg'} type="createWriter" setWriterImage={setImage} />
                      </ImageCropProvider>
                    </div>

                  </div>
                  <div className="flex justify-center">
                    <button
                      type="button"
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                      onClick={handleClose}
                    >
                      বাতিল
                    </button>
                    <button
                      type="submit"
                      className="bg-[#FCA000] hover:bg-[#e3a230] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      সাবমিট
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreateWriterModal;
