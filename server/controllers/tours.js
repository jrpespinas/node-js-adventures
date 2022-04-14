const { query } = require('express');
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
    // build query
    // Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'limit', 'fields'];
    excludedFields.forEach((params) => delete queryObj[params]);

    // Advanced filtering
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    let query = Tour.find(JSON.parse(queryString));

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // limiting fields
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // pagination
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit) || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error('This page does not exist');
    }

    // execute query
    const tours = await query;

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

module.exports = {
  getAllTours,
  getTour,
  updateTour,
  deleteTour,
  createTour,
};
