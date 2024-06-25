const UserDaoMongo = require('../dao/mongo/userDao');
const userDao = new UserDaoMongo();

class UserService {
    async getUsers () {
        try {
            return await userDao.getUsers();
        } catch (error) {
            throw (error);
        }
    }

    async getUserById (userId) {
        try {
            return await userDao.getUserById(userId);
        } catch (error) {
            throw (error);
        }
    }

    async getUserByCredentials (userEmail, userPass) {
        try {
            return await userDao.getUserByCredentials(userEmail, userPass);
        } catch (error) {
            throw (error);
        }
    }

    async createUser (data) {
        try {
            return await userDao.createUser(data);
        } catch (error) {
            throw (error);
        }
    }

    async updateUser (userId, newData) {
        try {
            return await userDao.updateUser(userId, newData);
        } catch (error) {
            throw (error);
        }
    }

    async deleteUser (userId) {
        try {
            return await userDao.deleteUser(userId);
        } catch (error) {
            throw (error);
        }
    }
}

module.exports = UserService;