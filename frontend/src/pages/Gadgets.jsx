import React, { useEffect, useState } from 'react'
import { allGadgetsLink } from '../utils/links';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import { Link } from 'react-router-dom';

const Gadgets = () => {
    const [gadgets, setGadgets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

    const fetchGadgets = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(allGadgetsLink);
            const gadgetsData = Array.isArray(response?.data?.gadgets) ? response.data.gadgets : [];
            setGadgets(gadgetsData);
        } catch (error) {
            console.error('Error fetching gadgets:', error);
            setGadgets([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchGadgets();
    }, []);

    const normalizedQuery = searchQuery.trim().toLowerCase();
    const filteredGadgets = gadgets.filter((gadget) => {
      if (!normalizedQuery) {
        return true;
      }

      const searchableValues = [
        gadget.name,
        gadget.description,
        gadget.category,
        ...(Array.isArray(gadget.specifications) ? gadget.specifications : []),
      ];

      return searchableValues
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(normalizedQuery));
    });

    if (isLoading) {
        return (
            <section className="min-h-screen bg-slate-950 px-4 py-16 text-slate-100 md:px-10">
                <div className="mx-auto w-full max-w-7xl">
                    <h1 className="mb-8 text-4xl font-black tracking-tight text-cyan-300">Gadgets</h1>
                    <p className="text-lg text-slate-300">Loading gadgets...</p>
                </div>
            </section>
        );
    }

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_#0f172a,_#020617_60%)] px-4 py-16 text-slate-100 md:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-sm font-semibold text-cyan-300">
              Featured Catalog
            </p>
            <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl">Explore Gadgets</h1>
            <p className="mt-3 max-w-2xl text-slate-300">
              Browse our latest devices with detailed specs and transparent pricing.
            </p>
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            {filteredGadgets.length} item{filteredGadgets.length === 1 ? '' : 's'}
          </p>
        </div>

        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by name, category, description, or specification"
        />

        {gadgets.length === 0 ? (
          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-8 text-center backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-slate-100">No gadgets found</h2>
            <p className="mt-2 text-slate-400">Try again once gadgets are available from the API.</p>
          </div>
        ) : filteredGadgets.length === 0 ? (
          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-8 text-center backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-slate-100">No results for "{searchQuery}"</h2>
            <p className="mt-2 text-slate-400">Try a different keyword.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredGadgets.map((gadget) => (
              <article
                key={gadget._id}
                className="group rounded-2xl border border-slate-700/60 bg-slate-900/60 p-6 shadow-[0_20px_50px_-20px_rgba(14,165,233,0.35)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-400/70"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <h2 className="text-2xl font-bold text-white">{gadget.name}</h2>
                  <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-300">
                    ${Number(gadget.price || 0).toFixed(2)}
                  </span>
                </div>

                <p className="mb-5 text-sm leading-6 text-slate-300">
                  {gadget.description || 'No description available.'}
                </p>

                <div className="mb-4 inline-flex rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-fuchsia-300">
                  {gadget.category || 'General'}
                </div>

                <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-cyan-300">Specifications</h3>
                <ul className="space-y-2 text-sm text-slate-200">
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
                <Link className="inline-flex items-center justify-center mt-4 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300 hover:bg-cyan-500/20" to={`/gadgets/${gadget._id}`}>
                  View Details
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Gadgets
