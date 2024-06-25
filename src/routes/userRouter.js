const { Router } = require('express');
const userRouter = Router();
const UserController = require('../controllers/userController');
const userController = new UserController();

userRouter.get('/', userController.getUsers);

userRouter.get('/:uid', userController.getUserById);

userRouter.get('/', userController.getUserByCredentials);

userRouter.post('/', userController.createUser);

userRouter.put('/:uid', userController.updateUser);

userRouter.delete('/:uid', userController.deleteUser);

module.exports = userRouter;