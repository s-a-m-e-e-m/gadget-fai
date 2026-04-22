import Gadget from "../models/gadget.model.js";

export const getAllGadgets = async (req, res) => {
    try {
        const gadgets = await Gadget.find({});
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