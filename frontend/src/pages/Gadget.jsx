import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { gadgetByIdLink } from '../utils/links';

const Gadget = () => {
    const { id } = useParams();
    const [gadget, setGadget] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchGadget = async (gadgetId) => {
        setIsLoading(true);
        try {
            const response = await axios.get(gadgetByIdLink(gadgetId));
            setGadget(response.data.gadget);
        } catch (error) {
            console.error('Error fetching gadget:', error);
            setGadget(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!id) {
            setIsLoading(false);
            return;
        }

        fetchGadget(id);
    }, [id]);

    if (isLoading) {
        return (
            <section className="min-h-screen bg-slate-950 px-4 py-16 text-slate-100 md:px-10">
                <div className="mx-auto w-full max-w-5xl">
                    <h1 className="mb-6 text-4xl font-black tracking-tight text-cyan-300">Gadget Details</h1>
                    <p className="text-lg text-slate-300">Loading gadget details...</p>
                </div>
            </section>
        );
    }

    if (!gadget) {
        return (
            <section className="min-h-screen bg-slate-950 px-4 py-16 text-slate-100 md:px-10">
                <div className="mx-auto w-full max-w-5xl rounded-2xl border border-slate-700/60 bg-slate-900/60 p-8 text-center backdrop-blur-sm">
                    <h1 className="mb-3 text-3xl font-black tracking-tight text-cyan-300">Gadget not found</h1>
                    <p className="mb-6 text-slate-300">This gadget may have been removed or is not available.</p>
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center rounded-lg bg-cyan-500 px-5 py-2.5 font-semibold text-slate-950 transition hover:bg-cyan-400"
                    >
                        Back to Home
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-slate-950 px-4 py-16 text-slate-100 md:px-10">
            <div className="mx-auto w-full max-w-5xl">
                <Link
                    to="/"
                    className="mb-6 inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition"
                >
                    ← Back
                </Link>

                <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-8 shadow-[0_20px_50px_-20px_rgba(14,165,233,0.35)] backdrop-blur-sm">
                    <div className="mb-8">
                        <p className="mb-3 inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-sm font-semibold text-cyan-300">
                            {gadget.category} Details
                        </p>
                        <h1 className="text-2xl font-bold text-white">{gadget.name}</h1>
                        {gadget.brand && (
                            <p className="mt-2 text-lg text-slate-400">Brand: <span className="text-slate-200 font-semibold">{gadget.brand}</span></p>
                        )}
                    </div>

                    <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="rounded-lg border border-emerald-400/30 bg-emerald-500/10 p-4">
                            <p className="text-sm text-slate-400">Price</p>
                            <p className="text-3xl font-bold text-emerald-300">
                                {gadget.priceCurrency === 'INR' ? '₹' : '$'}{Number(gadget.price || 0).toLocaleString('en-IN', {maximumFractionDigits: 2})}
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            {gadget.normalizedRating && (
                                <div className="rounded-lg border border-yellow-400/30 bg-yellow-500/10 p-4">
                                    <p className="text-sm text-slate-400">Rating</p>
                                    <div className="flex items-center gap-2">
                                        <p className="text-3xl font-bold text-yellow-300">{gadget.normalizedRating.toFixed(2)}</p>
                                        <span className="text-2xl">⭐</span>
                                    </div>
                                </div>
                            )}

                            {gadget.reviewsCount > 0 && (
                                <div className="rounded-lg border border-blue-400/30 bg-blue-500/10 p-4">
                                    <p className="text-sm text-slate-400">Reviews</p>
                                    <p className="text-3xl font-bold text-blue-300">{gadget.reviewsCount.toLocaleString()}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mb-8">
                        <p className="mb-4 text-slate-300">{gadget.description || 'No description available.'}</p>
                    </div>

                    <div className="mb-8">
                        <h2 className="mb-4 text-2xl font-bold text-cyan-300">Specifications</h2>
                        {(gadget.specifications || []).length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {gadget.specifications.map((spec, index) => (
                                    <div key={index} className="rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-3">
                                        <p className="text-slate-200">{spec}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-slate-400">No specifications listed.</p>
                        )}
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Gadget
