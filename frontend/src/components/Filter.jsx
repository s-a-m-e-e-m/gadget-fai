import React, { useEffect, useState } from 'react'

const Filter = ({ brands = [], onChange, initial = {} }) => {
  const [minPrice, setMinPrice] = useState(initial.minPrice ?? '')
  const [maxPrice, setMaxPrice] = useState(initial.maxPrice ?? '')
  const [minRating, setMinRating] = useState(initial.minRating ?? '')

  useEffect(() => {
    if (typeof onChange === 'function') {
      onChange({
        minPrice: minPrice === '' ? null : Number(minPrice),
        maxPrice: maxPrice === '' ? null : Number(maxPrice),
        minRating: minRating === '' ? null : Number(minRating),
      })
    }
  }, [minPrice, maxPrice, minRating, onChange])

  const clear = () => {
    setMinPrice('')
    setMaxPrice('')
    setMinRating('')
  }

  return (
    <div className="mb-6 grid gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/30 p-4 backdrop-blur-sm md:grid-cols-[repeat(4,minmax(0,1fr))_auto] md:items-end">
      <div className="flex flex-col gap-2">
        <label className="text-sm text-slate-300">Min price</label>
        <input
          type="number"
          min={0}
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
          placeholder="0"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-slate-300">Max price</label>
        <input
          type="number"
          min={0}
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
          placeholder="Any"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-slate-300">Min rating</label>
        <select
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
          className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
        >
          <option value="">Any</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="4.5">4.5+</option>
        </select>
      </div>

      <div className="flex items-end md:justify-end">
        <button
          type="button"
          onClick={clear}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400 md:w-auto"
        >
          Clear
        </button>
      </div>
    </div>
  )
}

export default Filter