import React, { useEffect, useMemo, useState } from 'react'
import { allSmartphonesLink, allLaptopsLink } from '../utils/links'
import axios from 'axios'
import SearchBar from '../components/SearchBar'
import Filter from '../components/Filter'
import { Link } from 'react-router-dom'

const PAGE_SIZE = 50
const TOTAL_PAGES = {
  smartphones: 21,
  laptops: 13,
}

const Gadgets = () => {
  const [gadgets, setGadgets] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('smartphones')
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({ minPrice: null, maxPrice: null, minRating: null })

  const totalPages = TOTAL_PAGES[category] || 1

  const normalizedQuery = searchQuery.trim().toLowerCase()
  const isFiltered = Boolean(normalizedQuery) || Object.values(filters).some((value) => value != null && value !== '')

  const fetchGadgets = async (selectedCategory, pageNumber) => {
    const link = selectedCategory === 'smartphones' ? allSmartphonesLink : allLaptopsLink
    const start = (pageNumber - 1) * PAGE_SIZE
    const response = await axios.get(link, { params: { start } })
    return Array.isArray(response?.data?.gadgets) ? response.data.gadgets : []
  }

  const fetchAllGadgets = async (selectedCategory) => {
    const pages = TOTAL_PAGES[selectedCategory] || 1
    const requests = []
    for (let page = 1; page <= pages; page += 1) {
      requests.push(fetchGadgets(selectedCategory, page))
    }
    const responses = await Promise.all(requests)
    const all = responses.flat()
    const seen = new Set()
    return all.filter((gadget) => {
      if (seen.has(gadget._id)) {
        return false
      }
      seen.add(gadget._id)
      return true
    })
  }

  useEffect(() => {
    let isActive = true

    const loadGadgets = async () => {
      setIsLoading(true)
      try {
        const data = isFiltered ? await fetchAllGadgets(category) : await fetchGadgets(category, currentPage)
        if (isActive) {
          setGadgets(data)
        }
      } catch (error) {
        console.error('Error fetching gadgets:', error)
        if (isActive) {
          setGadgets([])
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    loadGadgets()

    return () => {
      isActive = false
    }
  }, [category, currentPage, isFiltered])

  useEffect(() => {
    if (isFiltered && currentPage !== 1) {
      setCurrentPage(1)
    }
  }, [isFiltered, currentPage])

  const handleCategoryChange = (nextCategory) => {
    setCategory(nextCategory)
    setCurrentPage(1)
    setSearchQuery('')
    setFilters({ minPrice: null, maxPrice: null, minRating: null })
  }

  const getPaginationItems = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1)
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 'ellipsis', totalPages]
    }

    if (currentPage >= totalPages - 2) {
      return [1, 'ellipsis', totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    }

    return [1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages]
  }

  const goToPage = (pageNumber) => {
    if (isFiltered) {
      return
    }

    if (pageNumber < 1 || pageNumber > totalPages || pageNumber === currentPage) {
      return
    }

    setCurrentPage(pageNumber)
  }

  const availableBrands = useMemo(
    () => Array.from(new Set(gadgets.map((gadget) => gadget.brand).filter(Boolean))).sort(),
    [gadgets]
  )

  const filteredGadgets = useMemo(() => {
    return gadgets.filter((gadget) => {
      if (normalizedQuery) {
        const searchableValues = [
          gadget.name,
          gadget.description,
          gadget.category,
          ...(Array.isArray(gadget.specifications) ? gadget.specifications : []),
        ]

        const matchesSearch = searchableValues
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(normalizedQuery))

        if (!matchesSearch) {
          return false
        }
      }

      const price = Number(gadget.price || 0)
      if (filters.minPrice != null && filters.minPrice !== '' && price < filters.minPrice) {
        return false
      }
      if (filters.maxPrice != null && filters.maxPrice !== '' && price > filters.maxPrice) {
        return false
      }

      const rating = Number(gadget.normalizedRating || 0)
      if (filters.minRating != null && filters.minRating !== '' && rating < filters.minRating) {
        return false
      }

      return true
    })
  }, [gadgets, normalizedQuery, filters])

  const displayedGadgets = isFiltered ? filteredGadgets : gadgets

  if (isLoading) {
    return (
      <section className="min-h-screen bg-slate-950 px-4 py-16 text-slate-100 md:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <h1 className="mb-8 text-4xl font-black tracking-tight text-cyan-300">Gadgets</h1>
          <p className="text-lg text-slate-300">Loading gadgets...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_#0f172a,_#020617_60%)] px-4 py-16 text-slate-100 md:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-sm font-semibold text-cyan-300">
              Featured Catalog
            </p>
            <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl">
              Explore {category === 'smartphones' ? 'Smartphones' : 'Laptops'}
            </h1>
            <p className="mt-3 max-w-2xl text-slate-300">
              Browse our latest {category === 'smartphones' ? 'smartphones' : 'laptops'} with detailed specs and transparent pricing.
            </p>
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            {isFiltered ? `Showing ${filteredGadgets.length} result${filteredGadgets.length === 1 ? '' : 's'}` : `Page ${currentPage} of ${totalPages}`}
          </p>
        </div>

        <div className="mb-6 flex gap-3">
          <button
            onClick={() => handleCategoryChange('smartphones')}
            className={`rounded-lg px-5 py-2.5 font-semibold transition ${
              category === 'smartphones'
                ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
                : 'border border-slate-600 bg-slate-900 text-slate-100 hover:border-cyan-400'
            }`}
          >
            Smartphones
          </button>
          <button
            onClick={() => handleCategoryChange('laptops')}
            className={`rounded-lg px-5 py-2.5 font-semibold transition ${
              category === 'laptops'
                ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
                : 'border border-slate-600 bg-slate-900 text-slate-100 hover:border-cyan-400'
            }`}
          >
            Laptops
          </button>
        </div>

        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by name, brand, or specifications"
        />

        <Filter brands={availableBrands} onChange={setFilters} initial={filters} />

        {displayedGadgets.length === 0 ? (
          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-8 text-center backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-slate-100">No gadgets found</h2>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {displayedGadgets.map((gadget) => (
              <article
                key={gadget._id}
                className="group rounded-2xl border border-slate-700/60 bg-slate-900/60 p-6 shadow-[0_20px_50px_-20px_rgba(14,165,233,0.35)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-400/70"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-white">{gadget.name}</h2>
                    {gadget.brand && <p className="mt-1 text-sm text-slate-400">{gadget.brand}</p>}
                  </div>
                  <span className="whitespace-nowrap rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-300">
                    {gadget.priceCurrency === 'INR' ? '₹' : '$'}{Number(gadget.price || 0).toFixed(2)}
                  </span>
                </div>

                <p className="mb-4 text-sm leading-6 text-slate-300 line-clamp-2">
                  {gadget.description || 'No description available.'}
                </p>

                <div className="mb-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-fuchsia-300">
                    {gadget.category || 'General'}
                  </span>
                  {gadget.normalizedRating && (
                    <span className="rounded-full border border-yellow-400/30 bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-yellow-300">
                      ⭐ {gadget.normalizedRating.toFixed(2)}
                    </span>
                  )}
                  {gadget.reviewsCount > 0 && (
                    <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">
                      {gadget.reviewsCount} reviews
                    </span>
                  )}
                </div>

                <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-cyan-300">Specifications</h3>
                <ul className="mb-4 space-y-1 text-xs text-slate-200">
                  {(gadget.specifications || []).slice(0, 4).map((spec, index) => (
                    <li key={index} className="truncate">
                      • {spec}
                    </li>
                  ))}
                  {(gadget.specifications || []).length > 4 && (
                    <li className="text-slate-400">+ {gadget.specifications.length - 4} more</li>
                  )}
                </ul>
                <Link
                  className="mt-2 inline-flex w-full items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300 hover:bg-cyan-500/20"
                  to={`/gadgets/${gadget._id}`}
                >
                  View Details
                </Link>
              </article>
            ))}
          </div>
        )}

        {!isFiltered && (
          <div className="mt-10 flex items-center justify-center">
            <div className="flex flex-wrap items-center justify-center gap-2 rounded-full border border-slate-800 bg-black/60 px-3 py-2 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.9)] backdrop-blur-md">
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1 || isLoading}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-300 transition hover:border-slate-500 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous page"
            >
              ‹
            </button>

            {getPaginationItems().map((item, index) =>
              item === 'ellipsis' ? (
                <span
                  key={`ellipsis-${index}`}
                  className="flex h-8 min-w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 px-2 text-slate-400"
                >
                  …
                </span>
              ) : (
                <button
                  key={item}
                  type="button"
                  onClick={() => goToPage(item)}
                  disabled={isLoading}
                  className={`flex h-8 min-w-8 items-center justify-center rounded-lg border px-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
                    item === currentPage
                      ? 'border-amber-400 bg-amber-400 text-slate-950 shadow-[0_0_0_1px_rgba(251,191,36,0.35)]'
                      : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500 hover:bg-slate-800'
                  }`}
                >
                  {item}
                </button>
              )
            )}

            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages || isLoading}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-300 transition hover:border-slate-500 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next page"
            >
              ›
            </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Gadgets
