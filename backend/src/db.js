import mongoose, { set } from "mongoose";
import Gadget from "./models/gadget.model.js";

const gadgets = [
    {
        name: "iPhone 13 Pro",
        description: "The iPhone 13 Pro features a sleek design, powerful A15 Bionic chip, and an advanced camera system for stunning photos and videos.",
        category: "Smartphones",
        price: 100000,
        imageUrl: "https://th.bing.com/th/id/OIP.qwRHZevw6LsAGdBto9FCeAHaHa?w=187&h=187&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        specifications: [
            "6.1-inch Super Retina XDR",
            "128GB",
            "Triple-camera system"
        ]

    },
    
]

const connectToDB = async () => {

    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        // Gadget.deleteMany({})
        // .then(() => console.log('Existing gadgets deleted successfully'))
        // .catch((error) => console.error('Error deleting existing gadgets:', error));

        // setTimeout(() => {
        //     console.log('Inserting gadgets into the database...');
        //  }, 2000);
        // Gadget.insertMany(gadgets)
        // .then(() => console.log('Gadgets inserted successfully'))
        // .catch((error) => console.error('Error inserting gadgets:', error));

        console.log('connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

export default connectToDB