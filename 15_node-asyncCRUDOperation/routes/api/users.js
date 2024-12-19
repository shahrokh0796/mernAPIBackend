const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../../config/roles_list");
const usersController = require("../../controllers/usersController");
const verifyRoles = require("../../middleware/verifyRoles");


router.route.get("/",
    verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)
    .delete("/", verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

router.route
.get("/:id", verifyRoles(ROLES_LIST.Admin), usersController.getUser);

module.exports = router;