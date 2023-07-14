import React from 'react'
import { AiOutlineCreditCard, AiOutlineLogin, AiOutlineMessage } from 'react-icons/ai';
import { HiOutlineReceiptRefund, HiOutlineShoppingCart } from 'react-icons/hi';
import {MdOutlinePassword, MdOutlineTrackChanges} from 'react-icons/md';
import {TbAddressBook} from 'react-icons/tb'
import { RxPerson } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom'
import axios from 'axios' 
import { server } from '../../server';
import { toast } from 'react-toastify';

const ProfileSideBar = ({active, setActive}) => {
  
    const navigate = useNavigate();

    const logoutHandler = () =>{
        axios.get(`${server}/user/logout`, {withCredentials: true}).then((res)=>{
            toast.success(res.data.message);
            window.location.reload(true)
            navigate('/login')
        }).catch((err)=>{
            console.log(err.response.data.message);
        })
    }

    return (
    <div className='w-full bg-white shadow-sm rounded-[10px] p-4 pt-8'>
        <div className="flex items-center cursor-pointer w-full mb-8"
        onClick={()=> setActive(1)}
        >   
            <RxPerson size={20} color={active === 1? "#ff8336" : ""}/>
            <span
            className={`pl-3 ${active === 1? "text-[#ff8336]": ""} 800px:block hidden`}
            >
                Profile
            </span>
        </div>
        <div className="flex items-center cursor-pointer w-full mb-8"
        onClick={()=> setActive(2)}
        >   
            <HiOutlineShoppingCart size={20} color={active === 2? "#ff8336" : ""}/>
            <span
            className={`pl-3 ${active === 2? "text-[#ff8336]": ""} 800px:block hidden`}
            >
                Orders
            </span>
        </div>


        <div className="flex items-center cursor-pointer w-full mb-8"
        onClick={()=> setActive(6)}
        >   
            <MdOutlinePassword size={20} color={active === 6? "#ff8336" : ""}/>
            <span
            className={`pl-3 ${active === 6? "text-[#ff8336]": ""} 800px:block hidden`}
            >
                Change Password 
            </span>
        </div>
        <div className="flex items-center cursor-pointer w-full mb-8"
        onClick={()=> setActive(7)}
        >   
            <TbAddressBook size={20} color={active === 7? "#ff8336" : ""}/>
            <span
            className={`pl-3 ${active === 7? "text-[#ff8336]": ""} 800px:block hidden `}
            >
                My Addresses
            </span>
        </div>
        <div className="flex items-center cursor-pointer w-full mb-8"
        onClick={()=> setActive(8) || logoutHandler()}
        >   
            <AiOutlineLogin size={20} color={active === 8? "#ff8336" : ""}/>
            <span
            className={`pl-3 ${active === 8? "text-[#ff8336]": ""} 800px:block hidden`}
            >
                Log Out 
            </span>
        </div>

    </div>
  )
}

export default ProfileSideBar