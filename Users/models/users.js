import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number
    },
    gender: {
        type: String,
    },
    authenticated: {
        type: Boolean,
        default: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    dob: {
        type: String
    },
    role: {
        type: String,
        default: 'customer',
    },
    profileImage: {
        type: String
    },
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "business"
    },
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "shippingAddress"
    }


});
UserSchema.pre('save', async function (next) {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();

    } catch (err) {
        next(err);
    }
})

//compile the schema to model
const users = mongoose.model("Users", UserSchema);

export default users;