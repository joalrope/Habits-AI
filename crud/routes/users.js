const router = require('express').Router();
const { check } = require('express-validator');
const { fieldsValidator } = require('../middlewares/fields-validator');
//const { jwtValidator } = require('../middlewares/jwt-validator');
const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} = require('../controllers/users');

/*
    Rutas de Usuarios (users routes)
    host + api/users
*/

//Todas las rutas deben pasar por la Validacion del Token
//router.use(jwtValidator);

//Obtener usuarios
router.get('/', getUsers);

//Crear un nuevo usuario
router.post(
  '/',
  [
    check('name').exists().withMessage('El Titulo es Obligatorio'),
    fieldsValidator,
  ],
  createUser
);

//Actualizar informacion de un usuario
router.put('/:id', updateUser);

//Eliminar un usuario
router.delete('/:id', deleteUser);

module.exports = router;
