import Divider from "../common/sidebardivider"
import Jonopriyo from "./jonopriyo/Jonopriyo"
import Lekhok from "./lekhok/Lekhok"
import Login from "./login-sidebar/Login"
import Samprotik from "./samprotik/Samprotik"
import Somosamoyik from "./somosamoyik/Somosamoyik"


export default function Sidebar() {

    return (
        <div>
            <div className="bg-white">
                <div className="border-[1px] border-[#F3F3F3] rounded-[12px] lg:px-10 md:px-8 sm:px-6 xs:px-5 mb-[40px] lg:mt-[0] md:mt-[40px] sm:mt-[40px] xs:mt-[40px]">
                   
                    <div className="">
                        <Login />
                    </div>

                    <div className="pt-[15px]">
                        <Somosamoyik />
                    </div>
                    <Divider />
                    <div>
                        <Samprotik />
                    </div>
                    <Divider />
                    <div>
                        <Jonopriyo />
                    </div>
                    <Divider />
                    <div>
                        <Lekhok />
                    </div>
                </div>
            </div>
        </div>
    )
}