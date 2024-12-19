const User = require("../model/User");


const getAllUsers = async (req, res) => {
    const users = User.find();
    
    if (!users) res.status(204).json({"message": `No users found`});

    res.json(users);
}


const deleteUser = async (req, res) => {

    if (!req?.body?.id) res.status(400).json({ "message": "User id required"});

    const user = await User.findOne({ _id: req.body.id}).exec();
    if (!user) {
        return res.status(204).json({"message": `No user found with id ${req.body.id}`});
    }

    const result = await User.deleteOne({_id: req.user.id});
    res.json(result);
}

const getUser = async (req, res) => {
    if (!req.params?.id) {
        return res.status(400).json({ "message ": "User ID required"});
    }
    const user = await User.findOne({ _id: req.params.id }).exec();

    if (!user) {
        return res.status(204).json({"message": `User ID ${req.params.is} not found`});
    }

    res.json(user);
}

module.exports = {
    getAllUsers,
    deleteUser,
    getUser
}