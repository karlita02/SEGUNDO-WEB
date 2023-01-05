import './style.css'
import axios from 'axios'
import { IResParqueo, Parqueo } from './interfaces/IParqueo';
const httpAxios =  axios.create({
  baseURL:'http://localhost:5000',
})



const app = document.querySelector<HTMLDivElement>('#app')!
//#region mapa de elementos
const etiqueta = document.createElement("label")
etiqueta.textContent="ID"
const input = document.createElement("input");
input.id="id"
etiqueta.htmlFor="id"
app.appendChild(etiqueta);
app.appendChild(input);
app.innerHTML += `

<label for ="fecha">fecha</label><input id="fecha"/>
<label for ="hora">hora</label><input id="hora"/>
<label for ="fechafin">fechafin</label><input id="fechafin"/>
<label for ="horafin">horafin</label><input id="horafin"/>
<button id="new" >New</button>
<button id="save" >Save</button>
<button id="query" >Query</button>
<div id="body"/>
`
const newb = document.querySelector<HTMLButtonElement>('#new')!
const save = document.querySelector<HTMLButtonElement>('#save')!
const query = document.querySelector<HTMLButtonElement>('#query')!

const id = document.querySelector<HTMLInputElement>('#id')!


const fecha = document.querySelector<HTMLInputElement>('#fecha')!
const status = document.querySelector<HTMLInputElement>('#status')!
const hora = document.querySelector<HTMLInputElement>('#hora')!
const fechafin = document.querySelector<HTMLInputElement>('#fechafin')!
const horafin = document.querySelector<HTMLInputElement>('#horafin')!
const stock = document.querySelector<HTMLInputElement>('#stock')!
const body = document.querySelector<HTMLDivElement>('#body')!
//#endregion


newb.addEventListener('click',()=>{
  fecha.value=""
  hora.value=""
  fechafin.value=""
  horafin.value=""
  id.value=""
})
query.addEventListener('click', async ()=>{
  const respParqueos:IResParqueo 
  =  await (await httpAxios.get<IResParqueo>('parquear')).data;

    const tabla   = document.createElement("table")
    tabla.id="tabla"
    tabla.border="1"


    const { parqueos } = respParqueos;
    console.log(respParqueos)

    for (const product of parqueos)
    {
      const row = tabla.insertRow()
      const celda =  row.insertCell()
      celda.innerHTML=` <button class="boton" value="${product._id}" >${product.fecha}</button>`
      const celda2= row.insertCell()
      celda2.innerHTML=`${product.hora}`
    }
    body.innerHTML=``
    body.appendChild(tabla)
    document.querySelectorAll('.boton').forEach((ele:Element)=>{
      ele.addEventListener('click', async ()=>{
          const idx= (ele as HTMLButtonElement).value;
          const Parqueo:Parqueo 
          =  await (await httpAxios.get<Parqueo>(`parquear/${idx}`)).data;
          fecha.value= Parqueo.fecha;          
          hora.value= Parqueo.hora;  
          fechafin.value= Parqueo.fechafin;  
          horafin.value= Parqueo.horafin;  
          id.value= Parqueo._id!;  
           
      })
    })

  

    

  

})
save.addEventListener('click',async ()=>{
  const data:Parqueo = {
    fecha:fecha.value,
    fechafin:fechafin.value,
    hora:  hora.value,
    horafin:horafin.value,
  }
  // console.log(data);

  if (id.value.trim().length>0 )
  {
    //        
    const resp: Parqueo = await (await httpAxios.put<Parqueo>(`parquear/${id.value}`, data)).data
    console.log(resp)
    console.log(`El prducto ${resp.fecha} fue modificado con éxito`);
    
    return;
  }
  try {
    const resp: Parqueo =  await (await httpAxios.post<Parqueo>(`parquear`, data)).data
    console.log(`El Parqueo ${resp.fecha} fue grabado con éxito`);
  } catch (error) {
    if ( axios.isAxiosError(error)  )
    {
      console.log(error );
      
    }
    
  }
  
  
})