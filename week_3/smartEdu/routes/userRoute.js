const express=require('express')
const router=express.Router()
const userController=require('../controllers/userController')




router.route('/').get(userController.getAlluser)
router.route('/register').post(userController.createUser)
router.route('/login').post(userController.loginUser)
router.route("/logout").get(userController.logoutUser)




module.exports = router