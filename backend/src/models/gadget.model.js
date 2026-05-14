import mongoose from "mongoose";

const gadgetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ""
    },
    category: {
        type: String,
        enum: ["Smartphones", "Laptops", "Other"],
        default: "Other"
    },
    price: {
        type: Number,
        min: 0,
        default: 0
    },
    priceCurrency: {
        type: String,
        default: "USD"
    },
    imageUrl: {
        type: String,
        default: ""
    },
    specifications: {
        type: [String],
        default: []
    },
    brand: {
        type: String,
        default: ""
    },
    score: {
        type: Number,
        min: 0
    },
    normalizedRating: {
        type: Number,
        min: 0,
        max: 5
    },
    reviewsCount: {
        type: Number,
        min: 0,
        default: 0
    },
    sourceType: {
        type: String,
        enum: ["smartphone", "laptop"],
        required: true
    },
    sourceFile: {
        type: String,
        default: ""
    },
    sourceRow: {
        type: Number,
        min: 1
    },
    rawData: {
        type: Map,
        of: mongoose.Schema.Types.Mixed,
        default: {}
    }
}, { timestamps: true })

gadgetSchema.index(
    { sourceType: 1, name: 1, brand: 1 },
    {
        unique: true,
        partialFilterExpression: {
            sourceType: { $exists: true },
            name: { $exists: true },
            brand: { $exists: true }
        }
    }
);

const Gadget = mongoose.model("Gadget", gadgetSchema);
export default Gadget;