"use client"

import { apiBasePath } from "../../utils/constant";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AdminLoginForm({ logreg, btntext, url = '/' }) {

  const router = useRouter();

  let notification = ''

  const [number, setnumber] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({
    status: '',
    name: '',
    phone: '',
    uuid: '',
  });
  const [status, setStatus] = useState("");
  const [username, setUsername] = useState("");
  const [userUuid, setUserUuid] = useState("");
  const [error, setError] = useState(null);
  const [numberPrefix, setNumberPrefix] = useState('88');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {

    setStatus(localStorage.getItem("status") || "");

  }, [status]);

  useEffect(() => {

    setUsername(localStorage.getItem('name') || '');
    setUserUuid(localStorage.getItem('adminuuid') || '')

  }, []);

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
    setError(null);

  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };


  function reloadPage(url) {
    setTimeout(() => {
      if (url === '/') {
        router.push(url)
      } else {
        router.refresh(url)
      }
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
        console.log('log in response ', data)

        if (data.usertype != 'admin') {
          notification = 'পুনরায় লগইন করুন!';
          notify();
          return
        }

        notification = 'সফলভাবে লগইন করেছেন';
        notify1();

        setStatus(data.status);
        setUserUuid(data.uuid);
        setUser(data);

        localStorage.setItem("status", data.status);
        localStorage.setItem("name", data.name);
        localStorage.setItem("adminuuid", data.uuid);
        localStorage.setItem("phone", data.phone);
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("usertype", data.usertype);
        localStorage.setItem("phone", data.phone);

        setnumber('')
        setPassword('')

        router.refresh()
        // reloadPage(url);

      } else {
        // alert('সঠিক নাম্বার দিন');
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
      <div className="login__form__dsc">

        <div className="lg:text-[48px] md:text-[45px] sm:text-[40px] xs:text-[30px] mb-[65px] text-left font-semibold text-black">
          {logreg}
        </div>

        <div className="login__form__fleds w-full ">

          <div className="mb-[18px] ">

            <input
              onChange={handleNumberhange}
              onKeyDown={handleKeyDown}
              value={number}
              className="h-[62px] p-4 bg-[#FCF7E8] rounded-[8px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="number"
              placeholder="নাম্বার দিন (01-XXXXXXXXX)"
              required
            />
            {error && <p className="error text-red-500">{error}</p>}

          </div>

          <div className="relative w-full">

            <input
              onChange={handlePasswordChange}
              onKeyDown={handleKeyDown}
              value={password}
              className="h-[62px] p-4 pr-[40px] bg-[#FCF7E8] rounded-[8px] text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="পাসওয়ার্ড দিন"
              required
            />

            <button className="absolute right-[20px]  pt-[18px]" type="button" onClick={togglePasswordVisibility}>
              {showPassword ? <i class="ri-eye-off-line"></i> : <i class="ri-eye-line"></i>}
            </button>

            {/* <a
              className="pt-[12px] float-right mb-[15px] inline-block align-baseline font-bold text-base text-gray-600 hover:text-black-800"
              href="/account/recoverpassword"
            >
              পাসওয়ার্ড ভুলে গেছেন?
            </a> */}

          </div>

          <div className="w-full table m-auto">

            <button
              type="button"
              onClick={submitLogin}
              className="page__common__yello__btn mt-[23px] px-[110px] bg-[#F9A106] rounded-[8px] text-[30px] text-white  h-[60px] text-center place-content-center"
            >
              {btntext}
            </button>
            <ToastContainer />

          </div>

        </div>
      </div>
    </>
  );
}
