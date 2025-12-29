import React,{useReducer} from 'react';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';
import toast from "react-hot-toast";
const userData={
    age:null,
    email:'',
    password:'',
    mobile:null
}
const reducer=(state,action)=>{
    return {...state,[action.type]:action.value}
}
function UpdateUser(){
    const[state,dispatch]=useReducer(reducer,userData);
    const navigate=useNavigate();
    const {id}=useParams();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const res=await axios.put(`http://localhost:1706/update/${id}`,state);
            if(res.data.status == 'ok'){
                toast.success(res.data.message);
                navigate('/');
            }
            else if(res.data.status=='emailerror'){
                toast.error(res.data.message);
            }
            else if(res.data.status=='mobileerror'){
                toast.error(res.data.message)
            }
            else{
                toast.error(res.data.message)
            }
        }
        catch(error){
            toast.error('error in ading data',error)
        }
    }
    return(
        <>
        
            <div className='flex flex-col justify-center items-center text-center mt-0 font-bold'>
                <h2 className='font-bold text-3xl mb-5'>Update Data</h2>
                <div className='p-10 mt-5 rounded-xl w-min' style={{background: "linear-gradient(gray, skyblue)",border:'5px',boxShadow:'0 0 10px black'}}>
                    <form onSubmit={handleSubmit} className='items-center'>
                        <input type='email' name='email' onChange={(e)=>dispatch({value:e.target.value,type:e.target.name})} placeholder='Enter Email' required
                        className="m-1 border-3 rounded p-1"/>
                        <br/>
                        <input type='password' name='password' onChange={(e)=>dispatch({value:e.target.value,type:e.target.name})} placeholder='Enter Password' required
                        className="m-1 border-3 rounded p-1 "/>
                        <br/>
                        <input type='number' name='age'onChange={(e)=>dispatch({value:e.target.value,type:e.target.name})} placeholder='Enter Age' required
                        className="m-1 border-3 rounded p-1 "/>
                        <br/>
                        <input type='number' name='mobile' onChange={(e)=>dispatch({value:e.target.value,type:e.target.name})} placeholder='Enter MobileNumber' maxLength={10} minLength={10} required
                        className="m-1 border-3 rounded p-1 "/>
                        <br/>
                        <input type='submit' className='mt-1 rounded-xl bg-black text-white w-50 h-10'/>
                    </form>
                </div>
            </div>
       
        </>
    )
}
export default UpdateUser;
