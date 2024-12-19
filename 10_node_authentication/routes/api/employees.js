const express = require("express");
const router = express.Router();
const employeescontroller = require("../../controllers/employeesController");


router.route("/")
.get(employeescontroller.getAllEmployees)
.post(employeescontroller.createNewEmployee)
.put(employeescontroller.updateEmployee)
.delete(employeescontroller.deleteEmployee);

router.route("/:id")
.get( employeescontroller.getEmployee );

module.exports = router;