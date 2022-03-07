import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { loading } from "./Components/loading";
import route from "./Components/Route";
import { useEffect, useState } from "react"

function App() {
  const token = useSelector(state=>state.token)
  const dispatch = useDispatch()
  let [bool, setBool] = useState(false);
  useEffect(()=>{
    if(token !== null){
      loading(dispatch,token).then(res=>{setBool(res)})
    }    
    setBool(false)
  },[token])
  const router = route(bool)

  return (
    <BrowserRouter>
      {router}
    </BrowserRouter>
    );
}

export default App;
