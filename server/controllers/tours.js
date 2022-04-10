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
const getAllTours = (res, req) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: { tours },
  });
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
const getTour = (req, res) => {
  const { id } = req.params;

  const tour = tours.find((el) => el.id === parseInt(id));

  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "invalid id",
    });
  }

  res.status(200).json({
    status: "success",
    data: { tour },
  });
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
const updateTour = (req, res) => {
  if (parseInt(req.params.id) > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "invalid id",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: "Updated tour here",
    },
  });
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
const deleteTour = (req, res) => {
  if (parseInt(req.params.id) > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "invalid id",
    });
  }

  res.status(200).json({
    status: "success",
    data: null,
  });
};

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
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

module.exports = {
  getAllTours,
  getTour,
  updateTour,
  deleteTour,
  createTour,
};
