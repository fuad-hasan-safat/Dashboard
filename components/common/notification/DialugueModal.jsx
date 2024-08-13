import { useRouter } from "next/router";
import { forwardRef } from "react"
const DialugueModal = forwardRef(function DialugueModal({ alert, address, type }, ref) {
    const router = useRouter();
    function logout() {
        localStorage.removeItem("status");
        localStorage.removeItem("name");
        localStorage.removeItem("adminuuid");
        localStorage.removeItem("phone");
        localStorage.removeItem("token");
        localStorage.removeItem("usertype");
        localStorage.removeItem("email");

        ref.current.close();
        router.reload();
    }

    function handleClick(){
        if(type === 'logout'){
            logout();
        }else if(type === 'delete'){
            address();
        }
    }

    return (
        <dialog ref={ref} className="result-modal">
            <h2>{alert}</h2>


            <button onClick={() => ref.current.close()} className="bg-red-300">না</button>
            <button onClick={handleClick} className="ml-[15px]">হ্যাঁ</button>

        </dialog>
    )
})

export default DialugueModal