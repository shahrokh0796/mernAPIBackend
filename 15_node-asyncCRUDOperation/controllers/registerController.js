const User = require("../model/User");
const bcrypt = require("bcrypt");


const handleNewUser = async (req, res) => {
    const { user, password } = req.body;

    if (!user || !password) {
        return res.status(400).json({"message": `Username and Password are required`});
    }

    // check for duplicate username in db
    const duplicate = await User.findOne({username: user}).exec();
    if (duplicate) {
        return res.sendStatus(409); //Conflict
    }

    try {
        // encrypt the password
        const hashedPass = await bcrypt.hash(password, 10);
        // create and store the new user
        const result = await User.create({ 
            "username": user,
            "password": hashedPass
         });
        // console.log(result, " <---result"); 
        res.status(201).json({"Success": `New User ${user} created!`});
    } catch (err) {
        console.log(err);
    }
}

module.exports = { handleNewUser };