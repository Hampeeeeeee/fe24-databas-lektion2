const bcrypt = require('bcryptjs')

const users = [

    {
        id: 666,
        username: "Alice",
        password: bcrypt.hashSync('password123', 8)
    },

    {
        id: 1337,
        username: "Bob",
        password: bcrypt.hashSync('password456', 8)
    }


];

module.exports = users;