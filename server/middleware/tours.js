const checkId = (req, res, next, val) => {
  if (parseInt(req.params.id) > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "invalid id",
    });
  }
  next();
};

const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price)
    return res.status(400).json({
      status: "fail",
      message: "no name and price",
    });
  next();
};

module.exports = {
  checkBody,
  checkId,
};
