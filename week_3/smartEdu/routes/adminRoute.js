const express = require("express");
const router = express.Router();
const adminController =require('../controllers/adminController')
const {isAuthenticated,permRole} = require('../middleware/permission')

// Permission middleware
router.use('/',isAuthenticated,permRole(['admin'])) 
// Admin Routing
router.route("/users").get(adminController.getAlluser);
router.route("/user/:id").delete(adminController.deleteUser);
router.route("/user/:id").get(adminController.getUser);



module.exports = router;