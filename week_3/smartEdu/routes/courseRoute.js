const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

// Course Routes
router.route("/").get(courseController.getAllCourses);
router.route("/").post(courseController.createCourse);
router.route("/:slug").get(courseController.getCourseBySlug);
router.route("/:slug").put(courseController.putCourse);
router.route("/:slug").delete(courseController.deleteCourse);

module.exports = router;
