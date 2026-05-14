// ***********Smartphones*********
// gaming
// camera
// battery
// budget
// performance

// ***********Laptops***********
// gaming
// coding
// office work
// video editing
// student use

import Gadget from "../models/gadget.model.js";

// Helper: normalize and extract useful spec values from a gadget
function extractSpecs(gadget) {
    const text = ([])
        .concat(gadget.specifications || [])
        .concat(gadget.description || "")
        .join(" ")
        .toLowerCase();

    const getNumber = (re) => {
        const m = text.match(re);
        return m ? Number(m[1]) : null;
    };

    const mAh = getNumber(/(\d{3,5})\s?mAh/);
    const mp = getNumber(/(\d{2,3})\s?\s?mp/);
    const ram = getNumber(/(\d{1,3})\s?gb\s?(?:ram)?/);
    const storage = getNumber(/(\d{2,4})\s?gb\s?(?:storage|inbuilt|rom|ssd|hdd)?/);
    const refresh = getNumber(/(\d{2,3})\s?hz/);
    const chargingW = getNumber(/(\d{2,3})\s?w/);

    const hasFastCharging = /fast charging|quick charge|fastcharge|65w|45w|30w|120w|rapid charge/i.test(text);
    const hasDedicatedGPU = /nvidia|gtx|rtx|radeon|amd radeon|geforce/i.test(text);
    const cpuMatch = text.match(/(intel|i3|i5|i7|i9|ryzen|snapdragon|exynos|mediatek|m1|m2|apple m1|apple m2)/i);
    const hasSSD = /ssd|nvme|m.2/i.test(text);

    return {
        text,
        mAh,
        mp,
        ram,
        storage,
        refresh,
        chargingW,
        hasFastCharging,
        hasDedicatedGPU,
        cpu: cpuMatch ? cpuMatch[0] : null,
        hasSSD,
    };
}

// Scoring helpers return 0..1
const clamp01 = (v) => Math.max(0, Math.min(1, v));

function scoreSmartphoneByCategory(specs, gadget, category, priceScale) {
    const rating = gadget.normalizedRating ? clamp01(gadget.normalizedRating / 5) : 0;
    const priceScore = priceScale ? clamp01((priceScale.max - gadget.price) / (priceScale.max - priceScale.min || 1)) : 0.5;

    if (category === "gaming") {
        const cpu = specs.cpu ? 0.8 : 0.4;
        const ram = specs.ram ? clamp01(specs.ram / 8) : 0.3;
        const refresh = specs.refresh ? clamp01(specs.refresh / 120) : 0.2;
        const battery = specs.mAh ? clamp01(specs.mAh / 5000) : 0.3;
        const s = 0.35 * cpu + 0.3 * ram + 0.2 * refresh + 0.1 * battery + 0.05 * rating;
        return clamp01(s);
    }

    if (category === "camera") {
        const mp = specs.mp ? clamp01(specs.mp / 108) : 0;
        // more camera modules (triple/quad) increase score
        const extra = /triple|quad|dual|penta/.test(specs.text) ? 0.2 : 0;
        const s = 0.6 * mp + 0.2 * rating + 0.2 * extra;
        return clamp01(s);
    }

    if (category === "battery") {
        const battery = specs.mAh ? clamp01(specs.mAh / 6000) : 0;
        const fast = specs.hasFastCharging ? 0.25 : 0;
        const s = 0.75 * battery + 0.15 * rating + 0.1 * fast;
        return clamp01(s);
    }

    if (category === "budget") {
        // budget favors lower price and decent rating
        const s = 0.7 * priceScore + 0.3 * rating;
        return clamp01(s);
    }

    if (category === "performance") {
        const cpu = specs.cpu ? 0.5 : 0.2;
        const ram = specs.ram ? clamp01(specs.ram / 12) : 0.3;
        const s = 0.5 * cpu + 0.4 * ram + 0.1 * rating;
        return clamp01(s);
    }

    return 0;
}

function scoreLaptopByCategory(specs, gadget, category, priceScale) {
    const rating = gadget.normalizedRating ? clamp01(gadget.normalizedRating / 5) : 0;
    const priceScore = priceScale ? clamp01((priceScale.max - gadget.price) / (priceScale.max - priceScale.min || 1)) : 0.5;

    if (category === "gaming") {
        const gpu = specs.hasDedicatedGPU ? 0.6 : 0.2;
        const ram = specs.ram ? clamp01(specs.ram / 16) : 0.3;
        const cpu = specs.cpu ? 0.4 : 0.2;
        const s = 0.45 * gpu + 0.35 * ram + 0.15 * cpu + 0.05 * rating;
        return clamp01(s);
    }

    if (category === "coding") {
        const ram = specs.ram ? clamp01(specs.ram / 16) : 0.5;
        const ssd = specs.hasSSD ? 0.25 : 0;
        const cpu = specs.cpu ? 0.25 : 0.2;
        const s = 0.4 * ram + 0.3 * cpu + 0.2 * ssd + 0.1 * rating;
        return clamp01(s);
    }

    if (category === "office work") {
        const ram = specs.ram ? clamp01(specs.ram / 8) : 0.5;
        const battery = specs.mAh ? clamp01(specs.mAh / 6000) : 0.4;
        const s = 0.5 * ram + 0.3 * battery + 0.2 * rating;
        return clamp01(s);
    }

    if (category === "video editing") {
        const gpu = specs.hasDedicatedGPU ? 0.35 : 0.1;
        const ram = specs.ram ? clamp01(specs.ram / 32) : 0.3;
        const cpu = specs.cpu ? 0.35 : 0.25;
        const s = 0.45 * cpu + 0.35 * ram + 0.15 * gpu + 0.05 * rating;
        return clamp01(s);
    }

    if (category === "studentuse") {
        const battery = specs.mAh ? clamp01(specs.mAh / 6000) : 0.4;
        const price = priceScore;
        const ssd = specs.hasSSD ? 0.15 : 0;
        const s = 0.45 * battery + 0.35 * price + 0.2 * ssd;
        return clamp01(s);
    }

    return 0;
}

function makeReasonSmartphone(specs, gadget, category) {
    const parts = [];
    if (category === "gaming") {
        if (specs.ram) parts.push(`${specs.ram}GB RAM`);
        if (specs.refresh) parts.push(`${specs.refresh}Hz display`);
        if (specs.mAh) parts.push(`${specs.mAh}mAh battery`);
        if (specs.cpu) parts.push(`${specs.cpu} CPU`);
        if (specs.hasFastCharging) parts.push(`fast charging`);
        return `Recommended for gaming because it has ${parts.join(', ')}.`;
    }

    if (category === "camera") {
        const p = specs.mp ? `${specs.mp}MP camera` : 'good camera specs';
        const extras = /triple|quad/.test(specs.text) ? ' multiple camera modules' : '';
        return `Recommended for photography because it offers ${p}${extras}.`;
    }

    if (category === "battery") {
        const p = specs.mAh ? `${specs.mAh}mAh battery` : 'large battery';
        const c = specs.hasFastCharging ? 'and fast charging' : '';
        return `Recommended for battery life because it has ${p} ${c}.`;
    }

    if (category === "budget") {
        return `Recommended as a budget pick because it offers good value for its price.`;
    }

    if (category === "performance") {
        const p = specs.ram ? `${specs.ram}GB RAM` : '';
        const c = specs.cpu ? `${specs.cpu} CPU` : '';
        return `Recommended for general performance because it has ${p} ${c}.`;
    }

    return `Recommended.`;
}

function makeReasonLaptop(specs, gadget, category) {
    if (category === "gaming") {
        const g = specs.hasDedicatedGPU ? 'a dedicated GPU' : 'a capable CPU';
        const r = specs.ram ? `${specs.ram}GB RAM` : '';
        return `Recommended for gaming because it includes ${g} and ${r}.`;
    }
    if (category === "coding") {
        const r = specs.ram ? `${specs.ram}GB RAM` : '';
        const s = specs.hasSSD ? 'an SSD' : '';
        return `Recommended for coding because it has ${r} ${s} and a capable CPU.`;
    }
    if (category === "office work") {
        return `Recommended for office work because it balances performance, battery life and portability.`;
    }
    if (category === "video editing") {
        const r = specs.ram ? `${specs.ram}GB RAM` : '';
        const g = specs.hasDedicatedGPU ? 'a dedicated GPU' : '';
        return `Recommended for video editing because it has ${r} ${g} and fast storage.`;
    }
    if (category === "studentuse") {
        const b = specs.mAh ? `${specs.mAh}mAh battery` : 'good battery life';
        return `Recommended for students because ${b}, portability and good value.`;
    }
    return `Recommended.`;
}

export const recommend = async (req, res) => {
    try {
        const type = (req.query.type || 'smartphone').toLowerCase();
        const top = parseInt(req.query.top, 10) || 5;

        const sourceType = type === 'laptop' || type === 'laptops' ? 'laptop' : 'smartphone';
        const products = await Gadget.find({ sourceType }).lean();

        if (!products || products.length === 0) {
            return res.json({ type: sourceType, categories: {} });
        }

        // price scale for budget normalization
        const prices = products.map((p) => (typeof p.price === 'number' ? p.price : NaN)).filter(Number.isFinite);
        const priceScale = prices.length ? { min: Math.min(...prices), max: Math.max(...prices) } : null;

        const categories = sourceType === 'smartphone'
            ? ['gaming', 'camera', 'battery', 'budget', 'performance']
            : ['gaming', 'coding', 'office work', 'video editing', 'studentuse'];

        const results = {};

        for (const cat of categories) {
            const scored = products.map((g) => {
                const specs = extractSpecs(g);
                const score = sourceType === 'smartphone'
                    ? scoreSmartphoneByCategory(specs, g, cat, priceScale)
                    : scoreLaptopByCategory(specs, g, cat, priceScale);
                const reason = sourceType === 'smartphone'
                    ? makeReasonSmartphone(specs, g, cat)
                    : makeReasonLaptop(specs, g, cat);
                return { gadget: g, score, reason };
            });

            scored.sort((a, b) => b.score - a.score);
            results[cat] = scored.slice(0, top).map((s) => ({
                _id: s.gadget._id,
                name: s.gadget.name,
                brand: s.gadget.brand,
                price: s.gadget.price,
                normalizedRating: s.gadget.normalizedRating,
                score: Number((s.score * 100).toFixed(1)),
                reason: s.reason,
                priceCurrency: s.gadget.priceCurrency || 'Not specified',
            }));
        }

        return res.json({ type: sourceType, categories: results });
    } catch (error) {
        console.error('Recommendation error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export default { recommend };