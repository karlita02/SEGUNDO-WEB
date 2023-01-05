const { model, Schema } = require('mongoose');

const EspacioParqueoSchema = Schema(   {
    descripcion:{
        type: String,
        required: [ true, 'La descripcion deben ser requerida'],
       
    }
}
);

module.exports = model('EspacioParqueo', EspacioParqueoSchema );
