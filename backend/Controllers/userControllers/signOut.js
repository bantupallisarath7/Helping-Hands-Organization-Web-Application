import errorHandler from "../../ErrorHandlers/errorHandler.js";

const signOut = async (req, res, next) => {
    try {
        res.clearCookie("access_token");
        res.status(201).json({
            success: true,
            message: `${req.user.role === "admin" ? "Admin" : "User"} Sign out successfully`
        })
    }
    catch (error) {
        next(errorHandler(500, error.message || "Internal Server Error"));
    }
}
export default signOut;