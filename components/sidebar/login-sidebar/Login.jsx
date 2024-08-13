"use client";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import SignInOption from '../../signInOption/SignInOption'
import { apiBasePath } from "../../../utils/constant";
import { useRouter } from "next/navigation";
import Divider from '../../common/sidebardivider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from "../../store/adminpanel-context";

export default function Login() {

  const router = useRouter();

  const {setCurrentComponentIndex} = useContext(AdminContext)

  let notification = ''

  const [number, setnumber] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("");
  const [username, setUsername] = useState("");
  const [userUuid, setUserUuid] = useState("");
  const [error, setError] = useState(null);
  const [numberPrefix, setNumberPrefix] = useState('88');
  const [showPassword, setShowPassword] = useState(false);
  // google login state start
  const [profile, setProfile] = useState([]);
  const [email, setEmail] = useState('')

  useEffect(() => {
    setStatus(localStorage.getItem("status") || "");
  }, []);

  useEffect(() => {
    setStatus(localStorage.getItem("status") || "");
    setUsername(localStorage.getItem("name") || "");
    setUserUuid(localStorage.getItem("uuid") || "");
  }, [status]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleNumberhange = (e) => {

    const newValue = e.target.value.replace(/[^0-9\b]/g, "");

    if (newValue.length > 11) {
      setError("Phone number cannot exceed 11 digits.");
      return;
    }

    if (newValue.length > 1 && newValue.slice(0, 2) !== "01") {
      setError("Phone number must start with 01.");
      return;
    }

    setnumber(newValue);
    setError(null); // Clear error if valid input

  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  function reloadPage() {
    setTimeout(() => {
      router.refresh()

    }, 1000)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      submitLogin();
    }
  };

  async function submitLogin() {

    try {
      const response = await axios.post(
        `${apiBasePath}/login`,
        {
          phone: `${numberPrefix}${number}`,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );


      if (response.data.status === 'success') {
        const data = await response.data;

        notification = 'সফলভাবে লগইন করেছেন';
        notify1();

        setStatus(data.status);
        setUserUuid(data.uuid);
        setUser(data);

        localStorage.setItem("status", data.status);
        localStorage.setItem("name", data.name);
        localStorage.setItem("uuid", data.uuid);
        localStorage.setItem("phone", data.phone);
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("usertype", data.usertype);
        localStorage.setItem("phone", data.phone);

        setnumber("");
        setPassword("");

        reloadPage()
      }
      else if (response.data.status === "failed") {
        // alert(' সঠিক নাম্বার দিন ')
        notification = 'সঠিক নাম্বার দিন';
        notify();

      }


    } catch (error) {
      // alert('সঠিক পাসওয়ার্ড দিন');
      notification = 'সঠিক পাসওয়ার্ড দিন';
      notify();
    }



  }

  const notify = () => toast.warn(notification, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,

  });

  const notify1 = () => toast.success(notification, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,

  });

  return (
    <>
      {status === 'success' ? (
        <>
          <div className="flex flex-col items-center">

            {localStorage.getItem("usertype") === 'admin' &&
              <button
                onClick={() => { 
                  setCurrentComponentIndex(0, 'Dashboard')
                  router.push('/dashboard/dashboard')} }
                className="page__common__yello__btn text-white rounded-[6px] bg-[#F9A106] px-[20px] h-[40px] mt-[25px]"
              >অ্যাডমিন প্যানেল</button>
            }

            {/* <Divider /> */}

          </div>

        </>
      ) : (
        <div>
          <div>

            <div className=" text-[20px] text-[#F9A106] font-semibold h-[28px]  pt-5 pb-[28px]">
              লগইন
            </div>

            <div className="mb-3  pt-4 w-full">
              <input
                className="border rounded-lg w-full h-[43px] text-[14px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phonenumber"
                type="tel"
                placeholder="মোবাইল নাম্বার দিন ০১-xxxxxxxxx"
                required
                onChange={handleNumberhange}
                value={number}
              />
              {error && <p className="error text-red-500">{error}</p>}
            </div>

            <div className="relative">

              <input
                className="border rounded-lg w-full h-[43px] text-[14px] py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="পাসওয়ার্ড দিন"
                required
                onChange={handlePasswordChange}
                onKeyDown={handleKeyDown}
                value={password}
              />

              <button className="absolute right-[10px]  pt-[10px]" type="button" onClick={togglePasswordVisibility}>
                {showPassword ? <i class="ri-eye-off-line"></i> : <i class="ri-eye-line"></i>}
              </button>

            </div>

            <a
              className="pt-[12px] float-right mb-[15px] inline-block align-baseline font-bold text-[14px] text-gray-600 hover:text-black-800"
              href="/account/recoverpassword"
            >
              পাসওয়ার্ড ভুলে গেছেন?
            </a>

            <div className="">
              <button
                className="page__common__yello__btn mb-8 w-full h-[43px] text-[16px] bg-[#F9A106] hover:bg-yellow-700 text-white  py-2 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={submitLogin}
              >
                লগইন করুন
              </button>
              <ToastContainer />

            </div>

            <SignInOption
              user={user}
              setUser={setUser}
              profile={profile}
              setProfile={setProfile}
              setStatus={setStatus}
              setUsername={setUsername}
              setUserUuid={setUserUuid}
              setEmail={setEmail}
              title="অথবা সাইন ইন করুন"
              icon1="/images/loginOptionIcon/google.svg"
              icon2='/images/loginOptionIcon/facebook_squre.svg'
              lowermessege1="একাউন্ট নেই? "
              lowermessege2="একাউন্ট তৈরী করুন"
              signLogLink="/account/signup"
            />
          </div>
          <Divider />
        </div>
      )}
    </>
  );
}
