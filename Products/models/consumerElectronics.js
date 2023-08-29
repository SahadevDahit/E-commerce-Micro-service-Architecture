import mongoose from 'mongoose';
const ConsumerElectronicsSchema = new mongoose.Schema({
    sound: {
        type: String,
    },
    battery: {
        type: String,
    },
    storage: {
        type: String,
    },
    chipset: {
        type: String,
    },
    processor: {
        type: String,
    },
    camera: {
        type: String,
    },
    connectivity: {
        type: String,
    },
    display: {
        type: String,
    },
    operatingSystem: {
        type: String,
    }
});

const ConsumerElectronics = mongoose.model('consumerElectronics', ConsumerElectronicsSchema);

export default ConsumerElectronics;