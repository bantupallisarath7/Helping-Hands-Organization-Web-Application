import express from "express"
import createFeedback from "../Controllers/feedbackController/createFeedback.js"
import getAllFeedbacks from "../Controllers/feedbackController/getAllFeedbacks.js";
import updateFeedback from "../Controllers/feedbackController/updateFeedback.js";
import deleteFeedback from "../Controllers/feedbackController/deleteFeedback.js";

const router = express.Router()

router.post("/add", createFeedback);
router.get("/all", getAllFeedbacks);
router.put("/update/:feedbackId", updateFeedback);
router.delete("/delete/:feedbackId", deleteFeedback);

export default router;