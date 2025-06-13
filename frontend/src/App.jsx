import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import { Suspense, lazy } from "react";
import Loading from "./components/Loading";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar";

const Login = lazy(() => import("./components/Login"));
const Home = lazy(() => import("./components/Home"));
const Create = lazy(() => import("./components/Create"));
const Post = lazy(() => import("./components/Post"));
const Editpost = lazy(() => import("./components/Editpost"));


export const userContext = createContext();


function App() {

  const [user, setUser] = useState(null);      //For login and changing the login/logout in navbar
  const [values, setValues] = useState({})  // For values 

    useEffect(()=>{
    axios.get('http://localhost:3001/', {withCredentials:true})
    .then(res =>{
      // res have email and username get from the backend '/' route
      setUser(res.data)
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <userContext.Provider value={{user, setUser, values, setValues}}>
    <Router>
        <Navbar/>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/create" element={<Create/>}></Route>
          <Route path="/post/:id" element={<Post/>}></Route>
          <Route path="/editpost/:id" element={<Editpost/>}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  </userContext.Provider>
  );
}

export default App;
