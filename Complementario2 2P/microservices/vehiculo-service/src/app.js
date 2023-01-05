const express = require("express");
const cors = require('cors');


const app = express();


const Vehiculo = require('./models/Vehiculo');



app.use(express.json());
app.use(cors());



app.get("/api/v2/vehiculo", async (req,res)=>{
    const vehiculo = await Vehiculo.find();
    return res.send(vehiculo);
})

app.post("/api/v2/vehiculo", async (req,res)=>{
    const { descripcion,placa,color } =  req.body;
    
    const vehiculo = new Vehiculo({ descripcion,placa,color})

    await vehiculo.save()
  
    res.status(201).json(vehiculo);
})

app.put("/api/v2/vehiculo/:id", async (req,res)=>{
    const {id} = req.params;
    const {...data } =  req.body;
    console.log(id,data)
    const vehiculoupdate =  await Vehiculo.findByIdAndUpdate(id,data )
    res.json(vehiculoupdate);
})

app.delete("/api/v2/vehiculo/:id", async (req,res)=>{
    const {id} = req.params;
    await Vehiculo.findByIdAndDelete(id)
    res.json(`Vehículo eliminado exitosamente`);
})




module.exports= app;