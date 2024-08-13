import { useEffect, useState } from 'react';

import Modal from './Modal';
import { readFile } from './cropImage';
import ImageCropModalContent from './ImageCropModalContent';
import { useImageCropContext } from './ImageCropProvider';
import { apiBasePath } from '../../../utils/constant';
import { useRouter } from 'next/router';

const ImageCrop = ({setImageFile, image, type = "profilePic", setWriterImage}) => {
    const router = useRouter();
    // console.log({ image })

    const [username, setUsername] = useState("");
    const [userUuid, setUserUuid] = useState("");
    const [userToken, setUserToken] = useState("");

    const [openModal, setOpenModal] = useState(false);
    const [preview, setPreview] = useState(image);

    const { getProcessedImage, setImage, resetStates } = useImageCropContext();

    useEffect(() => {
        setUsername(localStorage.getItem("name") || "");
        setUserToken(localStorage.getItem("token") || "");
        setUserUuid(localStorage.getItem("uuid") || "");

    }, [])
    useEffect(()=>{
        setPreview(image)


    },[image.length])

    const handleDone = async () => {
        const avatar = await getProcessedImage();
        setPreview(window.URL.createObjectURL(avatar));
        resetStates();
        setOpenModal(false);
        

        //  sent data to backend 

        if (type === "createWriter") {
            setWriterImage(avatar)

        } else{
            setImageFile(avatar)
        }
        

    };

    const handleFileChange = async ({ target: { files } }) => {
        const file = files && files[0];
        const imageDataUrl = await readFile(file);
        setImage(imageDataUrl);
        setOpenModal(true);
    };

    return (
        <div className="flex justify-center items-center pb-[20px]">
            <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="avatarInput"
                accept="image/*"
            />
            <label htmlFor="avatarInput" className="cursor-pointer">
                <img
                    src={preview}
                    height={192}
                    width={192}
                    className="object-cover rounded-full h-48 w-48 border-[5px] border-white mb-[15px]"
                    alt={preview}
                />
                {/* <div onClick={handleFileChange} className='button -mt-[53px]'><i className='ri-camera-line'></i></div> */}

                <span onClick={handleFileChange} className='page__common__yello__btn inline-block px-[50px] py-[8px] bg-[#F9A106] text-white rounded'><i class="ri-image-add-fill"></i> ছবি পরিবর্তন</span>

            </label>

            <Modal open={openModal} handleClose={() => setOpenModal(false)}>
                <ImageCropModalContent handleDone={handleDone} handleClose={() => setOpenModal(false)} />
            </Modal>
        </div>
    );
};

export default ImageCrop;