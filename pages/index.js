import React, { useContext, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Sidebar from '../components/Dashboard/Sidebar';
import Breadcrumb from '../components/Dashboard/components/Breadcrumb';
import { AdminContext } from '../components/store/adminpanel-context';
import Allcategory from '../components/Dashboard/components/Allcategory';
import DashboardContent from '../components/Dashboard/components/DashboardContent';
import AllDesignation from '../components/Dashboard/components/AllDesignationList';
import AllPostList from '../components/Dashboard/components/AllPostList';
import AllSliderList from '../components/Dashboard/components/AllSliderList';
import AllWriterBio from '../components/Dashboard/components/AllWriterBio';
import CreateSliderPage from '../components/Dashboard/components/CreateSliderPage';
import WriterList from '../components/Dashboard/components/AllWriterList';
import CreatEbook from '../components/Dashboard/components/CreatEbook';
import CreateAudioCategory from '../components/Dashboard/components/CreateAudioCategory';
import CreateAudioQuote from '../components/Dashboard/components/CreateAudioQuote';
import AddAudioInEbook from '../components/Dashboard/components/AddAudioInEbook';
import DeleteAudioCategory from '../components/Dashboard/components/DeleteAudioCategory';
import DeleteEbookAndAudio from '../components/Dashboard/components/DeleteEbookAndAudio';
import EditAudioBook from '../components/Dashboard/components/EditAudioBook';
import AllProfileList from '../components/Dashboard/components/AllProfileList';
import { useRouter } from 'next/router';
import DialugueModal from '../components/common/notification/DialugueModal';
import AdminLoginPage from '../components/login/AdminLogin';
import { apiBasePath } from '../utils/constant';


const Home = ({ children }) => {
  const router = useRouter();
  const currentUrl = router.asPath;

  const { currentindex } = useContext(AdminContext);
  const dialogueRef = useRef();
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isNotifation, setIsNotifation] = useState(false);
  const [userImage, setUserImage] = useState(null);


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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }
  const toggleNoti = () => {
    setIsNotifation(!isNotifation);
  }

  function Logout() {
    dialogueRef.current.showModal();
  }

  const [userType, setUerType] = useState('user');
  useEffect(() => {
    setUerType(localStorage.getItem('usertype'))

    const fetchUserPhoto = async () => {
      try {
        const response = await fetch(`${apiBasePath}/getprofilepic/${localStorage.getItem("adminuuid")}`);
        const data = await response.json();
        setUserImage(data.image);
        //console.log( "------------------->>>> POST LIST ------------------>>>>>>>",postList );
      } catch (error) {
        // alert("Error Fetching data");
      }
    };

    fetchUserPhoto();
  }, [userType])


  return (

    <>
      {userType != 'admin' ? <>
        <AdminLoginPage url={currentUrl} />
      </> :
        <div className='main-wrapper'>
          <Head>
            <title>Dashboard</title>
          </Head>
          <div className='dashboard__header'>
            <div className='header-left'>
              <DialugueModal ref={dialogueRef} alert='আপনি কি লগআউট করতে চান' address={`/`} type='logout' />
              <div className="d-logo cursor-pointer z-[9999]">
                <Link href='/'>
                  <img src='/images/svgs/lekhapokaBlack.svg' alt='lekhapo kaBlack' />
                </Link>
              </div>
            </div>
            <div className='header-rgt'>
              {/* <div ref={notificationRef} className={`d__notifation__wrap ${isNotifation ? 'open' : ''}`}>
                <p>2</p>
                <span onClick={toggleNoti}><i class="ri-notification-fill"></i></span>
                <ul>
                  {notificationData.map((item, index) => (
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
              </div> */}
              <div ref={profileRef} className={`d__account__wrap ${isOpen ? 'open' : ''}`}>
                <span onClick={toggleMenu}><img src={`${apiBasePath}/${userImage?.slice(userImage?.indexOf('/') + 1)}`} alt='Profile Img' /></span>
                <ul>
                  <li><a href='#'><i class="ri-men-line"></i>{localStorage.getItem('name')}</a></li>
                  {/* <li><a href='#'><i class="ri-settings-2-line"></i>Setting</a></li> */}
                  <li><a href='#' onClick={Logout}><i class="ri-login-circle-line"></i>Logout</a></li>
                </ul>
              </div>
            </div>
          </div>
          <Sidebar />
          <div className='page-wrapper'>
            <div className='page__content'>
              <Breadcrumb />
              {currentindex === 0 && <DashboardContent />}
              {currentindex === 1 && <AllPostList />}
              {currentindex === 2 && <Allcategory />}
              {currentindex === 3 && <CreateSliderPage />}
              {currentindex === 4 && <WriterList />}
              {currentindex === 5 && <AllProfileList />}
              {currentindex === 6 && <AllSliderList />}
              {currentindex === 7 && <AllDesignation />}
              {currentindex === 8 && <AllWriterBio />}
              {currentindex === 9 && <CreatEbook />}
              {currentindex === 10 && <EditAudioBook />}
              {currentindex === 11 && <CreateAudioCategory />}
              {currentindex === 12 && <CreateAudioQuote />}
              {currentindex === 13 && <AddAudioInEbook />}
              {currentindex === 14 && <DeleteAudioCategory />}
              {currentindex === 15 && <DeleteEbookAndAudio />}
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Home;