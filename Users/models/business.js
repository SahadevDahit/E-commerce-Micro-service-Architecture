import mongoose from "mongoose";
const Schema = mongoose.Schema;

const businessSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    businessEmail: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    panNumber: {
        type: String,
    },
    website: {
        type: String,
    },

    logoUrl: {
        type: String
    },
    logoId: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }

});


//compile the schema to model
const business = mongoose.model("business", businessSchema);

export default business;