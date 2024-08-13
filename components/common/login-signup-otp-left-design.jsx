'use client'

import { useRouter } from "next/router";

export default function LoginSignInOtpLeftPartDesign() {

  const router = useRouter()

  return (
    <>
      <div className="">

        <div className="login__logo">

          <img
            src="/images/svgs/lekhapokaBlack.svg"
            height={72}
            width={205}
            alt="logo"
            className="cursor-pointer"
            onClick={()=> router.push('/')}
          />

        </div>

        <div className="login__text lg:text-left md:text-center sm:text-center text-black lg:text-6xl md:text-4xl sm:text-4xl xs:text-3xl">

          <h2>Enjoy The world of <span className="text-[#F9A106]">Poem</span> anytime !</h2>
          
        </div>

        <div className="login__img">

          <img
            src="/images/svgs/loginPageImage.svg"
            height={546}
            width={346}
            alt="logo"
            className="pt-16"
          />

        </div>
      
      </div>
    </>
  );
}
