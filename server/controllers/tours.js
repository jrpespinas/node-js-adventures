const { query } = require('express');
const { json } = require('express/lib/response');
const fs = require('fs');
const Tour = require('../models/tours');
const { APIFilters } = require('../utils/queryFilters');

/**
 * Updates a goal given an id.
 *
 * @access private
 * @route POST /api/v1/tours
 *
 * @param {string} req request
 * @param {string} res response
 *
 */
const createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: { tour },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

/**
 * Updates a goal given an id.
 *
 * @access private
 * @route GET /api/v1/tours
 *
 * @param {string} req request
 * @param {string} res response
 *
 */
const getAllTours = async (req, res) => {
  try {
    // pagination

    // execute query
    const features = new APIFilters(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

    // send response
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: tours,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

/**
 * Updates a goal given an id.
 *
 * @access private
 * @route GET /api/v1/tours/:id
 *
 * @param {string} req request
 * @param {string} res response
 *
 */
const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

/**
 * Updates a goal given an id.
 *
 * @access private
 * @route PATCH /api/v1/tours/:id
 *
 * @param {string} req request
 * @param {string} res response
 *
 */
const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

/**
 * Updates a goal given an id.
 *
 * @access private
 * @route DELETE /api/v1/tours/:id
 *
 * @param {string} req request
 * @param {string} res response
 *
 */
const deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      message: 'tour deleted',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

/**
 * Obtain insights from the data
 *
 * @access private
 * @route GET /api/v1/tours/tours-stats
 *
 * @param {string} req request
 * @param {string} res response
 *
 */
const getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: {
          avgPrice: 1,
        },
      },
      // {
      //   $match: { _id: { $ne: 'EASY' } },
      // },
    ]);

    res.status(200).json({
      status: 'success',
      data: { stats },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const getMonthlyPlan = async (req, res) => {
  try {
    const year = parseInt(req.params.year);
    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },

      {
        $group: {
          _id: { $month: '$startDates' },
          numTours: { $sum: 1 },
          tours: { $push: '$name' },
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: { numTourSTarts: -1 },
      },
      // {
      //   $limit: 12,
      // },
    ]);

    res.status(200).json({
      status: 'success',
      results: plan.length,
      data: { plan },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

module.exports = {
  getAllTours,
  getTour,
  updateTour,
  deleteTour,
  createTour,
  getTourStats,
  getMonthlyPlan,
};
