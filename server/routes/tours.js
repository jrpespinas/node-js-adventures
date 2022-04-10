const express = require("express");
const router = express.Router();
const {
  getAllTours,
  getTour,
  updateTour,
  deleteTour,
  createTour,
} = require("../controllers/tours");

router.route("/api/v1/tours").get(getAllTours).post(createTour);
router
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

module.exports = router;
