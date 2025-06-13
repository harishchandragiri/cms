import React, { useContext, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {userContext} from '../App'



function Create() {
  const {user, setUser} = useContext(userContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', file);
    formData.append('email', user.email);

    axios.post('http://localhost:3001/create', formData, {withCredentials:true})
    .then(res =>{
        if(res){
          navigate('/');
        }
    })
    .catch(err => console.log(err))
  }
  return (
    <div className='flex justify-center sm:mx-80 sm:px-20 my-3 py-5 px-10 rounded-md'>
      <div className='mt-[10px] border-2 rounded'>
        <h1 className='w-full text-[30px] my-3 font-bold text-center'>Create</h1>
        <form className='flex justify-center' onSubmit={handleSubmit}>
          <div className='flex flex-col sm:w-96 sm:px-[19px] px-1 w-60 rounded-md'>
          <label htmlFor="" className='mx-3 font-bold'>Title:</label>
          <input className='sm:w-80 w-52 h-10 m-3 border-2 border-black rounded-md' type="text" onChange={e => setTitle(e.target.value)} />
          <label htmlFor="" className='mx-3 font-bold'>Post:</label>
          <textarea className='sm:w-80 w-52 h-32 m-3 border-2 border-black rounded-md' name="" id="" onChange={e => setDescription(e.target.value)}></textarea>
          <label htmlFor="" className='mx-3 font-bold'>File:</label>
          <input className='m-3 rounded-md' type="file" onChange={e => setFile(e.target.files[0])}/>
          <button className='sm:w-80 w-52 h-10 m-3 rounded-md border-2 cursor-pointer border-black bg-sky-400'>Post</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Create