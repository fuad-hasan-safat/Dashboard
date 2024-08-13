import React, { useContext, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Sidebar from '../../components/Dashboard/Sidebar';
import Breadcrumb from '../../components/Dashboard/components/Breadcrumb';
import { AdminContext } from '../../components/store/adminpanel-context';
import Allcategory from '../../components/Dashboard/components/Allcategory';
import DashboardContent from '../../components/Dashboard/components/DashboardContent';
import AllDesignation from '../../components/Dashboard/components/AllDesignationList';
import AllPostList from '../../components/Dashboard/components/AllPostList';
import AllSliderList from '../../components/Dashboard/components/AllSliderList';
import AllWriterBio from '../../components/Dashboard/components/AllWriterBio';
import CreateSliderPage from '../../components/Dashboard/components/CreateSliderPage';
import WriterList from '../../components/Dashboard/components/AllWriterList';
import CreatEbook from '../../components/Dashboard/components/CreatEbook';
import CreateAudioCategory from '../../components/Dashboard/components/CreateAudioCategory';
import CreateAudioQuote from '../../components/Dashboard/components/CreateAudioQuote';
import AddAudioInEbook from '../../components/Dashboard/components/AddAudioInEbook';
import DeleteAudioCategory from '../../components/Dashboard/components/DeleteAudioCategory';
import DeleteEbookAndAudio from '../../components/Dashboard/components/DeleteEbookAndAudio';
import EditAudioBook from '../../components/Dashboard/components/EditAudioBook';
import AllProfileList from '../../components/Dashboard/components/AllProfileList';


const notificationData =[
    {
     image:'/images/dashboard/profile-img.jpg',
     info:'John Doe added new task ',
     time:'40 Mintes Age',
    },
    {
    image:'/images/dashboard/profile-img.jpg',
    info:'John Doe added new task ',
    time:'40 Mintes Age',
    },
    {
    image:'/images/dashboard/profile-img.jpg',
    info:'John Doe added new task ',
    time:'40 Mintes Age',
    },
    {
    image:'/images/dashboard/profile-img.jpg',
    info:'John Doe added new task ',
    time:'40 Mintes Age',
    },
    {
    image:'/images/dashboard/profile-img.jpg',
    info:'John Doe added new task ',
    time:'40 Mintes Age',
    },
    {
    image:'/images/dashboard/profile-img.jpg',
    info:'John Doe added new task ',
    time:'40 Mintes Age',
    },
]

const Dashboard = ({children}) => {

    const {currentindex} = useContext(AdminContext)
    const notificationRef = useRef(null);
    const profileRef = useRef(null);
    const [isOpen,setIsOpen] = useState(false);
    const [isNotifation,setIsNotifation] = useState(false);

    useOutsideNotification(notificationRef);
    useOutsideProfile(profileRef);

    function useOutsideNotification(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    // alert("You clicked outside of me!");
                    setIsNotifation(false)
                    // setIsSearchbarActive(false)
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    function useOutsideProfile(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    // alert("You clicked outside of me!");
                    setIsOpen(false)
                    // setIsSearchbarActive(false)
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const toggleMenu=()=>{
        setIsOpen(!isOpen);
    }
    const toggleNoti=()=>{
        setIsNotifation(!isNotifation);
    }

    const [userType, setUerType] = useState('user');
    useEffect(()=>{
        setUerType(localStorage.getItem('usertype'))
    },[])

    if(userType != 'admin') return null;

    return (
        <div className='main-wrapper'>
            <Head>
                <title>Dashboard</title>
            </Head>
            <div className='dashboard__header'>
                <div className='header-left'>
                    <div className="d-logo cursor-pointer z-[9999]">
                        <Link href='/'>
                            <img src='/images/svgs/lekhapokaBlack.svg' alt='lekhapo kaBlack' />
                        </Link>
                    </div>
                </div>
                <div className='header-rgt'>
                    <div ref={notificationRef} className={`d__notifation__wrap ${isNotifation ? 'open' : ''}`}>
                        <p>2</p>
                        <span onClick={toggleNoti}><i class="ri-notification-fill"></i></span>
                        <ul>
                            {notificationData.map((item,index)=>(
                            <li key={index}>
                                <a href='#'>
                                    <div className='notification__item'>
                                        <img src={item.image} alt='lekhapo kaBlack' />
                                        <h5>{item.info}</h5>
                                        <span>{item.time}</span>
                                    </div>
                                </a>
                            </li>
                            ))}
                        </ul>
                    </div>
                    <div ref={profileRef} className={`d__account__wrap ${isOpen ? 'open' : ''}`}>
                        <span onClick={toggleMenu}><img src='/images/dashboard/profile-img.jpg' alt='Profile Img' /></span>
                        <ul>
                            <li><a href='#'><i class="ri-men-line"></i> Md Milon Sarker</a></li>
                            <li><a href='#'><i class="ri-user-3-line"></i>My Profile</a></li>
                            {/* <li><a href='#'><i class="ri-settings-2-line"></i>Setting</a></li> */}
                            <li><a href='#'><i class="ri-login-circle-line"></i>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <Sidebar />
            <div className='page-wrapper'>
                <div className='page__content'>
                    <Breadcrumb />
                    {currentindex === 0 && <DashboardContent/>}
                    {currentindex === 1 && <AllPostList/>}
                    {currentindex === 2 && <Allcategory/>}
                    {currentindex === 3 && <CreateSliderPage/>}
                    {currentindex === 4 && <WriterList/>}
                    {currentindex === 5 && <AllProfileList/>}
                    {currentindex === 6 && <AllSliderList/>}
                    {currentindex === 7 && <AllDesignation/>}
                    {currentindex === 8 && <AllWriterBio/>}
                    {currentindex === 9 && <CreatEbook />}
                    {currentindex === 10 && <EditAudioBook/>}
                    {currentindex === 11 && <CreateAudioCategory/>}
                    {currentindex === 12 && <CreateAudioQuote/>}
                    {currentindex === 13 && <AddAudioInEbook/>}
                    {currentindex === 14 && <DeleteAudioCategory/>}
                    {currentindex === 15 && <DeleteEbookAndAudio/>}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;