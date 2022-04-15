const express = require('express');
const router = express.Router();
const {
  getAllTours,
  getTourStats,
  getTour,
  getMonthlyPlan,
  updateTour,
  deleteTour,
  createTour,
} = require('../controllers/tours');
const { aliasTopTours } = require('../middleware/tours');

router.route('/top-5-tours').get(aliasTopTours, getAllTours);
router.route('/tours-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
