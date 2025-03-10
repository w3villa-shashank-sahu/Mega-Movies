import { useNavigate } from "react-router-dom";
import { MyRoutes } from "../backend/const";

export const Dropdown = () => {
const navigate = useNavigate()
   return (
    <div className="bg-white absolute top-12 right-5 py-2 rounded-md shadow-[0_0_5px_1px_rgba(0,0,0,0.8)]">
        <div
        className=" px-4 py-1 cursor-pointer text-white bg-red-500 mx-1 hover:bg-red-600"
        onClick={()=>{console.log('logout')
            localStorage.clear()
            navigate(MyRoutes.login)
        }}>
            logout
        </div>
    </div>
   );
}