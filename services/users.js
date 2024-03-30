const {Users} = require('../models');

async function getUsers(){
    try {
        const users = await Users.findAll();
        return users;
    } catch (error) {
        throw new Error("Error al encontrar usuarios");
    }
}

module.exports = {getUsers};