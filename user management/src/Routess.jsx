import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AddUser from './Components/AddUser';
import UpdateUser from './Components/UpdateUser';
import UserList from './Components/UserList';
// import Nopage from './Components/Nopage'
import {Toaster} from 'react-hot-toast';
function Routess(){
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<UserList/>}/>
                    <Route path='/add' element={<AddUser/>}/>
                    <Route path='/update/:id' element={<UpdateUser/>}/>
                </Routes>
                <Toaster />
            </BrowserRouter>
        </>
    )
}
export default Routess;