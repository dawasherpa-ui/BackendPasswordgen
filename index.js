const express=require("express")
const generator =require("generate-password")
const bodyParser = require('body-parser')
const app=express()
const cors = require('cors');
const PORT=process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({
    origin: 'https://password-generator-three-roan.vercel.app/'
  }));
app.get("/",(req,res)=>{
    res.send({msg:"Hello World"})
})
app.post("/",async(req,res)=>{
console.log(req.body)
try{
const {length,number,symbol,lowercase,uppercase,exsimlar,exclude,strict,multiple}=req.body
let pass;
if(multiple){
    pass=generator.generateMultiple(multiple,{
        length:length||10,
        numbers: number || false,
        symbols : symbol  || false ,
        lowercase : lowercase || false,
        uppercase : uppercase || false,
        excludeSimilarCharacters:exsimlar || false,
        exclude : exclude || [],
        strict : strict || false
    })
    console.log(pass);
    res.json([{password:pass}])
}
else{
pass=generator.generate({
    length:length||10,
    numbers: number || false,
    symbols : symbol  || false ,
    lowercase : lowercase || false,
    uppercase : uppercase || false,
    excludeSimilarCharacters:exsimlar || false,
    exclude : exclude || [],
    strict : strict || false
})
console.log(pass);
res.json([{password:pass}])
}
}
catch(err){
    console.log(err.message)
    res.json([{error:err.message}])
}
})

app.listen(PORT,()=>{
    console.log("server is running in port ",PORT)
})
