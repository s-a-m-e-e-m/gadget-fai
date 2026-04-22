import React from 'react';

const SearchBar = ({ value, onChange, placeholder = 'Search gadgets...' }) => {
    return (
        <div className="mb-8">
            <label htmlFor="gadget-search" className="mb-2 block text-sm font-semibold uppercase tracking-wider text-slate-300">
                Search
            </label>
            <input
                id="gadget-search"
                type="text"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                className="w-full rounded-xl border border-slate-600 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
            />
        </div>
    );
};

export default SearchBar;
