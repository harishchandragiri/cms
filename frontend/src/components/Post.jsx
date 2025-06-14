import { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';
import {userContext} from '../App'


function Post() {
    const {user, setUser} = useContext(userContext);
    const {id} = useParams();
    const [posts, setPosts]= useState({});
    const navigate = useNavigate();

    useEffect(()=>{
      axios.get(`http://localhost:3001/getpostsbyid/${id}`)
      .then(res =>{
        setPosts(res.data)
        // console.log(res.data)
      })
      .catch(err => console.log(err))
    }, [id])

    const DeleteFunc = (id) =>{
        axios.delete(`http://localhost:3001/deletepost/${id}`)
        .then(res =>{
             navigate('/');
        })
        .catch(err => console.log(err))
    }

  return (
    <div className='flex justify-center mx-5'>
        <div className='mt-[55px] sm:mt-[75px]'>
        <div className='flex flex-col items-center bg-amber-100 h-auto sm:w-[570px] lg:w-[980px] md:w-[710px] border-black border-[1px] rounded-md my-2 mx-10'>  
            <div className='flex justify-end w-full mx-2'>
              {
                (user.email === posts.email)&&
                <div>
                  <Link to={`/editpost/${posts._id}`} className='m-1 px-1 border-black border-[1px] rounded-md bg-cyan-500'>Edit</Link>
                  <button onClick={() => DeleteFunc(posts._id)} className='m-1 px-1 border-black border-[1px] rounded-md bg-amber-300'>Delete</button>
                </div>

              }
            </div> 
            <img className='sm:w-80 sm:h-52 w-40 h-32 p-1 m-5 border-black border-[3px] rounded-md' src={`http://localhost:3001/public/${posts.file}`} alt="IMAGE" />
            <div className='mx-2 px-2'>
              <h1 className='font-bold font-serif break-words w-[200px] p-1 mx-5 my-1'>{posts.title}</h1>
              <h3 className='font-bold font-serif break-words w-[200px] p-1 mx-5 my-1'>
                {new Date(posts.createdAt).toLocaleString()}
              </h3>
              <p className='font-serif break-words w-[200px] sm:w-[550px] lg:w-[960px] md:w-[700px] p-1 mx-5 my-1'>{posts.description}</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Post