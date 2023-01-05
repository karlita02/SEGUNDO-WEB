const express = require("express");
const cors = require('cors');
const app = express();


const Espacio = require('./models/EspacioParqueo');



app.use(express.json());
app.use(cors());



app.get("/api/v2/espacio", async (req,res)=>{
    const espacio = await Espacio.find();
    return res.send(espacio);
})

app.post("/api/v2/espacio", async (req,res)=>{
    const { descripcion} =  req.body;
    
    const espacio = new Espacio({ descripcion})

    await espacio.save()
  
    res.status(201).json(espacio);
})


app.put("/api/v2/espacio/:id", async (req,res)=>{
    const {id} = req.params;
    const {...data } =  req.body;
    console.log(id,data)
    const espacioupdate =  await Espacio.findByIdAndUpdate(id,data )
    res.json(espacioupdate);
})

app.delete("/api/v2/espacio/:id", async (req,res)=>{
    const {id} = req.params;
    await Espacio.findByIdAndDelete(id)
    res.json(`Espacio de parqueo eliminado exisotamente`);
})

module.exports= app;