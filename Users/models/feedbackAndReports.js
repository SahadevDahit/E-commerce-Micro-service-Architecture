import mongoose from "mongoose";
const Schema = mongoose.Schema;

const feedbackAndReportSchema = new Schema({
   
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: [true, "Please add a message"],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },

}, {
    timestamps: true,
});

const feedbackAndReport = mongoose.model("feedbackAndReports", feedbackAndReportSchema);

export default feedbackAndReport;