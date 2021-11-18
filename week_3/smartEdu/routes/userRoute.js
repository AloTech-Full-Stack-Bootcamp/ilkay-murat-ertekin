const express = require("express");
const router = express.Router();
const userController =require('../controllers/userController')
const {isAuthenticated,permRole} = require('../middleware/permission')

// Permission middleware
router.use('/',isAuthenticated) 
// User Routing
router.route("/").get(userController.getAlluser);
router.route("/:id").get(userController.getUser);
router.route("/:id").delete(userController.deleteUser);




module.exports = router;