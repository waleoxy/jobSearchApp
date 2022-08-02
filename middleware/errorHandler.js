import { StatusCodes } from "http-status-codes";
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log("err");
  const defaultError = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    msg: "something went wrong, try again later",
  };
  res.status(defaultError.statusCode).send({ msg: err });
};
export default errorHandlerMiddleware;
