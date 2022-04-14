const { json } = require('express/lib/response');
const fs = require('fs');
const Tour = require('../models/tours');

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
    const tours = await Tour.find();

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

module.exports = {
  getAllTours,
  getTour,
  updateTour,
  deleteTour,
  createTour,
};
