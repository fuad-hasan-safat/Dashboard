import React, { useEffect, useRef, useState } from 'react'
import { apiBasePath } from '../../../utils/constant';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DialugueModal from '../../common/notification/DialugueModal';

export default function DeleteEbookAndAudio() {

    let notification = '';
    const dialogueRef = useRef();
    const [audioData, setAudioData] = useState({
        audioId: '',
        audioTitle: '',
        ebook_id: '',
        ebookTitle: '',
        deleteType:''   // 'audio' or 'ebook'
    });

    const [audiooDeleted, setAudioDeleted] = useState(0);

    const resetAudioData = () => {
        setAudioData({
            file: null,
            image: null,
            ebook_id: '',
        })
    }

    const [allBooks, setAllBooks] = useState([]);
    const [audiosOfSelectedBook, setAudioOfSelectedBook] = useState([]);
    const [deleteMessage, setDeleteMessage] = useState('');

    useEffect(() => {
        getAudioBookList()
    }, [audiooDeleted])

    useEffect(() => {
        if (audioData.ebook_id?.length > 0) {
            getAudioList()
        }
    }, [audioData.ebook_id, audiooDeleted])



    async function getAudioBookList() {
        try {
            console.log('Inside try')
            const result = await axios.get(
                `${apiBasePath}/books`
            );
            console.log(result)
            setAllBooks(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function getAudioList() {
        try {
            console.log('Inside try get audiolist', audioData.ebook_id)
            const result = await axios.get(
                `${apiBasePath}/getaudiobook/${audioData.ebook_id}`
            );
            console.log(result.data.audio);
            setAudioOfSelectedBook(result.data?.audio);
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = async (event) => {
        const { name, value, type, files } = event.target;

        if (name === 'audio') {
            const arr = value.split(',');
            console.log({value, arr});
            setAudioData((prevData) => ({
                ...prevData,
                audioId: arr[0],
                audioTitle: arr[1]
            }))
        }

        if (name === 'book') {
            const arr = value.split(',');
            console.log({value, arr});
            setAudioData((prevData) => ({
                ...prevData,
                ebook_id: arr[0],
                ebookTitle: arr[1]
            }))
        }

    }

    const detele = async () => {

        if(audioData.deleteType === 'audio'){

            axios
            .delete(`${apiBasePath}/deleteaudio/${audioData.audioId}`)
            .then((response) => {
                console.log("Delete successful:", response.data);
                setAudioDeleted(audiooDeleted + 1);
                notification = `ডিলিট হয়েছে`;
                notify1();
                dialogueRef.current.close();
            })
            .catch((error) => {
                console.error("Error deleting data:", error);
                notification = `ডিলিট হয়নি`;
                notify();
            });

        } else if( audioData.deleteType === 'book'){
            axios
            .delete(`${apiBasePath}/deletebook/${audioData.ebook_id}`)
            .then((response) => {
                console.log("Delete successful:", response.data);
                setAudioDeleted(audiooDeleted+1);
                notification = `বইটি ডিলিট হয়েছে`;
                notify1();
                dialogueRef.current.close();
            })
            .catch((error) => {
                console.error("Error deleting data:", error);
                notification = `অডিও বইটি ডিলিট হয়নি`;
                notify();
            });
        }

    }

    const handleDeleteBook = () => {

        if(audioData.ebook_id.length > 0) {
            setDeleteMessage(`অডিও বুকটি মুছে ফেলতে চান ?`);

            setAudioData((prevData) => ({
                ...prevData,
                deleteType: 'book'
            }))

            dialogueRef.current.showModal();
           
        }else{
            notification = 'অডিও বুক সিলেক্ট করুন';
            notify();
        }

    }
    const handleAudioDelete = () => {

        if (audioData.audioId.length > 0) {
            setDeleteMessage(`অডিওটি  মুছে ফেলতে চান ?`);

            setAudioData((prevData) => ({
                ...prevData,
                deleteType: 'audio'
            }))

            dialogueRef.current.showModal();
        }else{
            notification = 'অডিও ফাইল সিলেক্ট করুন';
            notify();
        }

    }


    const notify1 = () => toast.success(notification, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,

    });
    const notify = () => toast.warn(notification, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,

    });


    return (
        <div className='admin__add__slider__wrap'>
            <ToastContainer />
            <DialugueModal ref={dialogueRef} alert={deleteMessage} address={detele} type='delete' />

            <div >
                <div className='audio__book__input__fields clearfix'>
                    <div className='admin__input  text-black'>
                        <label>বই নির্বাচন করুন</label>
                        <select
                            name="book"
                            id="book"
                            value={`${audioData.ebook_id},${audioData.ebookTitle}`}
                            onChange={handleChange}
                        >
                            <option>বই নির্বাচন করুন</option>
                            {allBooks.map((book) => (
                                <option key={book._id} value={`${book._id},${book.title}`}>
                                    {book.title}
                                </option>
                            ))}
                        </select>
                        <div className='pt-[20px]'>
                            <button
                                onClick={handleDeleteBook}
                                className="page__common__yello__btn w-[100%] max-w-[300px] h-[50px] bg-[#FCA000] rounded-md text-[16px] text-white items-center profile__btn__midl"
                                type="submit"
                            >
                                বই মুছে ফেলুন
                            </button>
                        </div>

                    </div>
                    <div className='admin__input  text-black'>
                        <label>অডিও নির্বাচন করুন</label>
                        <select
                            name="audio"
                            id="audio"
                            value={`${audioData.audioId},${audioData.audioTitle}`}
                            onChange={handleChange}
                        >
                            <option>অডিও নির্বাচন করুন</option>
                            {audiosOfSelectedBook.map((audio) => (
                                <option key={audio._id} value={`${audio._id},${audio.title}`}>
                                    {audio.title}
                                </option>
                            ))}
                        </select>
                        <div className='pt-[20px]'>
                            <button
                                onClick={handleAudioDelete}
                                className="page__common__yello__btn w-[100%] max-w-[300px] h-[50px] bg-[#FCA000] rounded-md text-[16px] text-white items-center profile__btn__midl"
                                type="submit"
                            >
                                অডিও মুছে ফেলুন
                            </button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
