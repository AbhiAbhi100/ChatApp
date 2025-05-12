import axios from "axios"
import { useEffect } from "react"
import { serverUrl } from "../main"
import { useDispatch, useSelector } from "react-redux"
import { setOtherUsers, setUserData } from "../redux/userSlice"
import { setMessages } from "../redux/messageSlice"

const getMessage=()=>{
    let dispatch=useDispatch()
    let {userData,selectedUser}=useSelector(state=>state.user)
    useEffect(()=>{
        const fetchMessages=async ()=>{
            try {
                let result=await axios.get(`${serverUrl}/api/message/get/${selectedUser._id}`,{withCredentials:true})
                dispatch(setMessages(result.data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchMessages()
    },[selectedUser,userData])
}

export default getMessage

/**. getMessages.jsx :
Ye hook do users ke beech ke messages fetch karta hai (chat ke liye).

Kya ho raha hai?

Redux se selectedUser aur userData liya ja raha hai.

API call ja rahi hai: /api/message/get/${selectedUser._id}

Server se chat messages aate hain aur setMessages() ke through Redux store mein save ho jate hain.

👉 Ye tab use hota hai jab aap kisi bande ke sath chat open karte ho.

 */