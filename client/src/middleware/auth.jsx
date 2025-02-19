import { Navigate } from "react-router-dom";

const AuthorizeUser= ({children})=>{
    const token=localStorage.getItem('token');
    if(!token){
        return <Navigate to={'/'} replace={true}></Navigate>
    }
    return children;
}
export default AuthorizeUser;