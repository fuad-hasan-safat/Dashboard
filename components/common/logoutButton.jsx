import { googleLogout } from "@react-oauth/google";
import { useRouter } from "next/router";



export default function LogoutButton({ buttonClass, buttonText, setStatus, setProfile, setUser }) {

  const router = useRouter()

  googleLogout();

  setProfile(null);
  setUser(null);

  function logoutHandaler() {

    localStorage.removeItem("status");
    localStorage.removeItem("name");
    localStorage.removeItem("uuid");
    localStorage.removeItem("phone");
    localStorage.removeItem("token");
    localStorage.removeItem("usertype");
    localStorage.removeItem("email");

    setStatus("");

    router.push('/');
  }

  return (
    <>
    
        <button
          onClick={logoutHandaler}
          className={`${buttonClass}`}>
          {buttonText}
        </button>

    </>
  );
}
