import errorHandler from "../ErrorHandlers/errorHandler.js";

const verifyAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return next(errorHandler(403, "Admin access required"));
  }
  next();
};

export default verifyAdmin;
