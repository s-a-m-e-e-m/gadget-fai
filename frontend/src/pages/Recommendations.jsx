import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchRecommendations } from '../utils/recommendationApi'

const TYPE_OPTIONS = [
  { value: 'smartphone', label: 'Smartphones' },
  { value: 'laptop', label: 'Laptops' },
]

const CATEGORY_LABELS = {
  gaming: 'Gaming',
  camera: 'Camera',
  battery: 'Battery',
  budget: 'Budget',
  performance: 'Performance',
  coding: 'Coding',
  'office work': 'Office Work',
  'video editing': 'Video Editing',
  studentuse: 'Student Use',
}

const Recommendations = () => {
  const [type, setType] = useState('smartphone')
  const [top, setTop] = useState(5)
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true

    const loadRecommendations = async () => {
      setIsLoading(true)
      setError('')
      try {
        const result = await fetchRecommendations(type, top)
        if (isActive) {
          setData(result)
        }
      } catch (err) {
        if (isActive) {
          setError('Unable to load recommendations right now. Please try again.')
          setData(null)
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    loadRecommendations()

    return () => {
      isActive = false
    }
  }, [type, top])

  const categories = useMemo(() => {
    return data?.categories || {}
  }, [data])

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#0f172a,_#020617_60%)] px-4 py-16 text-slate-100 md:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-sm font-semibold text-cyan-300">
              Personalized Picks
            </p>
            <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl">
              Recommended Products
            </h1>
            <p className="mt-3 max-w-2xl text-slate-300">
              Explore curated recommendations for smartphones and laptops with a clear reason for each pick.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {TYPE_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => setType(option.value)}
                className={`rounded-lg px-5 py-2.5 font-semibold transition ${
                  type === option.value
                    ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
                    : 'border border-slate-600 bg-slate-900 text-slate-100 hover:border-cyan-400'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-slate-800/80 bg-slate-950/30 p-4 backdrop-blur-sm md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Recommendation settings</h2>
            <p className="text-sm text-slate-400">
              Showing the top {top} result{top === 1 ? '' : 's'} for each category.
            </p>
          </div>

          <label className="flex items-center gap-3 text-sm font-medium text-slate-300">
            Top per category
            <select
              value={top}
              onChange={(e) => setTop(Number(e.target.value))}
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none transition focus:border-cyan-400"
            >
              {[3, 5, 8, 10].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
        </div>

        {isLoading ? (
          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-8 text-slate-300 backdrop-blur-sm">
            Loading recommendations...
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-8 text-rose-200">
            {error}
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(categories).map(([categoryKey, items]) => (
              <section key={categoryKey} className="rounded-2xl border border-slate-800/80 bg-slate-950/30 p-5 backdrop-blur-sm">
                <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-white">
                      {CATEGORY_LABELS[categoryKey] || categoryKey}
                    </h2>
                    <p className="text-sm text-slate-400">
                      Best matches for {type === 'smartphone' ? 'smartphones' : 'laptops'} in this category.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {items.map((item) => (
                    <article
                    
                      key={item._id}
                      className="rounded-2xl border border-slate-700/60 bg-slate-900/70 p-5 shadow-[0_20px_50px_-20px_rgba(14,165,233,0.28)] transition hover:-translate-y-1 hover:border-cyan-400/70"
                    >
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-bold text-white">{item.name}</h3>
                          {item.brand && <p className="text-sm text-slate-400">{item.brand}</p>}
                        </div>
                        <div className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-300">
                          {item.priceCurrency === '$' ? '$' : '₹'}{Number(item.price || 0).toFixed(2)}
                        </div>
                      </div>

                      <div className="mb-3 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300">
                        <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-cyan-300">
                          Score {item.score}%
                        </span>
                        {item.normalizedRating && (
                          <span className="rounded-full border border-yellow-400/30 bg-yellow-500/10 px-3 py-1 text-yellow-300">
                            ⭐ {item.normalizedRating.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <p className="text-sm leading-6 text-slate-300">
                        {item.reason}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <Link
            to="/"
            className="rounded-lg border border-slate-700 bg-slate-900 px-5 py-3 font-semibold text-slate-100 transition hover:border-cyan-400 hover:text-cyan-300"
          >
            Back to catalog
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Recommendations
