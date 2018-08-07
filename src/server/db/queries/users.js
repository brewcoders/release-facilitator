const knex = require('../connection');

function addUser(user) {
    return knex('users')
        .insert({
            username: user.username,
            password: user.password,
            firstname: user.firstname,
            lastname: user.lastname,
            teamid: user.teamid
        })
        .returning('*');
}

function getAllUsers() {
    return knex('users')
        .select('*');
}

function getSingleUser(id) {
    return knex('users')
        .select('*')
        .where({ id: parseInt(id) });
}

function updateUser(id, User) {
    return knex('users')
        .update(user)
        .where({ id: parseInt(id) })
        .returning('*');
}

function deleteUser(id) {
    return knex('users')
        .del()
        .where({ id: parseInt(id) })
        .returning('*');
}

module.exports = {
    getAllUsers,
    getSingleUser,
    addUser,
    updateUser,
    deleteUser
};