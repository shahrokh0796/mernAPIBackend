// function setUsers(data) {
//     usersDB.users = data;
// }

const usersDB = {
    users: require("../model/users.json"),
    setUsers: function (data) {return this.users = data;}
}
// setUsers.bind(usersDB);
 const fsPromises = require("fs").promises;
 const path = require("path");
 const bcrypt = require("bcrypt");


 const handleNewUser = async (req, res) => {
    const { user, password } = req.body;
    if (!user || !password) {
        return res.status(400).json({"message": `Username and Password are required`});
    }
    // check for duplicate usernames in db
    const duplicate = usersDB.users.find((person) => person.username === user);
    if (duplicate) return res.sendStatus(409); //conflict 
    try {
        // encrypt the password
        const hashedPass = await bcrypt.hash(password, 10);
        // store the new user
        const newUser = { "username": user, "password": hashedPass };
        usersDB.setUsers([...usersDB.users, newUser]); 
        // const setting = setUsers.bind(usersDB, [...usersDB.users, newUser]); //using bind to do the same thing as in the line above
        // setting();
        await fsPromises.writeFile(path.join(__dirname, "..", "model", "users.json"), JSON.stringify(usersDB.users));
        console.log(usersDB.users, "<--usersDB.users");
        res.status(201).json({"Success": `New user ${user} created!`});
    } catch (err) {
        res.status(500).json({"message": err.message});
    }
 }

 module.exports = { handleNewUser };