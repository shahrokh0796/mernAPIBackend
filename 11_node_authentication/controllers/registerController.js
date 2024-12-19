const usersDB = {
    users: require("../model/users.json"),
    setUsers: function(data) { return this.users = data;}
}

const fsP = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");


const handleNewUser = async (req, res) => {
    const { user, password } = req.body;

    if (!user || !password) {
        return res.status(400).json({"message": `Username and Password are required`});
    }

    // check for duplicate username in db
    const duplicate = usersDB.users.find((person) => person.username === user);
    if (duplicate) {
        return res.sendStatus(409); //Conflict
    }

    try {
        // encrypt the password
        const hashedPass = await bcrypt.hash(password, 10);
        // store the new user
        const newUser = { "username": user, "password": hashedPass };
        console.log(newUser, " <--newuser");
        usersDB.setUsers([...usersDB.users, newUser]);
        await fsP.writeFile(path.join(__dirname, "..", "model", "users.json"), JSON.stringify(usersDB.users));
        res.status(201).json({"Success": `New User ${user} created!`});
    } catch (err) {
        console.log(err);
    }
}

module.exports = { handleNewUser };