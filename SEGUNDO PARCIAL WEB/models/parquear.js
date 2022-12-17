const { model, Schema } = require('mongoose');

const ParquearSchema = Schema(   {
    fecha:{
        type: String,
        required: [ true, 'La fecha debe ser requerida'],
       
    },
    hora:{
        type: String,
        required: [ true, 'La hora debe ser requerida'],
    },
    fechafin:{
        type: String,
        required: [ true, 'La fechafin debe ser requerida'],
    },
    horafin:{
        type: String,
        required: [ true, 'La horafin debe ser requerida'],
    },
}
);

module.exports = model('Parquear', ParquearSchema );
