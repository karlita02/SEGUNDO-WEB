const { Router } = require('express');
const { check } =  require('express-validator')

const {
    getParqueos, 
    getParquear,
    createParquear,
    updateParquear,
    deleteParquear
} = require('../controllers/parquear');

const { validateFields } = require('../middlewares')

const router= Router();

router.get('/', getParqueos );

router.get('/:id',
            [ check('id', 'Este no es un ID de Mongo correcto')
            .isMongoId(), 
            validateFields],
getParquear );


 router.post('/',
        [ check('fecha')
        .not()
        .isEmpty().withMessage('La fecha no puede estar vacía'),
        check('hora')
        .not()
        .isEmpty().withMessage('La hora no debe estar vacía'),
        check('fechafin')
        .not()
        .isEmpty().withMessage('nLa fecha fin no puede estar vacía'),
        check('horafin')
        .not()
        .isEmpty().withMessage('La hora fin no puede estar vacía '),
        validateFields],
 createParquear);


 router.put('/:id',
 [  check('id','Debe ser un id de mongo VALIDO').isMongoId(),
 validateFields],
 updateParquear);

 router.delete('/:id',
 [  check('id','Debe ser un id de mongo VALIDO').isMongoId(),
 validateFields],
 deleteParquear);



module.exports = router;