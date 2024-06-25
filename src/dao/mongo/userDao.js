const userModel = require('./models/userModel');

class UserDaoMongo {
    async getUsers(){
        try {           
            const users = await userModel.find();
            return users;
        } catch (error) {
            throw (error);
        }
    }

    async getUserById(userId){
        try {
            const user = await userModel.findById(userId);

            if (user){
                return user;
            } else {
                throw new Error(`Usuario no encontrado`);
            }
        } catch (error) {
            throw (error);
        }
    }

    async getUserByCredentials(userEmail, userPass){
        try {
            const user = await userModel.findOne({ email: userEmail, password: userPass});

            if (user){
                return user;
            } else {
                throw new Error(`Credenciales inválidas`);
            }
        } catch (error) {
            throw (error);
        }
    }

    async createUser(data){
        try {
            const usernameExists = await userModel.findOne({username: data.username});
            const emailExists = await userModel.findOne({email: data.email});

            if (usernameExists){
                throw new Error(`Ya existe el nombre de usuario ${data.username}`);
            }
            if (emailExists){
                throw new Error(`Ya existe un usuario con el email ${data.email}`);
            }

            const newUser = await userModel.create(data);
            return newUser;
        } catch (error) {
            throw (error);
        }
    }

    async updateUser(userId, newData){
        try {
            const updatedUser = await userModel.findByIdAndUpdate(userId, newData, {new: true});
            
            if (updatedUser){
                return updatedUser;
            } else {
                throw new Error(`Usuario no encontrado`);
            }
        } catch (error) {
            throw (error);
        }
    }

    async deleteUser(userId){
        try {
            const deletedUser = await userModel.findByIdAndDelete(userId);

            if (deletedUser){
                return { 
                    id: userId, 
                    msg: `Usuario ID ${userId} eliminado correctamente` 
                };
            } else {
                throw new Error(`Usuario no encontrado`);
            }
        } catch (error) {
            throw (error);
        }
    }
}

module.exports = UserDaoMongo;