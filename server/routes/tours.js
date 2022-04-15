const express = require('express');
const router = express.Router();
const {
  getAllTours,
  getTourStats,
  getTour,
  updateTour,
  deleteTour,
  createTour,
} = require('../controllers/tours');
const { aliasTopTours } = require('../middleware/tours');

router.route('/').get(getAllTours).post(createTour);
router.route('/top-5-tours').get(aliasTopTours, getAllTours);
router.route('/tours-stats').get(getTourStats);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
