import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dp from "../assets/dp.webp"
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { BiLogOutCircle } from "react-icons/bi";
import { serverUrl } from '../main';
import axios from 'axios';
import { setOtherUsers, setSearchData, setSelectedUser, setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

function SideBar() {
  const { userData, otherUsers, selectedUser, onlineUsers, searchData } = useSelector(state => state.user)
  const [search, setSearch] = useState(false)
  const [input, setInput] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })
      dispatch(setUserData(null))
      dispatch(setOtherUsers(null))
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  const handlesearch = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/search?query=${input}`, { withCredentials: true })
      dispatch(setSearchData(result.data))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (input) handlesearch()
  }, [input])

  return (
    <div className={`lg:w-[30%] w-full h-full overflow-hidden lg:block bg-white border-r border-gray-200 ${!selectedUser ? "block" : "hidden"}`}>
      {/* Logout Button */}
      <div className='w-[50px] h-[50px] rounded-full bg-red-500 text-white flex justify-center items-center shadow-md cursor-pointer fixed bottom-6 left-4 z-50' onClick={handleLogOut}>
        <BiLogOutCircle className='w-6 h-6' />
      </div>

      {/* Search Dropdown */}
      {input.length > 0 &&
        <div className='absolute top-[260px] w-full max-h-[500px] bg-white overflow-y-auto shadow-lg z-40 px-4 py-4 rounded-lg space-y-4'>
          {searchData?.map((user) => (
            <div key={user._id} className='flex items-center gap-4 p-3 hover:bg-blue-100 rounded-lg cursor-pointer transition' onClick={() => {
              dispatch(setSelectedUser(user))
              setInput("")
              setSearch(false)
            }}>
              <div className='relative w-[50px] h-[50px]'>
                <img src={user.image || dp} alt="" className='w-full h-full object-cover rounded-full' />
                {onlineUsers?.includes(user._id) &&
                  <span className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white'></span>}
              </div>
              <span className='text-gray-800 font-medium'>{user.name || user.userName}</span>
            </div>
          ))}
        </div>
      }

      {/* Header */}
      <div className='w-full h-[200px] bg-blue-400 text-white px-6 py-5 rounded-b-3xl shadow-md'>
        <h1 className='text-3xl font-bold mb-4'>Chatily</h1>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold'>Hi, {userData.name || "User"}</h2>
          <div className='w-14 h-14 rounded-full overflow-hidden cursor-pointer shadow-lg bg-white' onClick={() => navigate("/profile")}>
            <img src={userData.image || dp} alt="" className='w-full h-full object-cover' />
          </div>
        </div>

        {/* Search Bar */}
        <div className='flex items-center gap-3'>
          {!search ? (
            <div className='w-[50px] h-[50px] bg-white text-blue-600 rounded-full flex justify-center items-center shadow-md cursor-pointer' onClick={() => setSearch(true)}>
              <IoIosSearch className='w-6 h-6' />
            </div>
          ) : (
            <form className='flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-md w-full'>
              <IoIosSearch className='text-gray-600 w-5 h-5' />
              <input type="text" placeholder='Search users...' className='flex-1 outline-none text-gray-700' value={input} onChange={(e) => setInput(e.target.value)} />
              <RxCross2 className='text-gray-600 cursor-pointer w-5 h-5' onClick={() => {
                setSearch(false)
                setInput("")
              }} />
            </form>
          )}
        </div>
      </div>

      {/* Online Users (Icons) */}
      {!search && (
        <div className='flex items-center gap-3 px-4 mt-6 overflow-x-auto'>
          {otherUsers?.filter(user => onlineUsers?.includes(user._id)).map((user) => (
            <div key={user._id} className='relative w-[50px] h-[50px] bg-white rounded-full shadow-md cursor-pointer' onClick={() => dispatch(setSelectedUser(user))}>
              <img src={user.image || dp} alt="" className='w-full h-full object-cover rounded-full' />
              <span className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white'></span>
            </div>
          ))}
        </div>
      )}

      {/* All Users List */}
      <div className='mt-6 px-4 overflow-y-auto max-h-[calc(100%-400px)] space-y-4 pb-10'>
        {otherUsers?.map((user) => (
          <div key={user._id} className='flex items-center gap-4 p-3 bg-white shadow-sm hover:bg-blue-100 rounded-xl cursor-pointer transition' onClick={() => dispatch(setSelectedUser(user))}>
            <div className='relative w-[50px] h-[50px]'>
              <img src={user.image || dp} alt="" className='w-full h-full object-cover rounded-full' />
              {onlineUsers?.includes(user._id) &&
                <span className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white'></span>}
            </div>
            <span className='text-gray-800 font-medium text-lg'>{user.name || user.userName}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SideBar








