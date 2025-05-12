import axios from "axios"
import { useEffect } from "react"
import { serverUrl } from "../main"
import { useDispatch, useSelector } from "react-redux"
import { setUserData } from "../redux/userSlice"

const getCurrentUser=()=>{
    let dispatch=useDispatch()
    let {userData}=useSelector(state=>state.user)
    useEffect(()=>{
        const fetchUser=async ()=>{
            try {
                let result=await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})
                dispatch(setUserData(result.data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser()
    },[])
}

export default getCurrentUser

/**Ye custom hook logged-in user ka data Redux mein store karta hai.

Kya ho raha hai?

useEffect chalta hai jaise hi component load hota hai.

API call hoti hai: /api/user/current pe.

Agar user mila (authenticated), toh data Redux store mein setUserData() ke through store ho jata hai.

withCredentials: true ka matlab: cookies/auth token bhi bhejna.

👉 Ye hook har component mein use ho sakta hai jahan aapko current user ka data chahiye.

 */