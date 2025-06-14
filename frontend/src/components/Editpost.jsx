import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Editpost() {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    // const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const {id} = useParams();
  
    const handleSubmit = (e)=>{
      e.preventDefault();
  
      axios.put(`http://localhost:3001/editpost/${id}`, {title, description}, {withCredentials:true})
      .then(res =>{
          if(res){
            navigate('/');
          }
      })
      .catch(err => console.log(err))
    }

    useEffect(()=>{
        axios.get(`http://localhost:3001/getpostsbyid/${id}`)
        .then(res =>{
          setTitle(res.data.title);
          setDescription(res.data.description);
        })
        .catch(err => console.log(err))
    }, [])

  return (
    <div className='flex justify-center sm:mx-80 sm:px-20 my-1 py-5 px-10 rounded-md'>
    <div className='mt-[10px] border-2 rounded'>
    <h1 className='w-full text-[30px] my-3 font-bold text-center'>Create</h1>
      <form className='flex justify-center' onSubmit={handleSubmit}>
        <div className='flex flex-col sm:w-96 sm:px-[19px] px-1 w-60 rounded-md'>
        <label htmlFor="" className='mx-3 font-bold'>Title:</label>
        <input className='sm:w-80 w-52 h-10 m-3 px-3 py-2 border-2 border-black rounded-md' type="text" value={title} onChange={e => setTitle(e.target.value)} />
        <label htmlFor="" className='mx-3 font-bold'>Post:</label>
        <textarea className='sm:w-80 w-52 h-32 m-3 px-3 py-2 border-2 border-black rounded-md' value={description} name="" id="" onChange={e => setDescription(e.target.value)}></textarea>
        <button className='sm:w-80 w-52 h-10 m-3 rounded-md border-2 cursor-pointer border-black bg-sky-400'>Update</button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Editpost