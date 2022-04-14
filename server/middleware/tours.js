/**
 * Modify request to filter top 5 and cheap tours
 *
 * @route POST /api/v1/tours/top-5-tours
 */

const aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

module.exports = { aliasTopTours };
