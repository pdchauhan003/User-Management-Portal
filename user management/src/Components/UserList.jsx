import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
function UserList(){
    const navigate=useNavigate();
    const[data,setData]=useState([]);
    async function fetchData(){
        try{
            const res=await axios.get('http://localhost:1706/');
            setData(res.data.user)
        }
        catch(error){
            console.log('error in fetching data',error);
            navigate('*')

        }
    }  
    fetchData();
    const handleAdd=()=>{
        navigate('/add')
    }
    const handleUpdate=(id)=>{
        navigate(`/update/${id}`)
    }

    const handleDelete=async(name)=>{
        try{
            await axios.delete(`http://localhost:1706/delete/${name}`);
            toast.success(`recode of ${name} was deleted`);
            fetchData();
        }
        catch(error){
            console.log('error in delete',error);
            toast.error('error in deleting')
        }
    }
    return(
        <>
            <div className='justify-center iteams-center text-center mt-1 pt-1'>
                <h3 className='font-bold text-4xl'>User List</h3>
                <span className='text-gray-600 font-bold capitalize mb-1'>If Add new Nser Then click this button ---- </span><button className='bg-gray-300 text-white p-2 rounded-md w-20' onClick={handleAdd}>Add</button>
                <br/>
                <table className="mx-auto mt-3 text-center rounded-xl border-hidden" style={{background: "linear-gradient(gray, pink)",boxShadow:"0 0 10px black"}} cellPadding={'10px'} cellSpacing={'10px'} rules='all' >
                    <thead className="text-dark">
                        <tr>
                            <th className="px-4 py-2 border">No</th>
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Age</th>
                            <th className="px-4 py-2 border">Email</th>
                            <th className="px-4 py-2 border">Mobile Number</th>
                            <th className="px-4 py-2 border">Adit</th>
                            <th className="px-4 py-2 border">Delete</th>
                        </tr>
                    </thead>
                    <tbody className=" text-dark-600" >
                        {
                            data.map((item,index)=>(
                                <tr key={index} className="hover:bg-gray-400">
                                    <td className="border px-4 py-2">{index+1}</td>
                                    <td className="border px-4 py-2">{item.name}</td>
                                    <td className="border px-4 py-2">{item.age}</td>
                                    <td className="border px-4 py-2">{item.email}</td>
                                    <td className="border px-4 py-2">{item.mobile}</td>
                                    <td className="border px-4 py-2"><button className='w-full p-1 rounded-sm bg-gray-300' onClick={()=>handleUpdate(item._id)}>Update</button></td>
                                    <td className="border px-4 py-2"><button onClick={()=>handleDelete(item.name)} className='w-full p-1 rounded-sm bg-red-200'>Delete</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default UserList;