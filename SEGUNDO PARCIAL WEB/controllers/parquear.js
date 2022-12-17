const { response, json, request } = require('express');
const Parquear = require('../models/parquear');



const getParqueos = async (req, res= response)=>{
        const parqueos =await  Parquear.find();
        return res.json({parqueos})
}


const getParquear = async (req=request, res= response)=>{
    const {id} = req.params
    const parqueo =  await Parquear.findById(id)
    res.json(parqueo);
}

const createParquear = async(req=request,res=response)=>{
    const { fecha, hora, fechafin, horafin } =  req.body;
    
    const parqueo = new Parquear({fecha, hora, fechafin, horafin})

    //se usa await para esperar el guardado en la bd
    await parqueo.save()
  
    res.status(201).json(parqueo);
}
const updateParquear = async(req,res =  response)=>{
    const {id} = req.params;
    const {...data } =  req.body;
    console.log(id,data)
    const updatedParqueo =  await Parquear.findByIdAndUpdate(id,data )
    res.json(updatedParqueo);
}
const deleteParquear =  async (req, res= response)=>{
    const {id} = req.params;
    await Parquear.findByIdAndDelete(id)
    
    res.json(`Ya se elimino el parqueo`);
}

 module.exports ={
    getParqueos, 
    getParquear,
    createParquear,
    updateParquear,
    deleteParquear
 }