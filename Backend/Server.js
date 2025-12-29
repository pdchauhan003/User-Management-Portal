const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const cors=require('cors');
require('dotenv').config();
const mg=require('mongoose');
// const jwt=require('jsonwebtoken');

app.use(cors());
app.use(express.json())
app.use(bodyparser.urlencoded({extended:true}));


mg.connect(process.env.Mongo_url)
 .then(()=>{console.log('mongodb connection success')})
 .catch((error)=>{console.log('mongo connection error',error)})

const Schema=new mg.Schema({
    name:{type:String,required:true},
    age:{type:Number,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    mobile:{type:Number,required:true}
})

const User=mg.model('User',Schema);

// const SecretKey='xyycvzzct';

app.post('/add',async(req,res)=>{
    try{
        const {name,age,email,password,mobile}=req.body;
        if(!email || !password || !mobile || !name || !age){
            return res.json({status:'error',message:'plz fillup all fields...'})
        }
        const emailcheck=await User.findOne({email});
        const mobilecheck=await User.findOne({mobile});
        if(emailcheck){
            return res.json({status:'error',message:'Email are wxists'})
        }
        if(mobilecheck){
            return res.json({status:'error',message:'number are wxists'})
        }
        if(mobile.toString().length!=10){
            return res.json({status:'error',message:'number is not 10 digits'})
        }
        if(!(password.length>5 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[^A-Za-z0-9]/.test(password)) ){
            return res.json({status:'error',message:'Password must contain uppercase, lowercase, symbol and minimum length 6'})
        }
        const user=new User({name,age,email,password,mobile});
        await user.save();
        // const token=jwt.sign({id:user._id,email:user.email},SecretKey,{expiresIn:'1D'});
        return res.json({status:'ok',message:'Added successfull'});
    }
    catch(error){
        console.log('error in adding data',error);
        return res.json({status:'error',message:'error in adding data'})
    }
})
app.get('/',async(req,res)=>{
    try{
        const user=await User.find()
        // console.log('fetching data....');
        return res.json({status:'ok',message:'Your Data',user})
    }
    catch(error){
        console.log('error is data fetching');
        return res.json({status:'error',message:'error in fetching'});
    }
})

app.put('/update/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const {age,email,password,mobile}=req.body;
        if(!email || !password || !mobile || !age){
            return res.json({status:'error',message:'plz fillup all fields...'})
        }
        if(mobile.toString().length!=10){
            return res.json({status:'error',message:'number is not 10 digits'})
        }
        if(!(password.length>5 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[^A-Za-z0-9]/.test(password)) ){
            return res.json({status:'error',message:'Password must contain uppercase, lowercase, symbol and minimum length 6'})
        }
        const exitsUser=await User.findById(id);
        if(email != exitsUser.email){
            const emailExits=await User.findOne({
                email,
                _id:{$ne:id}
            })
            if(emailExits){
                return res.json({status:'emailerror',message:'Email already exits...'});
            }
            else{
            console.log('email does not exits in other persons ids')}
        }
        if(mobile != exitsUser.mobile){
            const mobileExits=await User.findOne({
                mobile,
                _id:{$ne:id}
            })
            if(mobileExits){
                return res.json({status:'mobileerror',message:'Mobile number already exits...'});
            }
            else{
            console.log('mobile number does not exits in other persons ids')}
        }
        const udata=await User.findByIdAndUpdate(
            id,
            {age,email,password,mobile},{new:true}
        )
        if(udata){
            return res.json({status:'ok',message:'Data Updated Successfully',user:udata});
        }
        else{
            return res.json({status:'error',message:'Data Updatedion failed'});
        }
    }
    catch(error){
        console.log('error in updating data');
        return res.json({status:'error',message:'error in updating data...'})
    }

})

app.delete('/delete/:name',async(req,res)=>{
    try{
        const name=req.params.name;
        const deleteData=await User.findOneAndDelete({name})
        if(deleteData){
            return res.json({status:'ok',message:`${name} its data deleted succefully`});
        }
        else{
            return res.json({status:'error',message:'Data deletion failed'});
        }
    }
    catch(error){
        console.log('error in deliting data');
        return res.json({status:'error',message:'error in deleting data...'})
    }
})
app.listen(1706,()=>{
    console.log('server run in port 1706');
})
