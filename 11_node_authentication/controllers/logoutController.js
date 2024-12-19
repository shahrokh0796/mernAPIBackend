const usersDB = {
    users: require("../model/users.json"),
    setUsers: function (data) { this.users = data; }
}

const fsP = require("fs").promises;
const path = require("path");

const handleLogout = async (req, res) => {
    // On client, also delete the access token

    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(204); // successfull, no content 
    const refreshToken = cookies.jwt;

    // Is refreshToken in DB?
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) {
        res.clearCookie('jwt', {httpOnly: true});
        return res.sendStatus(204);
    }

    // Delete refreshToken in DB
    const otherUsers = usersDB.users.filter((person) => person.refreshToken !== refreshToken);

    const currentUser = {...foundUser, refreshToken: ''};
    usersDB.setUsers([...otherUsers, currentUser]);

    await fsP.writeFile(
        path.join(__dirname, "..", "model", "users.json"), 
        JSON.stringify(usersDB.users)
    );

    res.clearCookie("jwt", { httpOnly: true, sameSite: 'None', secure: true }); //secure: true - only serves on https

    res.sendStatus(204);

}

module.exports = { handleLogout };