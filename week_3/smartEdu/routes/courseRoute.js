const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const permission = require('../middleware/permission')

// Course Routes
router.route("/").get(courseController.getAllCourses);
router.route("/").post(permission.isAuthenticated,courseController.createCourse);
router.route("/:slug").get(courseController.getCourseBySlug);
router.route("/:slug").put(courseController.putCourse);
router.route("/:slug").delete(courseController.deleteCourse);

module.exports = router;
