'use client'
import React, { useState, useEffect } from "react";
import LoginReg from '../common/loginform'
import LoginSignInOtpLeftPartDesign from '../common/login-signup-otp-left-design'
import SignInOption from "../signInOption/SignInOption";

const LoginPage = ({url = '/'}) => {

  const [userToken, setUserToken] = useState("");
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("");
  const [username, setUsername] = useState("");
  const [userUuid, setUserUuid] = useState("");
  const [profile, setProfile] = useState([]);
  const [email, setEmail] = useState('')

  useEffect(() => {
    setStatus(localStorage.getItem("status") || "");
    setUsername(localStorage.getItem("name") || "");
    setUserToken(localStorage.getItem("token") || "");
    setUserUuid(localStorage.getItem("uuid") || "");
  }, []);


  return (
    <>
      <section className="login__form__sec__wrp clearfix">

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="login__form__wrap flex flex-row bg-[#FCF7E8] shadow-md">
              
                <div className="login__form__left">
                  <LoginSignInOtpLeftPartDesign />
                </div>
               
                <div className="login__form__right relative bg-white rounded-l-[46px] text-black grid place-items-center ">

                  <div className="w-full">
                    {
                      userUuid?.length > 0 ?
                      <>

                      <div>
                        <p className="text-black text-3xl">আপনি ইতিমধ্যেই লগইন করেছেন.<a href="/"> <span className="text-orange-500 cursor-pointer">প্রচ্ছদ পেজে যান </span></a></p>
                      </div>
                      
                      </>
                      :
                      <>
                        <LoginReg logreg="লগইন করুন" btntext="লগইন" url={url} />

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
                          lowermessege1="একাউন্ট নেই? "
                          lowermessege2="একাউন্ট তৈরী করুন"
                          signLogLink="/account/signup"
                        />
                      </>

                    }

                  </div>
                  {/* <div className="absolute top-7 right-0 pr-2">
                      <DropDown />
                    </div> */}
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
