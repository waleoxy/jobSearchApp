const notFoundMiddleware = (req, res) => {
  res.status(404).send({ msg: "Route does not exist" });
};

export default notFoundMiddleware;
