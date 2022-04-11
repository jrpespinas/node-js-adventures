const express = require("express");
const router = express.Router();
const {
  getAllTours,
  getTour,
  updateTour,
  deleteTour,
  createTour,
} = require("../controllers/tours");
const { checkBody, checkId } = require("../middleware/tours");

router.param("id", checkId);
router.route("/").get(getAllTours).post(checkBody, createTour);
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
