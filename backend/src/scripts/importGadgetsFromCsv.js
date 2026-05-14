import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { parse } from "csv-parse/sync";
import Gadget from "../models/gadget.model.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LAPTOP_CSV = path.resolve(__dirname, "../laptop_data.csv");
const SMARTPHONE_CSV = path.resolve(__dirname, "../smartphones - smartphones.csv");

const toNumber = (value) => {
    if (value === null || value === undefined) {
        return null;
    }

    const cleaned = String(value).replace(/[^\d.-]/g, "");
    if (!cleaned) {
        return null;
    }

    const parsed = Number(cleaned);
    return Number.isFinite(parsed) ? parsed : null;
};

const toInteger = (value) => {
    const parsed = toNumber(value);
    return parsed === null ? null : Math.trunc(parsed);
};

const compactSpecs = (values) => {
    return values
        .map((item) => (item === null || item === undefined ? "" : String(item).trim()))
        .filter(Boolean);
};

const deriveBrandFromModel = (model = "") => {
    const knownBrands = [
        "Apple",
        "Samsung",
        "OnePlus",
        "Xiaomi",
        "Motorola",
        "Realme",
        "Google",
        "Nokia",
        "Vivo",
        "Oppo",
        "Nothing",
        "iQOO",
        "Poco"
    ];

    const normalized = model.trim().toLowerCase();
    const matched = knownBrands.find((brand) => normalized.startsWith(brand.toLowerCase()));

    if (matched) {
        return matched;
    }

    const firstWord = model.trim().split(/\s+/)[0];
    return firstWord || "Unknown";
};

const readCsvRows = (filePath) => {
    const content = fs.readFileSync(filePath, "utf-8");
    return parse(content, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
        bom: true,
        relax_quotes: true,
        relax_column_count: true
    });
};

const mapLaptopRow = (row, rowIndex) => {
    const specs = compactSpecs([
        row.brand ? `Brand: ${row.brand}` : null,
        row.stars ? `Stars: ${row.stars}` : null,
        row.reviews_count ? `Reviews: ${row.reviews_count}` : null,
        row.list_price ? `List Price: ${row.price_currency || "$"}${row.list_price}` : null,
        row.discount_pct ? `Discount: ${row.discount_pct}%` : null,
        row.breadCrumbs ? `Category Path: ${row.breadCrumbs}` : null
    ]);

    return {
        name: row.title?.trim() || `Laptop ${rowIndex}`,
        description: row.description?.trim() || row.breadCrumbs?.trim() || "Affordable laptop for versatile use.",
        category: "Laptops",
        price: toNumber(row.price) ?? 0,
        priceCurrency: row.price_currency?.trim() || "USD",
        imageUrl: "",
        specifications: specs,
        brand: row.brand?.trim() || "",
        score: null,
        normalizedRating: toNumber(row.stars),
        reviewsCount: toInteger(row.reviews_count) ?? 0,
        sourceType: "laptop",
        sourceFile: path.basename(LAPTOP_CSV),
        sourceRow: rowIndex,
        rawData: row
    };
};

const mapSmartphoneRow = (row, rowIndex) => {
    const rating = toNumber(row.rating);
    const normalizedRating = rating === null ? null : rating > 5 ? Number((rating / 20).toFixed(2)) : rating;

    const specs = compactSpecs([
        row.sim,
        row.processor,
        row.ram,
        row.battery,
        row.display,
        row.camera,
        row.card,
        row.os
    ]);

    return {
        name: row.model?.trim() || `Smartphone ${rowIndex}`,
        description: specs.length > 0 ? specs.slice(0, 3).join(" | ") : "Smartphones for everyday use.",
        category: "Smartphones",
        price: toNumber(row.price) ?? 0,
        priceCurrency: "INR",
        imageUrl: "",
        specifications: specs,
        brand: deriveBrandFromModel(row.model || ""),
        score: rating,
        normalizedRating,
        reviewsCount: 0,
        sourceType: "smartphone",
        sourceFile: path.basename(SMARTPHONE_CSV),
        sourceRow: rowIndex,
        rawData: row
    };
};

// const upsertGadgets = async (gadgets) => {
//     if (gadgets.length === 0) {
//         return { matchedCount: 0, modifiedCount: 0, upsertedCount: 0 };
//     }

//     const operations = gadgets.map((gadget) => ({
//         updateOne: {
//             filter: {
//                 sourceType: gadget.sourceType,
//                 name: gadget.name,
//                 brand: gadget.brand
//             },
//             update: { $set: gadget },
//             upsert: true
//         }
//     }));

//     const result = await Gadget.bulkWrite(operations, { ordered: false });

//     return {
//         matchedCount: result.matchedCount,
//         modifiedCount: result.modifiedCount,
//         upsertedCount: result.upsertedCount
//     };
// };

// const run = async () => {
//     const mongoUrl = process.env.MONGO_DB_URL;

//     if (!mongoUrl) {
//         throw new Error("MONGO_DB_URL is missing in environment.");
//     }

//     const shouldClear = process.argv.includes("--clear");

//     await mongoose.connect(mongoUrl);
//     console.log("Connected to MongoDB");

//     try {
//         if (shouldClear) {
//             const deleted = await Gadget.deleteMany({ sourceType: { $in: ["laptop", "smartphone"] } });
//             console.log(`Deleted ${deleted.deletedCount} existing imported gadget records.`);
//         }

//         const laptopRows = readCsvRows(LAPTOP_CSV);
//         const smartphoneRows = readCsvRows(SMARTPHONE_CSV);

//         const laptopDocs = laptopRows.map((row, index) => mapLaptopRow(row, index + 1));
//         const smartphoneDocs = smartphoneRows.map((row, index) => mapSmartphoneRow(row, index + 1));

//         const allDocs = [...laptopDocs, ...smartphoneDocs];
//         const summary = await upsertGadgets(allDocs);

//         console.log(`Processed records: ${allDocs.length}`);
//         console.log(`Matched: ${summary.matchedCount}`);
//         console.log(`Modified: ${summary.modifiedCount}`);
//         console.log(`Inserted: ${summary.upsertedCount}`);
//     } finally {
//         await mongoose.disconnect();
//         console.log("Disconnected from MongoDB");
//     }
// };

// run().catch((error) => {
//     console.error("CSV import failed:", error.message);
//     process.exitCode = 1;
// });
