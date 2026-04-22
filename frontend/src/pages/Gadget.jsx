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
                    <p className="mb-6 text-slate-300">This gadget could not be loaded or does not exist.</p>
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
            <div className="mx-auto w-full max-w-5xl rounded-2xl border border-slate-700/60 bg-slate-900/60 p-8 shadow-[0_20px_50px_-20px_rgba(14,165,233,0.35)] backdrop-blur-sm">
                <p className="mb-3 inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-sm font-semibold text-cyan-300">
                    Gadget Details
                </p>
                <h1 className="text-4xl font-black tracking-tight text-white">{gadget.name}</h1>
                <p className="mt-4 text-slate-300">{gadget.description || 'No description available.'}</p>

                <div className="mt-6 flex flex-wrap gap-3">
                    <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-300">
                        ${Number(gadget.price || 0).toFixed(2)}
                    </span>
                    <span className="rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-3 py-1 text-sm font-semibold text-fuchsia-300">
                        {gadget.category || 'General'}
                    </span>
                </div>

                <h2 className="mt-8 mb-3 text-lg font-bold text-cyan-300">Specifications</h2>
                <ul className="space-y-2 text-slate-200">
                    {(gadget.specifications || []).length > 0 ? (
                        (gadget.specifications || []).map((spec, index) => (
                            <li key={index} className="rounded-lg bg-slate-800/70 px-3 py-2">
                                {spec}
                            </li>
                        ))
                    ) : (
                        <li className="text-slate-400">No specifications listed.</li>
                    )}
                </ul>

                <Link
                    to="/"
                    className="mt-8 inline-flex items-center justify-center rounded-lg border border-slate-600 bg-slate-900 px-5 py-2.5 font-semibold text-slate-100 transition hover:border-cyan-400 hover:text-cyan-300"
                >
                    Back to Home
                </Link>
            </div>
        </section>
    )
}

export default Gadget
