import React,{useReducer} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const userData={
    name:'',
    age:null,
    email:'',
    password:'',
    mobile:null
}
const reducer=(state,action)=>{
    return {...state,[action.type]:action.value}
}
function AddUser(){
    const[state,dispatch]=useReducer(reducer,userData);
    const navigate=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const res=await axios.post('http://localhost:1706/add',state);
            if(res.data.status == 'ok'){
                toast.success(res.data.message);
                console.log('success message and navigate home page')
                navigate('/');
            }
            if(res.data.status=='error'){
                toast.error(res.data.message);
            }
            // toast.error(res.data.message)
            // console.log('after added run again this message...')
        }
        catch(error){
            toast.error('error in ading data',error)
        }
    }
    return(
        <>
            <div className='iteams-center text-center mt-3 pt-0 font-bold'>
                <h2 className='font-bold text-4xl'>Add new Data</h2>
                <form onSubmit={handleSubmit} className='p-5 m-130 mt-5 rounded-xl' style={{background: "linear-gradient(gray, skyblue)",border:'1px',boxShadow:'0 0 20px black'}}>
                    <input type='text' name='name' onChange={(e)=>dispatch({value:e.target.value,type:e.target.name})} placeholder='Enter Name' required
                    className="m-0.2 border-3 rounded p-1 "/>
                    <br/>
                    <input type='email' name='email' onChange={(e)=>dispatch({value:e.target.value,type:e.target.name})} placeholder='Enter Email' required
                    className="m-1 border-3 p-1 gap-5 rounded"/>
                    <br/>
                    <input type='password' name='password' onChange={(e)=>dispatch({value:e.target.value,type:e.target.name})} placeholder='Enter Password' required
                    className="m-1 border-3 p-1 gap-5 rounded"/>
                    <br/>
                    <input type='number' name='age'onChange={(e)=>dispatch({value:e.target.value,type:e.target.name})} placeholder='Enter Age' required
                    className="m-1 border-3 p-1 gap-5 rounded"/>
                    <br/>
                    <input type='number' name='mobile' onChange={(e)=>dispatch({value:e.target.value,type:e.target.name})} placeholder='Enter MobileNumber' maxLength={10} minLength={10} required
                    className="m-1 border-3 p-1 gap-5 rounded"/>
                    <br/>
                    <input className='mt-1 rounded-xl bg-black text-white w-50 h-10' type='submit'/>
                    
                </form>
            </div>
        </>
    )
}
export default AddUser
