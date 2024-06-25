const UserService = require('../services/userService');
const userService = new UserService();

class UserController {
    async getUsers (req, res, next) {
        try {            
            const users = await userService.getUsers();

            return res.status(200).json(users);
        } catch (error) {
            next (error);
        }
    }

    async getUserById (req, res, next) {
        try {
            const { uid } = req.params;
            const user = await userService.getUserById(uid);
            
            return res.status(200).json(user);
        } catch (error) {
            next (error);
        }
    }

    async getUserByCredentials (req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await userService.getUserByCredentials(email, password);

            return res.status(200).json(user);
        } catch (error) {
            next (error);
        }
    }

    async createUser (req, res, next) {
        try {
            const data = req.body;
            const newUser = await userService.createUser(data);
    
            return res.status(201).json(newUser);
        } catch (error) {
            next (error);
        }
    }

    async updateUser (req, res, next) {
        try {
            const { uid } = req.params;
            const newData = req.body;
            const updatedUser = await userService.updateUser(uid, newData);
            
            return res.status(200).json(updatedUser);
        } catch (error) {
            next (error);
        }
    }

    async deleteUser (req, res, next) {
        try {
            const { uid } = req.params;
            const deletedUser = await userService.deleteUser(uid);
            
            return res.status(200).json({ message: deletedUser.msg });
        } catch (error) {
            next (error);
        }
    }
}

module.exports = UserController;