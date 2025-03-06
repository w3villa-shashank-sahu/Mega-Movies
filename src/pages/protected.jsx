import { useEffect } from "react"
import { useNavigate } from "react-router-dom" 
import { MyRoutes } from "../backend/const"

const Protected = (props) => {

    const navigate = useNavigate()
    useEffect(()=>{
        let token = localStorage.getItem('token')
        if(!token){
            navigate(MyRoutes.login)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const {Page} = props
    return <Page/>
}

export default Protected;