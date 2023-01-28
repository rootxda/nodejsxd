const express = require("express");
const tourController = require("./../controllers/tourControllers");
const router = express.Router();
router
  .route("/")
  .get(tourController.getAlltours)
  .post(tourController.createTour);

router
  .route("/:id")
  .get(tourController.getTour)
  .delete(tourController.deleteTour);

module.exports = router;
