const { Router } = require('express');
const sessionRouter = Router();
const UserService = require('../services/userService');
const userService = new UserService();
const userValidator = require('../middlewares/userValidator');

sessionRouter.post('/register', userValidator, async (req, res, next) => {
    try {
        const data = req.body;
        const newUser = await userService.createUser(data);
        
        return res.send({message: 'User registered'});
    } catch (error) {
        next (error);
    }
})

sessionRouter.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userService.getUserByCredentials(email, password);
        req.session.user = user;

        return res.send({message: 'Logged in'});
    } catch (error) {
        next (error);
    }
})

sessionRouter.get('/logout', async (req, res, next) => {
    try {
        req.session.destroy();
        return res.send({message: 'Logged out'});
    } catch (error) {
        next (error);
    }
})

module.exports = sessionRouter;