import mongoose from 'mongoose';
const apparelAndFashionSchema = new mongoose.Schema({
    designFeatures: {
        type: [String],
        default: [],
    },
    fitStyle: {
        type: String,
    },
    sizes: {
        type: [String],
        default: [],
    },
});

const apparelAndFashion = mongoose.model('apparelAndFashion', apparelAndFashionSchema);

export default apparelAndFashion;