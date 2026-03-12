import errorHandler from "../../ErrorHandlers/errorHandler.js";

const signOut = async (req, res, next) => {
    try {
        res.clearCookie("access_token", {
            httpOnly: true,
            secure: true,  
            sameSite: "lax", 
        });
        res.status(201).json({
            success: true,
            message: `Sign out successfully`
        })
    }
    catch (error) {
        next(errorHandler(500, error.message || "Internal Server Error"));
    }
}
export default signOut;