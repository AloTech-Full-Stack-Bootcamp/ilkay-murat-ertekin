const express = require("express");
const router = express.Router();
const adminController =require('../controllers/adminController')
const {isAuthenticated,isAdmin} = require('../middleware/permission')

router.route("/users").get(isAuthenticated,isAdmin,adminController.getAlluser);
router.route("/:id").delete(adminController.deleteUser);
router.route("/:id").get(adminController.getUser);



module.exports = router;