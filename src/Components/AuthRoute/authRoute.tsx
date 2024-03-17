import { Outlet, useNavigate } from "react-router-dom"
import SharedLayout from "../../Layouts/SharedLayout/sharedLayout"
import useTokens from "../../Hooks/Auth/useToken"
import { useEffect } from "react"

const AuthRoute:React.FC=()=>{

    const {accessToken}=useTokens()
    const navigate=useNavigate()

    useEffect(()=>{
        if(!accessToken){
            navigate("/login")
        }
    },[])
   

    return<div>
        <SharedLayout>
            <Outlet/>
        </SharedLayout>
    </div>
}
export default AuthRoute