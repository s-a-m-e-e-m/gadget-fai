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
    {
        name: "MacBook Pro 16-inch",
        description: "The MacBook Pro 16-inch offers a stunning Retina display, powerful performance with the M1 Pro chip, and an immersive audio experience.",
        category: "Laptops",
        price: 200000,
        imageUrl: "https://th.bing.com/th/id/OIP.2Kyrr9yU2f-DD1PmxRejMgHaE7?w=268&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        specifications: [
            "16-inch Retina",
            "512GB",
            "Apple M1 Pro"
        ]
    },
    {
        name: "Apple Watch Series 7",
        description: "The Apple Watch Series 7 features a larger display, enhanced durability, and advanced health monitoring capabilities for a comprehensive smartwatch experience.",
        category: "Wearables",
        price: 50000,
        imageUrl: "https://th.bing.com/th/id/OIP.TiXZExPhJCC-F8vcr5mgbQHaHa?w=181&h=181&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        specifications: [
            "1.9-inch Always-On Retina",
            "32GB",
            "Blood Oxygen, ECG"
        ]
    },
    {
        name: "Amazon Echo Dot (4th Gen)",
        description: "The Amazon Echo Dot (4th Gen) is a compact smart speaker with improved sound quality, a sleek design, and built-in Alexa for voice control of your smart home devices.",
        category: "Smart Home Devices",
        price: 5000,
        imageUrl: "https://th.bing.com/th/id/OIP.sR680mTpIOSJuvbZf-nL4gHaG0?w=218&h=200&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        specifications: [
            "N/A",
            "N/A",
            "Alexa"
        ]
    },
    {
        name: "Sony WH-1000XM4",
        description: "The Sony WH-1000XM4 headphones offer industry-leading noise cancellation, exceptional sound quality, and a comfortable design for an immersive audio experience.",
        category: "Audio Devices",
        price: 30000,
        imageUrl: "https://th.bing.com/th/id/OIP.o9OPFBeUxw2tVJAo7BNiVgHaHa?w=185&h=185&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        specifications: [
            "30 hours",
            "Industry-leading",
            "Bluetooth 5.0"
        ]
    },
    {
        name: "Nintendo Switch",
        description: "The Nintendo Switch is a versatile gaming console that can be used as a handheld device or connected to a TV for a traditional gaming experience.",
        category: "Gaming Consoles",
        price: 25000,
        imageUrl: "https://th.bing.com/th/id/OIP.Wop1jzLvGmMAsBAokBWmOQHaFP?w=249&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        specifications: [
            "6.2-inch LCD",
            "32GB",
            "4.5 to 9 hours"
        ]
    },
    {
        name: "Canon EOS R5",
        description: "The Canon EOS R5 is a high-performance mirrorless camera that offers exceptional image quality, advanced autofocus, and 8K video recording capabilities.",
        category: "Cameras",
        price: 350000,
        imageUrl: "https://th.bing.com/th/id/OIP.-T71xExOkDZmUiqxGh6ogAHaHa?w=176&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        specifications: [
            "3.6-inch LCD",
            "128GB",
            "45MP Full-Frame CMOS"
        ]
    }
]

const connectToDB = async () => {
    const primaryUrl = process.env.MONGO_DB_URL;

    try {
        await mongoose.connect(primaryUrl);
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