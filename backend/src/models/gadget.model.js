import mongoose from "mongoose";

const gadgetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Smartphones', 'Laptops', 'Tablets', 'Wearables', 'Smart Home Devices', 'Audio Devices', 'Gaming Consoles', 'Cameras', 'Drones', 'Other'],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    specifications: {
        type: [String],
        required: true
    }
}, { timestamps: true })

const Gadget = mongoose.model("Gadget", gadgetSchema);
export default Gadget;