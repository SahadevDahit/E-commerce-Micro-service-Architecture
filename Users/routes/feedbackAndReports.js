import exppress from "express";
import {
    getFeedbackAndReports,
    getFeedbackAndReportsById,
    createFeedbackAndReport
} from "../controllers/feedbackAndReports.js";


const feedbackAndReports = exppress.Router();
feedbackAndReports.get('/all', getFeedbackAndReports);
feedbackAndReports.get('/:id', getFeedbackAndReportsById);
feedbackAndReports.post("/", createFeedbackAndReport);

export default feedbackAndReports;