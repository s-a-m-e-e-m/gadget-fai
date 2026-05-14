import Gadget from "../models/gadget.model.js";

export const getPaginatedSmartphones = async (req, res) => {
    try {
        const start = parseInt(req.query.start) || 0;
        const gadgets = await Gadget.find({ category: "Smartphones" }).select("-rawData -__v -sourceType -createdAt -sourceFile -updatedAt").sort({ createdAt: -1 }).lean().skip(start).limit(50);
        return res.status(200).json({
            gadgets: gadgets
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const getPaginatedLaptops = async (req, res) => {
    try {
        const start = parseInt(req.query.start) || 0;
        const gadgets = await Gadget.find({ category: "Laptops" }).select("-rawData -__v -sourceType -createdAt -sourceFile -updatedAt").sort({ createdAt: -1 }).lean().skip(start).limit(50);
        return res.status(200).json({
            gadgets: gadgets
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const getAffordableSmartphones = async (req, res) =>  {
    try {
        const gadgets = await Gadget.find({ category: "Smartphones" }).select("-rawData -__v -sourceType -createdAt -sourceFile -updatedAt").sort({ price: 1 }).lean().limit(50);
        return res.status(200).json({
            gadgets: gadgets
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const getAffordableLaptops = async (req, res) =>  {
    try {
        const gadgets = await Gadget.find({ category: "Laptops" }).select("-rawData -__v -sourceType -createdAt -sourceFile -updatedAt").sort({ price: 1 }).lean().limit(50);
        return res.status(200).json({
            gadgets: gadgets
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const getTopRatedSmartphones = async (req, res) =>  {
    try {
        const gadgets = await Gadget.find({ category: "Smartphones" }).select("-rawData -__v -sourceType -createdAt -sourceFile -updatedAt").sort({ normalizedRating: -1 }).lean().limit(50);
        return res.status(200).json({
            gadgets: gadgets
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const getTopRatedLaptops = async (req, res) =>  {
    try {
        const gadgets = await Gadget.find({ category: "Laptops" }).select("-rawData -__v -sourceType -createdAt -sourceFile -updatedAt").sort({ normalizedRating: -1 }).lean().limit(50);
        return res.status(200).json({
            gadgets: gadgets
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const getGadgetsByBrand = async (req, res) => {
    const { brand } = req.body;
    try {
        const gadgets = await Gadget.find({ brand: brand }).select("-rawData -__v -sourceType -createdAt -sourceFile -updatedAt").sort({ createdAt: -1 }).lean();
        return res.status(200).json({
            gadgets: gadgets
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const getGadgetById = async (req, res) => {
    const { id } = req.params;
    try {
        const gadget = await Gadget.findById(id);
        if (!gadget) {
            return res.status(404).json({
                message: "Gadget not found"
            });
        }
        return res.status(200).json({
            gadget: gadget
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}