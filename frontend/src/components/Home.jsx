import { useEffect, useState } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'

function Home() {

  const [posts, setPosts]= useState([]);

useEffect(()=>{
  axios.get('http://localhost:3001/getposts')
  .then(res =>{
    setPosts(res.data)
     // console.log(res.data)
  })
  .catch(err => console.log(err))
}, [])

  return (
    <div className='flex justify-center mx-5'>
   <div className='mt-[55px] sm:mt-[75px]'>
   {
        posts.map(post => (
           // in react key is necessary during map to identify the each child in list
          <Link to={`/post/${post._id}`} key={post._id}>
          <div className='flex flex-col items-center  bg-amber-100 sm:w-[570px] lg:w-[980px] md:w-[710px] border-black border-[1px] rounded-md my-2 mx-10'>   
            <img className='sm:w-80 sm:h-52 w-40 h-32 p-1 m-5 border-black border-[3px] rounded-md' src={`http://localhost:3001/public/${post.file}`} alt="IMAGE" />
            <div className='mx-2 px-2'>
              <h1 className='font-bold font-serif break-words w-[200px] p-1 mx-5 my-1'>{post.title}</h1>
              <h3 className='font-bold font-serif break-words w-[200px] p-1 mx-5 my-1'>
                {new Date(post.createdAt).toLocaleString()}
              </h3>
              <p className='font-serif break-words w-[200px] sm:w-[550px] lg:w-[960px] md:w-[700px] p-1 mx-5 my-1'>{post.description}</p>
            </div>
          </div>
          </Link>
        ))
      }
   </div>
    </div>
  )
}

export default Home