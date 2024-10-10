import { Navigate } from 'react-router-dom';


export default function Root(props) {
  if (localStorage.getItem("token")==null) {
    return <Navigate to={"/login"}/>
  }else{
    return props.children
  }
}
