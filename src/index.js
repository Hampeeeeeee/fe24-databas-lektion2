require('dotenv').config();
const express = require("express");
const users = require('./users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.post('/login', (req, res) => {
    // read username and password from body
    const {username, password} = req.body;
    // find the user in the "in memory database"
    const user = users.find(
        u => u.username === username
    );
    // send an error if the user wasn't found
    if (!user) return res.status(400).json({
        message: "Invalid credentials"
    });
    // Validate password
    const passwordIsValid = bcrypt.compareSync(
        password,
        user.password
    );
    // send an error if the password wasn't found
    if (!passwordIsValid) return res.status(400).json({
        message: "Invalid credentials"
    });
    // Create JWT-token
    const token = jwt.sign(
        // Payload
        {
            userId: user.id,
            username: user.username
        },
        // Secret 
        process.env.JWT_SECRET,
        // Option
        {
            expiresIn: '1h'
        }
    );
    // Send the token to the client
    res.json({
        token
    });
});




app.listen(PORT, () =>{
    console.log(`Server running on http://localhost:${PORT}`);
});