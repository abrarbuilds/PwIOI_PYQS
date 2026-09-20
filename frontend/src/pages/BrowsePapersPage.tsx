import { useSearchParams } from 'react-router-dom'
import { papers } from '../data/papers'
import { CatalogEmptyState } from '../features/catalog/components/CatalogEmptyState'
import { CatalogFilterBar } from '../features/catalog/components/CatalogFilterBar'
import { PaperCard } from '../features/catalog/components/PaperCard'
import type { CatalogFilters } from '../features/catalog/catalog.types'
import { filterPapers } from '../features/catalog/catalog.utils'
import '../styles/catalog.css'

function readFilters(searchParams: URLSearchParams): CatalogFilters {
  return {
    branch: searchParams.get('branch') ?? '',
    semester: searchParams.get('semester') ?? '',
    subject: searchParams.get('subject') ?? '',
    examType: searchParams.get('examType') ?? '',
    year: searchParams.get('year') ?? '',
    query: searchParams.get('q') ?? '',
  }
}

export function BrowsePapersPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const filters = readFilters(searchParams)
  const visiblePapers = filterPapers(papers, filters)

  const updateFilter = (key: keyof CatalogFilters, value: string) => {
    const nextParams = new URLSearchParams(searchParams)
    const paramName = key === 'query' ? 'q' : key

    if (value) nextParams.set(paramName, value)
    else nextParams.delete(paramName)

    setSearchParams(nextParams)
  }

  const clearFilters = () => setSearchParams({})

  return <>
    <section className="catalog-head"><p className="eyebrow">PAPER LIBRARY</p><h1>Browse PYQs</h1><p>Filter the collection to find the paper you need.</p></section>
    <section className="catalog">
      <CatalogFilterBar filters={filters} onClear={clearFilters} onFilterChange={updateFilter} papers={papers} />
      <div className="results">
        <div className="result-summary"><p><strong>{visiblePapers.length}</strong> {visiblePapers.length === 1 ? 'paper' : 'papers'} found</p></div>
        {visiblePapers.length > 0
          ? <div className="paper-grid">{visiblePapers.map((paper) => <PaperCard key={paper.id} paper={paper} />)}</div>
          : <CatalogEmptyState onClear={clearFilters} />}
      </div>
    </section>
  </>
}
