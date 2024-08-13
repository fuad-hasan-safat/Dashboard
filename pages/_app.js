import '../styles/globals.css';
import '../styles/audiobook.css';
import '../styles/dashboard.css';
import '../public/assets/fonts/customfont.css';
import '../public/assets/css/image-slider.css';
import '../components/userprofile/FileUpload.css';
import 'slick-carousel/slick/slick.css';
import "slick-carousel/slick/slick-theme.css";
import 'remixicon/fonts/remixicon.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Layout from '../components/layout'
import LayoutNoSidebar from '../components/layoutnosidebar'
import { useRouter } from 'next/router'
import AudioPlaylistContextProvider from '../components/store/audioPlayer-context';
import SeeAllSliderContextProvider from '../components/store/seeall-slider-context';
import AudioPlayer from '../components/AudioBook/AudioPlayer/AudioPlayer';
import SearchContextProvider from '../components/lekharpokaStore/search-context';
import AdminContextProvider, { AdminContext } from '../components/store/adminpanel-context';
import useRouteChange from '../utils/useRouteChange';
import { useContext } from 'react';
import AudioDetailsTabContextProvider from '../components/store/audiodetailstab-context';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { pathname } = router;
  console.log("pathname : ", pathname);
  const { setCurrentComponentIndex } = useContext(AdminContext)
  useRouteChange((url) => {
    console.log('Route changed to:', url);
    setCurrentComponentIndex(0, 'Dashboard');
  });

  // /account/login
  // /account/signup
  // /account/recoverpassword
  let result = <Layout><Component {...pageProps} /></Layout>
 if (pathname == '/dashboard/dashboard') {
    result = <LayoutNoSidebar><Component {...pageProps} /></LayoutNoSidebar>
  }
  else if (pathname == "/post/readermood/[slug]") {
    result = <LayoutNoSidebar><Component {...pageProps} /></LayoutNoSidebar>
  }
  else {
    result = <Layout><Component {...pageProps} /> </Layout>
  }
  return (
    // <Layout>
    //   <Component {...pageProps} />
    // </Layout>
    <>

      <script async defer
        src="https://connect.facebook.net/en_US/sdk.js/xfbml.js?appId=1103079424285739&version=v16.0"
        crossOrigin="anonymous"
      />

      <AdminContextProvider>
        <AudioPlaylistContextProvider>
          <SeeAllSliderContextProvider>
            <SearchContextProvider>
           <AudioDetailsTabContextProvider>
              <GoogleOAuthProvider clientId="854926132475-sm4btto49sresu4g5o9qpuk9lgtqor9f.apps.googleusercontent.com">
                <>
                  {result}
                  <AudioPlayer />
                </>
              </GoogleOAuthProvider>
              </AudioDetailsTabContextProvider>
            </SearchContextProvider>
          </SeeAllSliderContextProvider>
        </AudioPlaylistContextProvider>
      </AdminContextProvider>
    </>


  )
}